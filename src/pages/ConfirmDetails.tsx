import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoader from '../components/PageLoader';

const ConfirmDetails = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [name, setName] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normalize phone number to 254... format
    let formattedPhone = phone.replace(/\s/g, '');
    if (formattedPhone.startsWith('0')) formattedPhone = '254' + formattedPhone.substring(1);
    if (!formattedPhone.startsWith('254')) formattedPhone = '254' + formattedPhone;

    sessionStorage.setItem('hakika_name', name);
    sessionStorage.setItem('hakika_phone', formattedPhone);
    navigate('/limit');
  };

  if (initialLoading) return <PageLoader text="Verifying Protocol" />;

  return (
    <div className="page-container bg-mesh" style={{ color: 'white' }}>
      <div className="logo-container">
        <h1 className="logo" style={{ color: 'white' }}>🏛️ Hakika Pro</h1>
      </div>
      
      <div className="luxury-card glow-border" style={{ marginTop: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>Identity Verification</h1>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '32px' }}>
          Please verify your details to unlock your premium credit line.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label style={{ color: '#aaa', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name (As per ID)</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ 
                background: 'rgba(255,255,255,0.03)', 
                color: 'white', 
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px',
                borderRadius: '12px',
                width: '100%'
              }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '32px' }}>
            <label style={{ color: '#aaa', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>M-Pesa Phone Number</label>
            <input
              type="tel"
              placeholder="0712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{ 
                background: 'rgba(255,255,255,0.03)', 
                color: 'white', 
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px',
                borderRadius: '12px',
                width: '100%'
              }}
            />
          </div>
          
          <button type="submit" className="btn-premium" style={{ background: 'white', color: 'black' }}>
            Unlock My Limit
            <span style={{ fontSize: '20px' }}>→</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmDetails;
