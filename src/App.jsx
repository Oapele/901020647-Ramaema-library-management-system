import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Users from './pages/Users';
import Transactions from './pages/Transactions';
import Login from './pages/Login';

const defaultBooks = [
  {
    id: 'seed-book-1',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    isbn: '978-0618260300',
    quantity: 3,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'seed-book-2',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self Development',
    isbn: '978-0735211292',
    quantity: 2,
    coverImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'seed-book-3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Classic',
    isbn: '978-1503290563',
    quantity: 4,
    coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80'
  }
];

const defaultUsers = [
  {
    id: 'seed-user-1',
    name: 'Admin Librarian',
    membershipId: 'LIB-ADMIN',
    role: 'admin'
  },
  {
    id: 'seed-user-2',
    name: 'Ava Smith',
    membershipId: 'LIB-001',
    role: 'member'
  }
];

const readStoredData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [books, setBooks] = useState(() => readStoredData('library_books', defaultBooks));
  const [users, setUsers] = useState(() => readStoredData('library_users', defaultUsers));
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('library_transactions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('library_currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const addBook = (bookData) => {
    setBooks(prev => {
      const nextBooks = [...prev, { ...bookData, id: Date.now(), quantity: Number(bookData.quantity) || 0 }];
      localStorage.setItem('library_books', JSON.stringify(nextBooks));
      return nextBooks;
    });
  };

  const updateBook = (id, updatedData) => {
    setBooks(prev => {
      const nextBooks = prev.map(b => b.id === id ? { ...b, ...updatedData } : b);
      localStorage.setItem('library_books', JSON.stringify(nextBooks));
      return nextBooks;
    });
  };

  const deleteBook = (id) => {
    setBooks(prev => {
      const nextBooks = prev.filter(b => b.id !== id);
      localStorage.setItem('library_books', JSON.stringify(nextBooks));
      return nextBooks;
    });
  };

  const adjustStock = (bookId, changeAmount, type) => {
    setBooks(prev => {
      const nextBooks = prev.map(b => {
        if (b.id === bookId) {
          const newQty = Math.max(0, b.quantity + changeAmount);
          const nextTransaction = {
            bookId, title: b.title, change: changeAmount, type,
            date: new Date().toLocaleString()
          };
          setTransactions(prevTransactions => {
            const nextTransactions = [nextTransaction, ...prevTransactions].slice(0, 100);
            localStorage.setItem('library_transactions', JSON.stringify(nextTransactions));
            return nextTransactions;
          });
          return { ...b, quantity: newQty };
        }
        return b;
      });
      localStorage.setItem('library_books', JSON.stringify(nextBooks));
      return nextBooks;
    });
  };

  const addUser = (userData) => {
    setUsers(prev => {
      const nextUsers = [...prev, { ...userData, id: Date.now() }];
      localStorage.setItem('library_users', JSON.stringify(nextUsers));
      return nextUsers;
    });
  };

  const updateUser = (id, data) => {
    setUsers(prev => {
      const nextUsers = prev.map(u => u.id === id ? { ...u, ...data } : u);
      localStorage.setItem('library_users', JSON.stringify(nextUsers));
      return nextUsers;
    });
  };

  const deleteUser = (id) => {
    setUsers(prev => {
      const nextUsers = prev.filter(u => u.id !== id);
      localStorage.setItem('library_users', JSON.stringify(nextUsers));
      return nextUsers;
    });
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('library_currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('library_currentUser');
  };

  const Protected = ({ children }) => currentUser ? children : <Navigate to="/login" replace />;

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {currentUser && (
        <nav>
          <Link to="/" className="nav-link">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80" alt="Dashboard" />
            <span>Dashboard</span>
          </Link>
          <Link to="/books" className="nav-link">
            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=200&q=80" alt="Books" />
            <span>Books</span>
          </Link>
          <Link to="/users" className="nav-link">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=200&q=80" alt="Users" />
            <span>Users</span>
          </Link>
          <Link to="/transactions" className="nav-link">
            <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=200&q=80" alt="Transactions" />
            <span>Transactions</span>
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      )}
      <div className="container">
        <Routes>
          <Route path="/login" element={!currentUser ? <Login onLogin={handleLogin} users={users} /> : <Navigate to="/" replace />} />
          <Route path="/" element={<Protected><Dashboard books={books} /></Protected>} />
          <Route path="/books" element={<Protected><Books books={books} addBook={addBook} updateBook={updateBook} deleteBook={deleteBook} adjustStock={adjustStock} /></Protected>} />
          <Route
            path="/users"
            element={
              !currentUser ? (
                <Users users={users} addUser={addUser} updateUser={updateUser} deleteUser={deleteUser} />
              ) : (
                <Protected><Users users={users} addUser={addUser} updateUser={updateUser} deleteUser={deleteUser} /></Protected>
              )
            }
          />
          <Route path="/transactions" element={<Protected><Transactions transactions={transactions} /></Protected>} />
          <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}