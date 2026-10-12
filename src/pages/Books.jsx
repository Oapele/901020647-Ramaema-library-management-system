import { useState } from 'react';

export default function Books({ books, addBook, updateBook, deleteBook, adjustStock }) {
  const [form, setForm] = useState({ title:'', author:'', genre:'', isbn:'', quantity:'', coverImage:'' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateBook(editingId, { ...form, quantity: Number(form.quantity) });
      setEditingId(null);
    } else {
      addBook(form);
    }
    setForm({ title:'', author:'', genre:'', isbn:'', quantity:'', coverImage:'' });
  };

  return (
    <div>
      <div className="title-row">
        <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=200&q=80" alt="Books" className="title-icon" />
        <h1>Book Management</h1>
      </div>
      <div className="card">
        <h3>{editingId ? 'Edit Book' : 'Add New Book'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <input placeholder="Title *" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
          <input placeholder="Author *" value={form.author} onChange={e=>setForm({...form,author:e.target.value})} required />
          <input placeholder="Genre" value={form.genre} onChange={e=>setForm({...form,genre:e.target.value})} />
          <input placeholder="ISBN" value={form.isbn} onChange={e=>setForm({...form,isbn:e.target.value})} />
          <input type="number" placeholder="Quantity *" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} required />
          <input type="url" placeholder="Cover Image URL" value={form.coverImage} onChange={e=>setForm({...form,coverImage:e.target.value})} />
          {form.coverImage && <img src={form.coverImage} alt="Preview" style={{ width: 100, height: 140, objectFit: 'cover', borderRadius: 6 }} />}
          <button type="submit">{editingId ? 'Update' : 'Add Book'}</button>
        </form>
      </div>

      <div className="card">
        <h3>All Books ({books.length})</h3>
        {books.length === 0 ? <p>No books added yet.</p> : books.map(b => (
          <div key={b.id} style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
            <strong>{b.title}</strong> — {b.author} — {b.quantity} copies
            <div style={{ marginTop: '0.3rem' }}>
              <button onClick={() => adjustStock(b.id,1,'ADD')} style={{ marginRight: 4 }}>+1</button>
              <button onClick={() => adjustStock(b.id,-1,'BORROW')} disabled={b.quantity===0} style={{ marginRight: 4 }}>-1</button>
              <button onClick={() => { setForm(b); setEditingId(b.id); }} style={{ marginRight: 4 }}>Edit</button>
              <button onClick={() => deleteBook(b.id)} style={{ background: '#e53e3e' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}