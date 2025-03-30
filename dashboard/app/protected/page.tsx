'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../page.module.css";
import { useAuth } from '../context/AuthContext';

export default function ProtectedPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.authButtons}>
          <span className={styles.userEmail}>Welcome, {user.email}!</span>
          <button onClick={logout} className={styles.authButton}>Sign Out</button>
        </div>
        <h1 className={styles.title}>
          <span className={styles.titleText}>Pickup</span>
          <span className={styles.titleHighlight}>Dashboard</span>
        </h1>
      </header>
      <main className={styles.main}>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h2>Available Pickups</h2>
            <p>View and manage all available pickup requests</p>
            <button className={styles.button}>View Available</button>
          </div>
          <div className={styles.card}>
            <h2>Selected Pickups</h2>
            <p>View your currently selected pickup requests</p>
            <button className={styles.button}>View Selected</button>
          </div>
        </div>
      </main>
    </div>
  );
} 