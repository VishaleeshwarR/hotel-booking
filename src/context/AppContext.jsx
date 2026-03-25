
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Initialize from LocalStorage if available
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

    const login = (email, role = 'user') => {
        const newUser = { name: email.split('@')[0], email, role };
        setUser(newUser);
        localStorage.setItem('hotel_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('hotel_user');
    };

    const addBooking = (booking) => {
        const newBookings = [...bookings, { ...booking, id: Date.now(), status: 'Confirmed' }];
        setBookings(newBookings);
        localStorage.setItem('hotel_bookings', JSON.stringify(newBookings));
    };

    const cancelBooking = (id) => {
        const updatedBookings = bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b);
        setBookings(updatedBookings);
        localStorage.setItem('hotel_bookings', JSON.stringify(updatedBookings));
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
