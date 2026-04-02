import React from 'react';
import { useApp } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, XCircle } from 'lucide-react';

const Dashboard = () => {
    const { user, bookings, cancelBooking } = useApp();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Filter bookings for the logged-in user
    // Make sure we show old bookings if userEmail isn't set, or safely compare
    const userBookings = bookings.filter(b => b.userEmail === user.email || !b.userEmail);

    const handleCancel = (id) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            cancelBooking(id);
        }
    };

    return (
        <div className="container" style={{ padding: '3rem 1rem', minHeight: '80vh' }}>
            <h1 style={{ marginBottom: '2rem' }}>My Dashboard</h1>

            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>User Profile</h2>
                <p style={{ color: 'var(--text-muted)' }}><strong>Name:</strong> {user.name}</p>
                <p style={{ color: 'var(--text-muted)' }}><strong>Email:</strong> {user.email}</p>
                <p style={{ color: 'var(--text-muted)' }}><strong>Role:</strong> <span style={{ textTransform: 'capitalize' }}>{user.role}</span></p>
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>Booking History</h2>
            {userBookings.length === 0 ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>You have no bookings yet.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {userBookings.map((booking) => (
                        <div key={booking.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{booking.hotelName}</h3>
                                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                    <span className="flex-center" style={{ gap: '0.5rem' }}><MapPin size={16} /> Room: {booking.roomType}</span>
                                    <span className="flex-center" style={{ gap: '0.5rem' }}><Calendar size={16} /> Date: {booking.date}</span>
                                    <span className="flex-center" style={{ gap: '0.5rem' }}><Clock size={16} /> Nights: {booking.nights}</span>
                                </div>
                                <div>
                                    <span style={{ 
                                        display: 'inline-block',
                                        padding: '4px 8px', 
                                        borderRadius: '4px', 
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        backgroundColor: booking.status === 'Confirmed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                        color: booking.status === 'Confirmed' ? '#22c55e' : '#ef4444'
                                    }}>
                                        {booking.status}
                                    </span>
                                    {booking.isTatkal && (
                                        <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#fbbf24' }}>⚡ Tatkal Booking</span>
                                    )}
                                </div>
                            </div>

                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                                    ${booking.price}
                                </div>
                                {booking.status === 'Confirmed' && (
                                    <button 
                                        onClick={() => handleCancel(booking.id)}
                                        style={{ 
                                            background: 'transparent', 
                                            border: '1px solid #ef4444', 
                                            color: '#ef4444', 
                                            padding: '0.4rem 0.8rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        <XCircle size={16} /> Cancel Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
