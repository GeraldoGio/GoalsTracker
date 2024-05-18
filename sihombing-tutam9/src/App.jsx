import React, { useState, useEffect } from 'react';
import './App.css';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';


const BudgetTracker = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [totalSpending, setTotalSpending] = useState(0);
  const [budgetLimit, setBudgetLimit] = useState(100000);
  const [userName, setUserName] = useState('');
  const [isNewTracker, setIsNewTracker] = useState(true);
  const [trackerHistory, setTrackerHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.amount, 0);
    setTotalSpending(total);
  }, [items]);

  useEffect(() => {
    if (totalSpending > budgetLimit) {
      alert('Pengeluaran Anda telah melebihi batas. Ayo berhemat!');
    }
  }, [totalSpending, budgetLimit]);

  const handleAddItem = () => {
    if (newItem && newAmount) {
      const amount = parseFloat(newAmount);
      if (!isNaN(amount)) {
        setItems([...items, { name: newItem, amount }]);
        setNewItem('');
        setNewAmount('');
      } else {
        alert('Nominal uang tidak valid');
      }
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleBudgetChange = (e) => {
    const limit = parseFloat(e.target.value);
    if (!isNaN(limit)) {
      setBudgetLimit(limit);
    } else {
      alert('Batas pengeluaran tidak valid');
    }
  };

  const handleNewTracker = () => {
    setUserName('');
    setItems([]);
    setTotalSpending(0);
    setBudgetLimit(100000);
    setIsNewTracker(true);
    setTrackerHistory([...trackerHistory, { userName, items, budgetLimit }]);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div>
            {isNewTracker ? (
              <div className="centered-input">
                <h2>Masukkan Nama Anda</h2>
                <input
                  type="text"
                  placeholder="Nama Anda"
                  value={userName}
                  onChange={handleUserName}
                />
                <button onClick={() => setIsNewTracker(false)}>Mulai</button>
              </div>
            ) : (
              <div>
                <h2>{userName} - Budget Tracker</h2>
                <button onClick={handleNewTracker}>Buat Tracker Baru</button>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Nama Barang"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Nominal Uang"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                  />
                  <button onClick={handleAddItem}>Tambah</button>
                </div>
                <ul>
                  {items.map((item, index) => (
                    <li key={index}>
                      {item.name} - Rp{item.amount.toFixed(2)}
                      <button onClick={() => handleRemoveItem(index)}>Hapus</button>
                    </li>
                  ))}
                </ul>
                <p>Total Pengeluaran: Rp{totalSpending.toFixed(2)}</p>
                <div className="budget-limit">
                  <label htmlFor="budgetLimit">Batas Pengeluaran: Rp</label>
                  <input
                    id="budgetLimit"
                    type="number"
                    value={budgetLimit}
                    onChange={handleBudgetChange}
                  />
                </div>
              </div>
            )}
          </div>
        );
      case 'trackerHistory':
        return (
          <div>
            <h2>Tracker History</h2>
            <ul>
              {trackerHistory.map((history, index) => (
                <li key={index}>
                  <h3>{history.userName}</h3>
                  <p>Budget Limit: Rp{history.budgetLimit.toFixed(2)}</p>
                  <ul>
                    {history.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item.name} - Rp{item.amount.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'contact':
        return (
          <div>
            <h1 className="text-4xl">Contact</h1>
            <ul>
              <li>Email: sihombinggiovano@gmail.com</li>
              <li>
                <FaInstagram /> Instagram:{' '}
                <a href="https://www.instagram.com/giogrld" target="_blank" rel="noopener noreferrer">
                  @giogrld
                </a>
              </li>
              <li>
                <FaLinkedin /> LinkedIn:{' '}
                <a
                  href="https://id.linkedin.com/in/sihombinggiovano"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  sihombinggiovano
                </a>
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <span>GoalsTracker</span>
        </div>
        <ul className="navbar-menu">
          <li>
            <button onClick={() => setCurrentPage('home')}>Home</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('trackerHistory')}>Tracker History</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('contact')}>Contact</button>
          </li>
        </ul>
      </nav>
      <div className="container">{renderPage()}</div>
    </div>
  );
};

export default BudgetTracker;
