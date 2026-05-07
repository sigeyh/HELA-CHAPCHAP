import { db, auth } from '../firebase';
import { 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  serverTimestamp
} from 'firebase/firestore';

export interface LoanApplication {
  userId: string;
  userName: string;
  userPhone: string;
  loanAmount: number;
  protocolFee: number;
  netDisbursement: number;
  status: 'PENDING' | 'INITIATED' | 'PAID' | 'FAILED' | 'DISBURSED';
  reference?: string;
  transactionId?: string;
  createdAt: any;
  updatedAt: any;
}

/**
 * Creates or updates a loan application for the current user
 */
export const saveLoanApplication = async (data: Partial<LoanApplication>) => {
  const user = auth.currentUser;
  if (!user) return null;

  const loanRef = doc(db, 'loans', user.uid);
  
  try {
    const docSnap = await getDoc(loanRef);
    
    if (!docSnap.exists()) {
      // Create new
      await setDoc(loanRef, {
        ...data,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      // Update existing
      await updateDoc(loanRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    }
    return true;
  } catch (error) {
    console.error('Error saving loan application:', error);
    return false;
  }
};

/**
 * Updates the payment status of a loan
 */
export const updatePaymentStatus = async (status: LoanApplication['status'], extraData: any = {}) => {
  const user = auth.currentUser;
  if (!user) return null;

  const loanRef = doc(db, 'loans', user.uid);
  
  try {
    await updateDoc(loanRef, {
      status,
      ...extraData,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error updating payment status:', error);
    return false;
  }
};

/**
 * Retrieves the current user's loan application
 */
export const getLoanApplication = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const loanRef = doc(db, 'loans', user.uid);
  
  try {
    const docSnap = await getDoc(loanRef);
    if (docSnap.exists()) {
      return docSnap.data() as LoanApplication;
    }
    return null;
  } catch (error) {
    console.error('Error getting loan application:', error);
    return null;
  }
};
