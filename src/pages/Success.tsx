import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoanApplication, LoanApplication } from '../services/loans';
import PageLoader from '../components/PageLoader';

const Success = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  const [loan, setLoan] = useState<LoanApplication | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1000);
    const fetchLoan = async () => {
      const data = await getLoanApplication();
      setLoan(data);
    };
    fetchLoan();
    return () => clearTimeout(timer);
  }, []);

  const loanAmount = loan?.loanAmount || parseInt(sessionStorage.getItem('hakika_loan_limit') || '0');

  if (initialLoading) return <PageLoader text="Finalizing Settlement" />;

  return (
    <div className="page-container bg-mesh" style={{ color: 'white', justifyContent: 'center', textAlign: 'center' }}>
      <div className="animate-float" style={{ fontSize: '72px', marginBottom: '24px' }}>✅</div>
      
      <h1 className="text-gradient" style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
        Disbursement Sent
      </h1>
      <p style={{ color: '#888', fontSize: '16px', maxWidth: '280px', margin: '0 auto 40px', lineHeight: '1.5' }}>
        Your funds are being processed by M-Pesa. You will receive a confirmation SMS shortly.
      </p>

      <div className="luxury-card glow-border" style={{ textAlign: 'left', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: '#666', fontSize: '13px', textTransform: 'uppercase' }}>Loan Amount</span>
          <span style={{ fontWeight: '700' }}>KSh {loanAmount.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#666', fontSize: '13px', textTransform: 'uppercase' }}>Status</span>
          <span style={{ fontWeight: '700', color: 'var(--accent-emerald)' }}>Processing</span>
        </div>
      </div>

      <button className="btn-premium" onClick={() => navigate('/')} style={{ background: 'white', color: 'black' }}>
        Back to Dashboard
      </button>

      <p style={{ marginTop: '24px', color: '#555', fontSize: '12px' }}>
        Thank you for choosing Hakika Pro for your financial needs.
      </p>
    </div>
  );
};

export default Success;
