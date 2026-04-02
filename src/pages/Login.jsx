import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Login = () => {
    const { login } = useApp();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isSignUp) {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (signUpError) throw signUpError;
                navigate('/');
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDummyLogin = (role) => {
        login(`${role}@hotel.com`, role);
        navigate('/');
    };

    return (
        <div className="container flex-center" style={{ minHeight: '80vh', padding: '2rem 0' }}>
            <div className="glass-card" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                    {isSignUp ? 'Create an Account' : 'Welcome Back'}
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    {isSignUp ? 'Sign up for exclusive deals.' : 'Sign in to manage your bookings.'}
                </p>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '10px', borderRadius: '8px', marginBottom: '1rem', border: '1px solid currentColor' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: 'var(--glass-border)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                            {isSignUp ? 'Create Password' : 'Password'}
                        </label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••" 
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: 'var(--glass-border)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                outline: 'none'
                            }} 
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button 
                        type="button" 
                        onClick={() => setIsSignUp(!isSignUp)}
                        style={{ background: 'none', color: 'var(--primary)', padding: 0, textDecoration: 'underline' }}
                    >
                        {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
                    </button>
                </div>

                <hr style={{ margin: '2rem 0', borderColor: 'var(--glass-border)' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button 
                        type="button" 
                        onClick={() => handleDummyLogin('admin')}
                        style={{ background: 'rgba(255,255,255,0.1)' }}
                    >
                        Dummy Login as Admin
                    </button>
                    <button 
                        type="button" 
                        onClick={() => handleDummyLogin('management')}
                        style={{ background: 'rgba(255,255,255,0.1)' }}
                    >
                        Dummy Login as Management
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
