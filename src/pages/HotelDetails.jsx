
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import { MapPin, Star, Calendar, Clock, Check, Shield } from 'lucide-react';

const HotelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addBooking, user } = useApp();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkIn, setCheckIn] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const fetchHotel = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('hotels')
                .select('*, rooms(*)')
                .eq('id', parseInt(id))
                .single();
            
            if (error) {
                console.error('Error fetching hotel details:', error);
            } else if (data) {
                setHotel(data);
            }
            setLoading(false);
        };
        fetchHotel();
    }, [id]);

    if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading hotel details...</div>;
    if (!hotel) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Hotel not found</div>;

    // SYSTEM LOGIC: Tatkal / Last Minute
    // If check-in is today or tomorrow (within 24-48h logic), apply Tatkal pricing.
    const isTatkal = () => {
        if (!checkIn) return false;
        const date = new Date(checkIn);
        const today = new Date();
        const diffTime = date - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 1 && diffDays >= 0;
    };

    const activeTatkal = isTatkal();

    const handleBook = () => {
        if (!user) {
            alert("Please login to book a room");
            navigate('/login');
            return;
        }
        if (!checkIn || !selectedRoom) {
            alert("Please select dates and a room");
            return;
        }

        const price = activeTatkal ? hotel.tatkalPrice : selectedRoom.price;

        const newBooking = {
            hotelName: hotel.name,
            roomType: selectedRoom.type,
            price: price,
            nights: 1, // simplified
            date: checkIn,
            isTatkal: activeTatkal
        };

        navigate('/payment', { state: { booking: newBooking } });
    };

    return (
        <div className="container">
            {/* Hero Section */}
            <div style={{ position: 'relative', height: '400px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '2rem' }}>
                <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem',
                    background: 'linear-gradient(to top, var(--bg-dark), transparent)'
                }}>
                    <h1 style={{ fontSize: '3rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{hotel.name}</h1>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                        <span className="flex-center" style={{ gap: '5px' }}><MapPin size={18} /> {hotel.location}</span>
                        <span className="flex-center" style={{ gap: '5px', color: '#fbbf24' }}><Star size={18} fill="#fbbf24" /> {hotel.rating}</span>
                        <span className="flex-center" style={{ gap: '5px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px' }}>{hotel.type}</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Left: Info & Rooms */}
                <div>
                    <div className="glass-card" style={{ marginBottom: '2rem' }}>
                        <h2 style={{ marginBottom: '1rem' }}>Amenities</h2>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {hotel.amenities.map(a => (
                                <span key={a} style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '5px 12px', borderRadius: '20px' }}>
                                    {a}
                                </span>
                            ))}
                        </div>
                    </div>

                    <h2 style={{ marginBottom: '1.5rem' }}>Select a Room</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {hotel.rooms?.map((room, idx) => (
                            <div
                                key={idx}
                                className="glass-card"
                                onClick={() => setSelectedRoom(room)}
                                style={{
                                    cursor: 'pointer',
                                    border: selectedRoom === room ? '1px solid var(--primary)' : 'var(--glass-border)',
                                    background: selectedRoom === room ? 'rgba(99, 102, 241, 0.05)' : 'var(--bg-card)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}
                            >
                                <div>
                                    <h3 style={{ fontSize: '1.2rem' }}>{room.type}</h3>
                                    <div style={{ color: 'var(--text-muted)' }}>Capacity: {room.capacity} Persons</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        ${activeTatkal ? hotel.tatkalPrice : room.price}
                                    </div>
                                    {activeTatkal && <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 'bold' }}>TATKAL DEAL</div>}
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/night</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Booking Card */}
                <div>
                    <div className="glass-card" style={{ position: 'sticky', top: '100px' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Calendar /> Book Your Stay
                        </h3>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Check-in Date</label>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                style={{
                                    width: '100%', padding: '10px', borderRadius: '8px',
                                    border: 'var(--glass-border)', background: 'rgba(255,255,255,0.05)',
                                    color: 'white', fontFamily: 'inherit', marginBottom: '10px'
                                }}
                            />
                            
                            <button
                                onClick={() => setCheckIn(new Date().toISOString().split('T')[0])}
                                style={{ width: '100%', padding: '8px', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', marginBottom: '0.5rem' }}
                            >
                                ⚡ Fast-Track: Apply Tatkal (Today)
                            </button>

                            {activeTatkal && (
                                <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid #ef4444', display: 'flex', gap: '10px', alignItems: 'start' }}>
                                    <Clock size={16} color="#ef4444" style={{ marginTop: '2px' }} />
                                    <div>
                                        <strong style={{ color: '#ef4444', display: 'block' }}>Tatkal Rate Applied!</strong>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last-minute booking logic is active. Special pricing unlocked.</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Room Total</span>
                                <span>${selectedRoom ? (activeTatkal ? hotel.tatkalPrice : selectedRoom.price) : 0}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                                <span>Taxes & Fees</span>
                                <span>$45</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem' }}>
                                <span>Total</span>
                                <span>${selectedRoom ? (activeTatkal ? hotel.tatkalPrice : selectedRoom.price) + 45 : 0}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleBook}
                            style={{ width: '100%', background: 'var(--primary)', color: 'white' }}
                        >
                            Confirm Booking
                        </button>
                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            <Shield size={12} /> Secure Booking
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
