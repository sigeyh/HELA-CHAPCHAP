import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const ConfirmDetails = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{name?: string; phone?: string; idNumber?: string}>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {name?: string; phone?: string; idNumber?: string} = {};
    
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Please enter your full name';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^254[0-9]{9}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter valid format: 254XXXXXXXXX';
    }
    
    if (!idNumber.trim()) {
      newErrors.idNumber = 'ID number is required';
    } else if (idNumber.length < 6) {
      newErrors.idNumber = 'Enter a valid ID number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const user = auth.currentUser;
if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          name: name.trim(),
          phone: phone.trim(),
          idNumber: idNumber.trim(),
          updatedAt: new Date().toISOString(),
        });
        // Save phone for Payhero STK Push in Verification
        sessionStorage.setItem('hakika_phone', phone.trim());
        sessionStorage.setItem('hakika_uid', user!.uid);
        sessionStorage.setItem('hakika_name', name.trim());
        sessionStorage.setItem('hakika_idNumber', idNumber.trim());
      }
      navigate('/limit');

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="logo-container">
<h1 className="logo">🏦 Hakika Loans</h1>
      </div>
      
      <h1>Confirm Your Details</h1>
      <p>Please provide your personal information to proceed.</p>
      
      {error && <div className="status-message error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="254712345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="idNumber">ID Number</label>
          <input
            id="idNumber"
            type="text"
            placeholder="12345678"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            className={errors.idNumber ? 'error' : ''}
          />
          {errors.idNumber && <p className="error-message">{errors.idNumber}</p>}
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Confirm & Continue'}
        </button>
      </form>
    </div>
  );
};

export default ConfirmDetails;
