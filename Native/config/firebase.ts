import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB83GkiIHeh0Y4CqsBkvJL3aJqbR0eX4o",
  authDomain: "appauth-1a2c1.firebaseapp.com",
  projectId: "appauth-1a2c1",
  storageBucket: "appauth-1a2c1.firebasestorage.app",
  messagingSenderId: "493817757743",
  appId: "1:493817757743:web:d10630319a6f680e9d06da"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
const auth = getAuth(app);

export { auth };
export default app; 