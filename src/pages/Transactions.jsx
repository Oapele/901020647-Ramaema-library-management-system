export default function Transactions({ transactions }) {
  return (
    <div>
      <div className="title-row">
        <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=200&q=80" alt="Transactions" className="title-icon" />
        <h1>Transaction History</h1>
      </div>
      <div className="card">
        {transactions.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem' }}>No transactions yet.</p>
        ) : (
          <table>
            <thead><tr><th>Time</th><th>Book</th><th>Change</th></tr></thead>
            <tbody>
              {transactions.map((t,i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>{t.title}</td>
                  <td style={{ color: t.change > 0 ? 'green' : 'red' }}>{t.change > 0 ? '+' : ''}{t.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}