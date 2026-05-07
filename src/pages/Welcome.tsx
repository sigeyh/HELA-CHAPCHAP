import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="page-container bg-mesh" style={{ color: 'white', minHeight: '100vh', padding: '40px 20px' }}>
      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute', top: '10%', right: '-10%', width: '300px', height: '300px',
        background: 'rgba(0, 255, 136, 0.03)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0
      }}></div>

      {/* Luxury Hero Section */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '60px', marginTop: '40px' }}>
        <div className="animate-float" style={{ marginBottom: '24px' }}>
          <div style={{
            width: '80px', height: '80px', background: 'linear-gradient(135deg, #1a73e8, #00ff88)',
            borderRadius: '24px', margin: '0 auto', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '40px', boxShadow: '0 20px 40px rgba(0, 255, 136, 0.2)'
          }}>
            🏛️
          </div>
        </div>

        <h1 className="text-gradient" style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-1px' }}>
          Hakika Loans
        </h1>
        <p style={{ color: '#aaa', fontSize: '16px', maxWidth: '280px', margin: '0 auto', lineHeight: '1.5' }}>
          Elevate your financial freedom with instant, premium credit lines.
        </p>
      </div>

      {/* High-Performance Stats */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '60px' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--accent-emerald)', display: 'block' }}>60s</span>
          <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Approval</span>
        </div>
        <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '28px', fontWeight: '800', color: '#fff', display: 'block' }}>0%</span>
          <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Hidden Fees</span>
        </div>
        <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--accent-emerald)', display: 'block' }}>24/7</span>
          <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Support</span>
        </div>
      </div>

      {/* Luxury Feature Grid */}
      <div className="luxury-grid" style={{ marginBottom: '60px' }}>
        <div className="luxury-card glow-border">
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>⚡</div>
          <h3 style={{ fontSize: '15px', marginBottom: '6px' }}>Quantum Speed</h3>
          <p style={{ fontSize: '12px', color: '#777', lineHeight: '1.4' }}>Funds cleared in seconds via direct STK push.</p>
        </div>
        <div className="luxury-card glow-border">
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>💎</div>
          <h3 style={{ fontSize: '15px', marginBottom: '6px' }}>Limit Growth</h3>
          <p style={{ fontSize: '12px', color: '#777', lineHeight: '1.4' }}>Dynamic limits that grow with your trust score.</p>
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', opacity: 0.4 }}>
          <span style={{ fontSize: '12px', fontWeight: '700' }}>🔒 BANK-GRADE SECURITY</span>
          <span style={{ fontSize: '12px', fontWeight: '700' }}>🇰🇪 MPESA INTEGRATED</span>
        </div>
      </div>

      {/* Ultimate CTA */}
      <div style={{ position: 'sticky', bottom: '24px', zIndex: 10 }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button className="btn-premium" style={{
            background: 'linear-gradient(135deg, #fff 0%, #ddd 100%)',
            color: '#000',
            borderRadius: '100px',
            fontSize: '17px',
            height: '64px',
            boxShadow: '0 20px 40px rgba(255, 255, 255, 0.1)'
          }}>
            Get started
            <span style={{ fontSize: '22px' }}>→</span>
          </button>
        </Link>
      </div>

      <style>{`
        body { background: #0a0a0a !important; }
        .page-container { max-width: 450px; margin: 0 auto; position: relative; overflow-x: hidden; }
      `}</style>
    </div>
  );
};

export default Welcome;
