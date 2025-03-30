'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import { useAuth } from './context/AuthContext';
import AuthModal from './components/AuthModal';

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    // Check URL parameters for auth mode
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('auth');
    if (mode === 'signin' || mode === 'signup') {
      setAuthMode(mode as 'signin' | 'signup');
      if (mode === 'signin') {
        setShowSignIn(true);
      } else {
        setShowSignUp(true);
      }
    }
  }, []);

  const handleCardClick = () => {
    if (!user) {
      setAuthMode('signin');
      setShowSignIn(true);
      router.push('?auth=signin');
    }
  };

  const handleAuthModeChange = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    if (mode === 'signin') {
      setShowSignUp(false);
      setShowSignIn(true);
      router.push('?auth=signin');
    } else {
      setShowSignIn(false);
      setShowSignUp(true);
      router.push('?auth=signup');
    }
  };

  const handleCloseModal = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.authButtons}>
          {user ? (
            <>
              <span className={styles.userEmail}>{user.email}</span>
              <button onClick={logout} className={styles.authButton}>Sign Out</button>
            </>
          ) : (
            <>
              <button 
                onClick={() => {
                  setAuthMode('signin');
                  setShowSignIn(true);
                  router.push('?auth=signin');
                }} 
                className={styles.authButton}
              >
                Sign In
              </button>
              <button 
                onClick={() => {
                  setAuthMode('signup');
                  setShowSignUp(true);
                  router.push('?auth=signup');
                }} 
                className={styles.authButton}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
        <h1 className={styles.title}>
          <span className={styles.titleText}>Pickup</span>
          <span className={styles.titleHighlight}>Dashboard</span>
        </h1>
      </header>
      <main className={styles.main}>
        <div className={styles.cardContainer}>
          <div className={`${styles.card} ${!user ? styles.disabled : ''}`} onClick={handleCardClick}>
            <h2>Available Pickups</h2>
            <p>View and manage all available pickup requests</p>
            <button className={styles.button}>View Available</button>
          </div>
          <div className={`${styles.card} ${!user ? styles.disabled : ''}`} onClick={handleCardClick}>
            <h2>Selected Pickups</h2>
            <p>View your currently selected pickup requests</p>
            <button className={styles.button}>View Selected</button>
          </div>
        </div>
      </main>

      <AuthModal 
        isOpen={showSignIn} 
        onClose={handleCloseModal} 
        mode="signin" 
        onModeChange={handleAuthModeChange}
      />
      <AuthModal 
        isOpen={showSignUp} 
        onClose={handleCloseModal} 
        mode="signup" 
        onModeChange={handleAuthModeChange}
      />
    </div>
  );
}
