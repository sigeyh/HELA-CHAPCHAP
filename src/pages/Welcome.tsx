import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="page-container">
      <div className="welcome-content">
        <div className="logo-container">
          <h1 className="logo">🏦 Hakika Loans</h1>
          <p className="tagline">Your Trusted Loan Service</p>
        </div>
        
        <p className="subtitle">
          Get the financial support you need with instant approvals and flexible terms.
        </p>
        
        <div className="features">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <div className="feature-text">
              <h3>Quick Approval</h3>
              <p>Get approved within minutes</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <div className="feature-text">
              <h3>Easy STK Push</h3>
              <p>Simple mobile payment via Payhero</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <div className="feature-text">
              <h3>Secure & Private</h3>
              <p>Your data is safe with us</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💰</div>
            <div className="feature-text">
              <h3>Up to KSh 100,000</h3>
              <p>Flexible loan limits</p>
            </div>
          </div>
        </div>
        
        <Link to="/login">
          <button className="btn btn-primary">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
