import { useState } from 'react';

export default function Users({ users, addUser, updateUser, deleteUser }) {
  const [form, setForm] = useState({ name:'', membershipId:'', role:'member' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    editingId ? updateUser(editingId, form) : addUser(form);
    setEditingId(null);
    setForm({ name:'', membershipId:'', role:'member' });
  };

  return (
    <div>
      <div className="title-row">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=200&q=80" alt="Users" className="title-icon" />
        <h1>User Management</h1>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <input placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          <input placeholder="Membership ID" value={form.membershipId} onChange={e=>setForm({...form,membershipId:e.target.value})} required />
          <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
            <option value="member">Member</option>
            <option value="librarian">Librarian</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">{editingId ? 'Update' : 'Register User'}</button>
        </form>
      </div>
      <div className="card">
        <h3>All Users ({users.length})</h3>
        {users.map(u => (
          <div key={u.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
            {u.name} — {u.membershipId} — {u.role}
            <button onClick={() => { setForm(u); setEditingId(u.id); }} style={{ margin: '0 0.5rem' }}>Edit</button>
            <button onClick={() => deleteUser(u.id)} style={{ background: '#e53e3e' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}