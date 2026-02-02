import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCVPZLqm_qxqof9q0O3v1uJeP-eIwSkGyc",
  authDomain: "big-game-boxes.firebaseapp.com",
  databaseURL: "https://big-game-boxes-default-rtdb.firebaseio.com",
  projectId: "big-game-boxes",
  storageBucket: "big-game-boxes.firebasestorage.app",
  messagingSenderId: "577628785747",
  appId: "1:577628785747:web:daf564a3f733a683700aa6",
  measurementId: "G-Z0B6BHC4J7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
