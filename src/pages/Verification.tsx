import { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { initiateLipwa, LIPWA_LINK } from '../services/payhero';

const Verification = () => {
  const [paid, setPaid] = useState(false);
  const [serviceFee, setServiceFee] = useState(0);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [loanLimit, setLoanLimit] = useState(0);
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedFee = sessionStorage.getItem('hakika_service_fee');
    const savedPaid = sessionStorage.getItem('hakika_paid');
    const savedPhone = sessionStorage.getItem('hakika_phone');
    const savedLimit = sessionStorage.getItem('hakika_loan_limit');
    const savedUid = sessionStorage.getItem('hakika_uid');
    const savedName = sessionStorage.getItem('hakika_name');
    const savedId = sessionStorage.getItem('hakika_idNumber');
    
    if (savedFee) setServiceFee(parseInt(savedFee));
    if (savedPaid === 'true') setPaid(true);
    if (savedPhone) setPhone(savedPhone);
    if (savedLimit) setLoanLimit(parseInt(savedLimit));
    if (savedUid) setUid(savedUid);
    if (savedName) setName(savedName);
    if (savedId) setIdNumber(savedId);
  }, []);

  const handleLipwa = async () => {
    if (!phone) {
      setError('Phone number not found. Please go back and confirm your details.');
      return;
    }

    try {
      const result = await initiateLipwa(phone, serviceFee);
      
      if (result.success && result.data?.checkout_url) {
        window.location.href = result.data.checkout_url;
      } else {
        setError(result.error || 'Failed to initiate Lipwa. Using static link.');
        window.location.href = LIPWA_LINK;
      }
    } catch (err: any) {
      console.error('Lipwa error:', err);
      window.location.href = LIPWA_LINK;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="page-container">
      <div className="logo-container">
        <h1 className="logo">🏦 Hakika Loans</h1>
      </div>
      
      {!paid ? (
        <>
          <h1>Verification & Payment</h1>
          <p>Review your details and pay service fee.</p>
          
          {error && <div className="status-message error">{error}</div>}
          
          {/* User Details Summary */}
          <div className="verification-card" style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Your Details</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span>Name:</span>
              <span style={{ fontWeight: '500' }}>{name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span>Phone:</span>
              <span style={{ fontWeight: '500' }}>{phone}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span>ID:</span>
              <span style={{ fontWeight: '500' }}>{idNumber}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
              <span>Loan Limit:</span>
              <span style={{ fontWeight: '500', color: '#1a73e8' }}>{formatCurrency(loanLimit)}</span>
            </div>
          </div>
          
          {/* Service Fee */}
          <div className="verification-card">
            <p style={{ fontSize: '16px', fontWeight: '600' }}>Service Fee</p>
            <p className="fee" style={{ fontSize: '28px', margin: '8px 0' }}>{formatCurrency(serviceFee)}</p>
          </div>
          
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '16px', marginTop: '20px' }}
            onClick={handleLipwa}
            disabled={loading}
          >
            Pay {formatCurrency(serviceFee)} via Lipwa
          </button>
        </>
      ) : (
        <div className="verification-content">
          <div className="verification-card" style={{ background: 'rgba(52, 168, 83, 0.1)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h2>Payment Successful!</h2>
            <p>Your loan is being processed. Funds will be disbursed shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;
