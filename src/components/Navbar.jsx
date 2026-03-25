
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hotel, User, Menu, LayoutDashboard, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
    const { user, logout } = useApp();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <nav className="navbar glass-card" style={{
            position: 'sticky',
            top: '1rem',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            margin: '0 1rem'
        }}>
            <Link to="/" className="logo flex-center" style={{ gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                <Hotel className="text-gradient" size={28} />
                <span className="text-gradient">SmartStay</span>
            </Link>

            <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
                <Link to="/">Home</Link>
                <Link to="/packages">Packages</Link>
                {user?.role === 'admin' && <Link to="/admin">Dashboard</Link>}
            </div>

            <div className="nav-actions" style={{ display: 'flex', gap: '1rem' }}>
                {user ? (
                    <div className="flex-center" style={{ gap: '1rem' }}>
                        <span>Hi, {user.name}</span>
                        <button onClick={handleLogout} className="flex-center" style={{ gap: '0.5rem', padding: '0.4em 0.8em' }}>
                            <LogOut size={16} />
                        </button>
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="flex-center" style={{ gap: '0.5rem' }}>
                            <User size={18} /> Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
