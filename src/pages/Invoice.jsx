
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Download } from 'lucide-react';

const Invoice = () => {
    const location = useLocation();
    const booking = location.state?.booking;

    if (!booking) {
        return <div className="container">No booking found. <Link to="/">Go Home</Link></div>;
    }

    const tax = 45;
    const total = booking.price + tax;

    return (
        <div className="container flex-center" style={{ minHeight: '80vh', padding: '2rem' }}>
            <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '3rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ margin: '0 auto 1rem', width: '60px', height: '60px', borderRadius: '50%', background: '#10b981', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CheckCircle size={32} color="white" />
                    </div>
                    <h1>Booking Confirmed!</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Thank you for choosing SmartStay. Here is your invoice.</p>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Booking ID</span>
                        <span style={{ fontFamily: 'monospace' }}>#{String(booking.id).slice(-6)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Hotel</span>
                        <span>{booking.hotelName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Room</span>
                        <span>{booking.roomType}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Date</span>
                        <span>{booking.date}</span>
                    </div>
                    {booking.isTatkal && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#f59e0b' }}>
                            <span>Offer Applied</span>
                            <span>TATKAL DEAL</span>
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Room Charge</span>
                        <span>${booking.price}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Taxes & Fees</span>
                        <span>${tax}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem', color: 'var(--primary)' }}>
                        <span>Total Paid</span>
                        <span>${total}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/" style={{ flex: 1 }}>
                        <button style={{ width: '100%', background: 'transparent' }}>Return Home</button>
                    </Link>
                    <button style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        <Download size={18} /> Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
