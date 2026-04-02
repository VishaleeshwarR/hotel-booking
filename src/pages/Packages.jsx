import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState({});
    const { addBooking, user } = useApp();
    const navigate = useNavigate();

    const todayStr = new Date().toLocaleDateString('en-CA');

    useEffect(() => {
        const fetchPackages = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('packages').select('*');
            if (error) {
                console.error("Error fetching packages:", error);
            } else if (data) {
                setPackages(data);
            }
            setLoading(false);
        };
        fetchPackages();
    }, []);

    const handleBookPackage = (pkg) => {
        if (!user) {
            alert("Please login to book a package");
            navigate('/login');
            return;
        }

        const travelDate = selectedDate[pkg.id];
        if (!travelDate) {
            alert("Please select a travel start date for this package.");
            return;
        }
        if (travelDate < todayStr) {
            alert("Travel date cannot be in the past. Please select today or a future date.");
            return;
        }

        const newBooking = {
            hotelName: pkg.title,
            roomType: 'Package Deal',
            price: pkg.price,
            nights: parseInt(pkg.duration) || 1,
            date: travelDate,
            isTatkal: false,
            isPackage: true
        };

        navigate('/payment', { state: { booking: newBooking } });
    };

    if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading packages...</div>;

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    Curated <span className="text-gradient">Experiences</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    More than just a room. Choose from our expertly designed packages for every type of traveler.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {packages.map((pkg) => (
                    <div key={pkg.id} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '220px', position: 'relative' }}>
                            <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{
                                position: 'absolute', bottom: '0', left: '0', right: '0',
                                background: 'linear-gradient(to top, rgba(15,23,42,1), transparent)',
                                padding: '2rem 1.5rem 1rem'
                            }}>
                                <h3 style={{ fontSize: '1.5rem', color: 'white' }}>{pkg.title}</h3>
                            </div>
                        </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>${pkg.price}</span>
                                    <span style={{
                                        background: 'rgba(255,255,255,0.1)', padding: '5px 10px',
                                        borderRadius: '20px', fontSize: '0.9rem'
                                    }}>
                                        {pkg.duration}
                                    </span>
                                </div>

                                <div style={{ flex: 1 }}>
                                    {pkg.includes.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '0.8rem', color: 'var(--text-muted)' }}>
                                            <Check size={18} color="var(--secondary)" />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                {/* Travel Date Selector */}
                                <div style={{ marginTop: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        📅 Select Travel Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate[pkg.id] || ''}
                                        min={todayStr}
                                        onChange={(e) => setSelectedDate(prev => ({ ...prev, [pkg.id]: e.target.value }))}
                                        style={{
                                            width: '100%', padding: '8px 10px', borderRadius: '8px',
                                            border: 'var(--glass-border)', background: 'rgba(255,255,255,0.05)',
                                            color: 'white', fontFamily: 'inherit', marginBottom: '0.75rem',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>

                                <button onClick={() => handleBookPackage(pkg)} style={{
                                    marginTop: '0.5rem', width: '100%', display: 'flex',
                                    justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}>
                                    Book Package <ArrowRight size={18} />
                                </button>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Packages;
