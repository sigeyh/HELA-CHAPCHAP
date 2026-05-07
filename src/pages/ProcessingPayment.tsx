import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initiateLipwa, buildLipwaUrl, checkPaymentStatus } from '../services/payhero';
import { updatePaymentStatus } from '../services/loans';

const ProcessingPayment = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Initializing secure connection...');
  const [stkSent, setStkSent] = useState(false);

  useEffect(() => {
    const startPayment = async () => {
      const phone = sessionStorage.getItem('hakika_phone') || '';
      const amount = parseInt(sessionStorage.getItem('hakika_service_fee') || '0');
      const name = sessionStorage.getItem('hakika_name') || '';
      const reference = sessionStorage.getItem('hakika_reference') || '';

      if (!phone || !amount) {
        setError('Payment details missing. Redirecting back...');
        setTimeout(() => navigate('/verify'), 2000);
        return;
      }

      try {
        setStatus('Preparing secure payment...');
        await new Promise(resolve => setTimeout(resolve, 800));

        setStatus('Initiating M-Pesa transaction...');
        const result = await initiateLipwa(phone, amount, name, reference);

        if (result.success) {
          setStkSent(true);
          setStatus('Prompt sent! Please check your phone for the M-Pesa PIN request.');
          
          // Update Firebase status to INITIATED with reference
          updatePaymentStatus('INITIATED', { 
            reference, 
            transactionId: result.data?.transaction_id 
          });

          // Start polling for payment success
          const transactionId = result.data?.transaction_id;
          if (transactionId) {
            const pollInterval = setInterval(async () => {
              try {
                const statusResult = await checkPaymentStatus(transactionId);
                if (statusResult.success) {
                  clearInterval(pollInterval);
                  // Update Firebase status to PAID
                  await updatePaymentStatus('PAID', { 
                    transactionId: result.data?.transaction_id,
                    paidAt: new Date().toISOString()
                  });
                  navigate('/success');
                }
              } catch (e) {
                console.error('Polling error:', e);
              }
            }, 3000);

            // Stop polling after 60 seconds
            setTimeout(() => clearInterval(pollInterval), 60000);
          }
        } else {
          // API failed — redirect to the manual Lipwa page with pre-filled details
          setStatus('Opening payment page with your details pre-filled...');
          const fallbackUrl = result.data?.checkout_url || buildLipwaUrl(phone, amount, name, reference);
          
          setTimeout(() => {
            window.location.href = fallbackUrl;
          }, 1500);
        }
      } catch (err: any) {
        console.error('Payment Error:', err);
        const fallbackUrl = buildLipwaUrl(phone, amount, name, reference);
        window.location.href = fallbackUrl;
      }
    };

    startPayment();
  }, [navigate]);

  return (
    <div className="page-container" style={{ textAlign: 'center', padding: '60px 24px' }}>
      <div className="logo-container">
        <h1 className="logo">🏦 Hakika Loans</h1>
      </div>

      <div className="loading-content">
        {!stkSent && (
          <div className="spinner" style={{ width: '60px', height: '60px', marginBottom: '24px' }}></div>
        )}
        {stkSent && (
          <div style={{ fontSize: '56px', marginBottom: '16px', animation: 'fadeIn 0.4s ease-out' }}>📲</div>
        )}
        
        {error ? (
          <div className="status-message error" style={{ margin: '0' }}>
            <p>{error}</p>
          </div>
        ) : (
          <div className="fade-in">
            <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>
              {stkSent ? 'M-Pesa Prompt Sent!' : 'Initiating M-Pesa Payment'}
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '15px' }}>{status}</p>
            
            <div style={{ 
              marginTop: '32px', 
              padding: '20px', 
              background: stkSent ? 'rgba(52, 168, 83, 0.06)' : 'rgba(26, 115, 232, 0.05)',
              borderRadius: '16px',
              border: `1px solid ${stkSent ? 'rgba(52,168,83,0.3)' : 'rgba(26, 115, 232, 0.2)'}`,
              textAlign: 'left',
              transition: 'all 0.3s ease',
            }}>
              <p style={{ fontWeight: '600', color: '#202124', marginBottom: '8px', fontSize: '14px' }}>
                {stkSent ? '✅ What to do now' : '🚀 What happens next?'}
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '13px', color: '#5f6368', lineHeight: '1.8' }}>
                {stkSent ? (
                  <>
                    <li>Look at your phone for an <strong>M-Pesa prompt</strong>.</li>
                    <li>Enter your <strong>M-Pesa PIN</strong> to approve the payment.</li>
                    <li>The system will automatically detect your payment.</li>
                  </>
                ) : (
                  <>
                    <li>An M-Pesa prompt will appear on your phone automatically.</li>
                    <li>Enter your M-Pesa PIN to complete the payment.</li>
                    <li>If the prompt doesn't appear, you'll be taken to the manual page.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProcessingPayment;
