import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import PageLoader from '../components/PageLoader';

const LoginSignup = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/confirm');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <PageLoader text="Securing Access" />;

  return (
    <div className="page-container bg-mesh" style={{ color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="logo-container" style={{ marginBottom: '40px' }}>
        <div style={{ 
          width: '64px', height: '64px', background: 'linear-gradient(135deg, #1a73e8, #00ff88)', 
          borderRadius: '18px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', fontSize: '32px', boxShadow: '0 10px 30px rgba(0, 255, 136, 0.15)'
        }}>
          🏛️
        </div>
        <h1 className="logo" style={{ color: 'white', fontSize: '24px', letterSpacing: '1px' }}>Hakika Pro</h1>
      </div>
      
      <div className="luxury-card glow-border" style={{ padding: '40px 32px', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle decorative glow */}
        <div style={{ 
          position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', 
          background: 'rgba(26, 115, 232, 0.1)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0 
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="text-gradient" style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', textAlign: 'left' }}>
            {isLogin ? 'Welcome Back' : 'Join the Elite'}
          </h1>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px', textAlign: 'left' }}>
            {isLogin ? 'Access your premium credit dashboard.' : 'Start your journey to financial freedom.'}
          </p>
          
          {error && (
            <div style={{ 
              background: 'rgba(234, 67, 53, 0.1)', color: '#ea4335', padding: '12px 16px', 
              borderRadius: '12px', fontSize: '13px', marginBottom: '24px', border: '1px solid rgba(234, 67, 53, 0.2)' 
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ color: '#aaa', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@exclusive.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'white',
                  padding: '18px',
                  borderRadius: '16px',
                  fontSize: '15px'
                }}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: '32px' }}>
              <label style={{ color: '#aaa', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>
                Secure Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'white',
                  padding: '18px',
                  borderRadius: '16px',
                  fontSize: '15px'
                }}
              />
            </div>
            
            <button type="submit" className="btn-premium" disabled={loading} style={{ background: 'white', color: 'black' }}>
              {loading ? 'Authenticating...' : isLogin ? 'Enter Dashboard' : 'Create Account'}
              {!loading && <span style={{ fontSize: '20px' }}>→</span>}
            </button>
          </form>
          
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
              {isLogin ? "New to Hakika Pro?" : "Already a member?"}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                type="button"
                style={{ 
                  background: 'none', border: 'none', color: 'var(--accent-emerald)', 
                  fontWeight: '700', marginLeft: '8px', cursor: 'pointer', fontSize: '14px' 
                }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:focus { border-color: var(--accent-emerald) !important; outline: none; background: rgba(255,255,255,0.05) !important; }
      `}</style>
    </div>
  );
};

export default LoginSignup;
