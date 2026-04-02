
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Initialize from LocalStorage if available (fallback for mock users)
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('hotel_user');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error("Failed to parse user from local storage", e);
            return null;
        }
    });

    const [bookings, setBookings] = useState(() => {
        try {
            const saved = localStorage.getItem('hotel_bookings');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to parse bookings from local storage", e);
            return [];
        }
    });

    // Mock System Time for Tatkal Logic (Defaults to Now)
    const [systemDate] = useState(new Date());

    useEffect(() => {
        import('../lib/supabase').then(({ supabase }) => {
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session?.user) {
                    setUser({
                        id: session.user.id,
                        email: session.user.email,
                        name: session.user.email.split('@')[0],
                        role: 'user',
                        isSupabase: true
                    });
                }
            });

            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                if (session?.user) {
                    setUser({
                        id: session.user.id,
                        email: session.user.email,
                        name: session.user.email.split('@')[0],
                        role: 'user',
                        isSupabase: true
                    });
                } else {
                    // Only clear user if it's currently a supabase user.
                    setUser((prev) => (prev?.isSupabase ? null : prev));
                }
            });

            return () => subscription.unsubscribe();
        }).catch(err => console.error("Error loading supabase in context:", err));
    }, []);

    const login = (email, role = 'user') => {
        const newUser = { name: email.split('@')[0], email, role, isMock: true };
        setUser(newUser);
        localStorage.setItem('hotel_user', JSON.stringify(newUser));
    };

    const logout = async () => {
        if (user?.isSupabase) {
            const { supabase } = await import('../lib/supabase');
            await supabase.auth.signOut();
        }
        setUser(null);
        localStorage.removeItem('hotel_user');
    };

    const addBooking = (booking) => {
        const newBookings = [...bookings, { ...booking, userEmail: user?.email, id: Date.now(), status: 'Confirmed' }];
        setBookings(newBookings);
        localStorage.setItem('hotel_bookings', JSON.stringify(newBookings));
    };

    const cancelBooking = async (id) => {
        const booking = bookings.find(b => b.id === id);
        const updatedBookings = bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b);
        setBookings(updatedBookings);
        localStorage.setItem('hotel_bookings', JSON.stringify(updatedBookings));

        // Restore room availability in Supabase (only for room bookings, not packages)
        if (booking && booking.hotelId && !booking.isPackage) {
            try {
                // Fetch current availability first
                const { data: hotelData, error: fetchError } = await supabase
                    .from('hotels')
                    .select('availability')
                    .eq('id', booking.hotelId)
                    .single();

                if (!fetchError && hotelData) {
                    await supabase
                        .from('hotels')
                        .update({ availability: hotelData.availability + 1 })
                        .eq('id', booking.hotelId);
                }
            } catch (err) {
                console.error('Failed to restore room availability on cancellation:', err);
            }
        }
    };

    return (
        <AppContext.Provider value={{
            user,
            login,
            logout,
            bookings,
            addBooking,
            cancelBooking,
            systemDate
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
