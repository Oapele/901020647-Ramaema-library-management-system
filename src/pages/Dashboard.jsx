export default function Dashboard({ books }) {
  const lowStock = books.filter(b => b.quantity < 2);
  const totalCopies = books.reduce((s, b) => s + b.quantity, 0);

  return (
    <div>
      <div className="hero-banner">
        <div>
          <p className="eyebrow">Library Overview</p>
          <div className="title-row">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80" alt="Dashboard" className="title-icon" />
            <h1>Library Dashboard</h1>
          </div>
        </div>
        <div className="hero-pill">{books.length} titles tracked</div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <span>Total Titles</span>
          <strong>{books.length}</strong>
        </div>
        <div className="stat-card success">
          <span>Total Copies</span>
          <strong>{totalCopies}</strong>
        </div>
        <div className="stat-card danger">
          <span>Low Stock</span>
          <strong>{lowStock.length}</strong>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="card empty-card">
          <p>No books yet. Go to Books page to add one.</p>
        </div>
      ) : (
        <div className="card">
          <div className="section-header">
            <h3>Featured Collection</h3>
          </div>

          <div className="book-grid-modern">
            {books.map(b => (
              <div key={b.id} className="book-card-modern">
                {b.coverImage ? (
                  <img src={b.coverImage} alt={b.title} className="book-card-image" />
                ) : (
                  <div className="book-card-placeholder">📖</div>
                )}

                <div className="book-card-content">
                  <h4>{b.title}</h4>
                  <p>{b.author}</p>
                  <div className={`stock-badge ${b.quantity < 2 ? 'low' : ''}`}>
                    {b.quantity} available
                  </div>
                </div>
              </div>
            ))}
          </div>

          <table className="modern-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {books.map(b => (
                <tr key={b.id}>
                  <td>
                    {b.coverImage ? (
                      <img src={b.coverImage} alt={b.title} className="mini-cover" />
                    ) : (
                      <div className="mini-cover placeholder">📖</div>
                    )}
                  </td>
                  <td><strong>{b.title}</strong></td>
                  <td>{b.author}</td>
                  <td className={b.quantity < 2 ? 'low-stock-text' : ''}>{b.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}