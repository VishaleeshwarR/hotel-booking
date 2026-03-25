
import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, Users, Calendar, DollarSign } from 'lucide-react';

const Admin = () => {
    const { bookings, user } = useApp();

    if (!user || user.role !== 'admin') {
        return (
            <div className="container flex-center" style={{ minHeight: '60vh' }}>
                <div className="glass-card">
                    <h2>Access Denied</h2>
                    <p>You must be logged in as an Admin to view this page.</p>
                </div>
            </div>
        );
    }

    // Mock Stats
    const stats = [
        { title: "Total Bookings", value: bookings.length + 124, icon: <Calendar size={24} color="#6366f1" /> },
        { title: "Revenue (mtd)", value: "$12,450", icon: <DollarSign size={24} color="#10b981" /> },
        { title: "Active Users", value: "1,203", icon: <Users size={24} color="#f59e0b" /> },
        { title: "Occupancy Rate", value: "78%", icon: <BarChart3 size={24} color="#ec4899" /> },
    ];

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                            {stat.icon}
                        </div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{stat.title}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Recent Bookings Module */}
                <div className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Recent Bookings</h3>
                    {bookings.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)' }}>No active bookings in session.</p>
                    ) : (
                        bookings.map((b, i) => (
                            <div key={i} style={{
                                padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{b.hotelName}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.roomType} • {b.nights} nights</div>
                                </div>
                                <div style={{
                                    padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem',
                                    background: 'rgba(16, 185, 129, 0.2)', color: '#10b981'
                                }}>
                                    {b.status}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* System Health Module */}
                <div className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem' }}>System Health</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {['Database Connection', 'Payment Gateway', 'Email Service', 'Backup System'].map((sys, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>{sys}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10b981', fontSize: '0.9rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                                    Operational
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
