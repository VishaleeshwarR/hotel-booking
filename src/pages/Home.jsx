
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MapPin, Star, AlertCircle, CheckCircle } from 'lucide-react';

const Home = () => {
    const [sortedHotels, setSortedHotels] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('hotels').select('*');
            if (error) {
                console.error('Error fetching hotels:', error);
            } else if (data) {
                const sorted = [...data].sort((a, b) => {
                    if (a.availability === 0 && b.availability > 0) return 1;
                    if (b.availability === 0 && a.availability > 0) return -1;
                    return b.availability - a.availability;
                });
                setSortedHotels(sorted);
            }
            setLoading(false);
        };
        fetchHotels();
    }, []);

    if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading hotels...</div>;

    const getAvailabilityBadge = (count) => {
        if (count === 0) return <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={14} /> Sold Out</span>;
        if (count < 10) return <span style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={14} /> Filling Fast ({count} left)</span>;
        return <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} /> Available ({count} rooms)</span>;
    };

    const filteredHotels = filter === 'All' 
        ? sortedHotels 
        : filter === 'Tatkal Deals'
            ? sortedHotels.filter(h => h.tatkalPrice < h.price)
            : sortedHotels.filter(h => h.type === filter);

    return (
        <div className="container">
            <header style={{ textAlign: 'center', margin: '4rem 0' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    Find Your <span className="text-gradient">Perfect Stay</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                    Real-time availability, smart booking, and premium packages.
                </p>
            </header>

            {/* Category Filter */}
            <div className="flex-center" style={{ gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {['All', 'Luxury', 'Business', 'Resort', 'Hostel', 'Tatkal Deals'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            borderColor: filter === cat ? 'var(--primary)' : 'transparent',
                            background: filter === cat ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-glass)'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {filteredHotels.map(hotel => (
                    <div key={hotel.id} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ position: 'relative', height: '200px' }}>
                            <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {hotel.type}
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <h3 style={{ fontSize: '1.2rem' }}>{hotel.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                                    <Star size={16} fill="#fbbf24" /> {hotel.rating}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <MapPin size={16} /> {hotel.location}
                            </div>

                            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${hotel.price}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/night</span>
                                </div>
                                <div style={{ fontSize: '0.9rem' }}>
                                    {getAvailabilityBadge(hotel.availability)}
                                </div>
                            </div>

                            <Link to={`/hotel/${hotel.id}`} style={{ width: '100%' }}>
                                <button style={{ width: '100%', marginTop: '1rem', opacity: hotel.availability === 0 ? 0.5 : 1 }} disabled={hotel.availability === 0}>
                                    {hotel.availability === 0 ? 'Sold Out' : 'Book Now'}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
