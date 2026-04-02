import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CreditCard, Check, Lock } from 'lucide-react';

const Payment = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { addBooking } = useApp();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');

    if (!state || !state.booking) {
        return <Navigate to="/" replace />;
    }

    const { booking } = state;
    // Base logic to mirror what we display as Total
    const totalAmount = booking.price + (booking.isPackage ? 0 : 45); // Assuming $45 tax on regular rooms

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate payment processing delay
        setTimeout(() => {
            const finalBooking = { ...booking, id: Date.now() };
            addBooking(finalBooking);
            navigate('/invoice', { state: { booking: finalBooking } });
        }, 1500);
    };

    return (
        <div className="container flex-center" style={{ minHeight: '80vh', padding: '2rem 1rem' }}>
            <div className="glass-card" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Lock size={20} color="var(--primary)" /> Secure Payment
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Complete your booking for {booking.hotelName}
                </p>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Booking Total</span>
                        <span style={{ fontWeight: 'bold' }}>${totalAmount}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {booking.isPackage ? 'Package Deal' : `Room: ${booking.roomType} (Taxes included)`}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button 
                        type="button" 
                        onClick={() => setPaymentMethod('card')}
                        style={{ 
                            flex: 1, 
                            background: paymentMethod === 'card' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                            border: paymentMethod === 'card' ? '1px solid transparent' : '1px solid var(--glass-border)'
                        }}
                    >
                        Credit Card
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setPaymentMethod('upi')}
                        style={{ 
                            flex: 1, 
                            background: paymentMethod === 'upi' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                            border: paymentMethod === 'upi' ? '1px solid transparent' : '1px solid var(--glass-border)'
                        }}
                    >
                        UPI / Wallet
                    </button>
                </div>

                <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {paymentMethod === 'card' ? (
                        <>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Card Number</label>
                                <div style={{ position: 'relative' }}>
                                    <CreditCard size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input 
                                        type="text" 
                                        placeholder="0000 0000 0000 0000" 
                                        required 
                                        maxLength="19"
                                        style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '8px', border: 'var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }} 
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Expiry Date</label>
                                    <input type="text" placeholder="MM/YY" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>CVV</label>
                                    <input type="password" placeholder="123" required maxLength="4" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>UPI ID</label>
                            <input 
                                type="text" 
                                placeholder="username@upi" 
                                required 
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }} 
                            />
                        </div>
                    )}

                    <button type="submit" disabled={loading} style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                        {loading ? 'Processing Payment...' : (
                            <>
                                Pay ${totalAmount} <Check size={18} />
                            </>
                        )}
                    </button>
                    
                    <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        This is a secure 128-bit SSL encrypted payment.
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Payment;
