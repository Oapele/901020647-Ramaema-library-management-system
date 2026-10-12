import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ onLogin, users }) {
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(u => u.membershipId.trim().toUpperCase() === id.trim().toUpperCase());
    if (user) { onLogin(user); nav('/'); }
    else setError('User not found — register first on Users page.');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto' }}>
      <div className="card">
        <div className="title-row center-row">
          <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=200&q=80" alt="Library" className="title-icon" />
          <h2>Library Login</h2>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input placeholder="Enter Membership ID" value={id} onChange={e=>setId(e.target.value)} required />
          {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
          <button>Sign In</button>
        </form>

        <p style={{ marginTop: '1rem', textAlign: 'center', color: '#4a5568' }}>
          First time? <Link to="/users" style={{ color: '#2b6cb0', fontWeight: 700 }}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}