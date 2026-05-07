import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateReference } from '../services/payhero';

const Verification = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const name = sessionStorage.getItem('hakika_name') || 'Guest';
  const phone = sessionStorage.getItem('hakika_phone') || '';
  const loanLimit = parseInt(sessionStorage.getItem('hakika_loan_limit') || '0');
  const serviceFee = parseInt(sessionStorage.getItem('hakika_service_fee') || '0');
  const [reference, setReference] = useState('');

  useEffect(() => {
    // Generate or retrieve reference
    const savedRef = sessionStorage.getItem('hakika_reference') || generateReference();
    setReference(savedRef);
    sessionStorage.setItem('hakika_reference', savedRef);
  }, []);

  const handleLipwa = () => {
    if (!phone) {
      setError('Connection parameters lost. Please restart the verification.');
      return;
    }
    navigate('/processing-payment');
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="page-container bg-mesh" style={{ color: 'white' }}>
      <div className="logo-container">
        <h1 className="logo" style={{ color: 'white' }}>🏛️ Hakika Pro</h1>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>Final Step</h2>
        <p style={{ color: '#888', fontSize: '15px' }}>Secure your disbursement by verifying the service fee.</p>
      </div>

      <div className="luxury-card glow-border" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ 
            width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)', 
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
          }}>👤</div>
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '2px' }}>{name}</h3>
            <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>{phone}</p>
          </div>
        </div>

        {/* Reference Badge */}
        <div className="reference-badge" style={{ background: 'rgba(0, 255, 136, 0.03)', border: '1px dashed var(--accent-emerald)', padding: '16px' }}>
          <span className="reference-label" style={{ color: '#aaa' }}>🏷️ Ref ID</span>
          <span className="reference-value" style={{ color: 'var(--accent-emerald)' }}>{reference}</span>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '24px 0' }}></div>

        {/* Fee Breakdown */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: '#888', fontSize: '14px' }}>Protocol Access Fee</span>
          <span style={{ fontWeight: '700', fontSize: '18px' }}>{formatCurrency(serviceFee)}</span>
        </div>
        <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.4' }}>
          This one-time fee authorizes your immediate loan disbursement of {formatCurrency(loanLimit)}.
        </p>
      </div>

      {/* Trust & Security */}
      <div className="glass" style={{ padding: '20px', borderRadius: '20px', marginBottom: '40px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{ fontSize: '18px' }}>🔒</span>
          <span style={{ fontSize: '13px', fontWeight: '500' }}>AES-256 Encrypted Disbursement</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '18px' }}>⚡</span>
          <span style={{ fontSize: '13px', fontWeight: '500' }}>Direct M-Pesa STK Integration</span>
        </div>
      </div>

      {error && <div className="status-message error" style={{ marginBottom: '20px' }}>{error}</div>}

      <button
        className="btn-premium"
        onClick={handleLipwa}
        style={{ background: 'var(--accent-emerald)', color: '#000', fontWeight: '800' }}
      >
        Authorize Disbursement
        <span style={{ fontSize: '20px' }}>→</span>
      </button>

      <button
        className="btn-text"
        onClick={() => navigate('/limit')}
        style={{ marginTop: '16px', color: '#666', fontSize: '13px' }}
      >
        Go Back
      </button>
    </div>
  );
};

export default Verification;
