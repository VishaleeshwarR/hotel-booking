
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Login from './pages/Login';
import HotelDetails from './pages/HotelDetails';
import Packages from './pages/Packages';
import Invoice from './pages/Invoice';
import Payment from './pages/Payment';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { MessageSquare } from 'lucide-react';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/hotel/:id" element={<HotelDetails />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/invoice" element={<Invoice />} />
            </Routes>
          </main>

          {/* Module 8: Customer Support Floating Action Button */}
          <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
            <button style={{
              borderRadius: '50%', width: '60px', height: '60px',
              padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',
              background: 'var(--secondary)', boxShadow: '0 4px 14px rgba(236, 72, 153, 0.5)'
            }} onClick={() => alert("Customer Support Module \n\nHotline: 1800-HOTEL-HELP\nLive Chat: Connecting...")}>
              <MessageSquare size={28} color="white" />
            </button>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
