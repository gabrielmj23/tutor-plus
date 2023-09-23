import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBu5PwuSlkRCFGZBMdEROBv0GzJiTbPitY',
  authDomain: 'tutor-plus-ucab.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'tutor-plus-ucab',
  storageBucket: 'tutor-plus-ucab.appspot.com',
  messagingSenderId: '265559781258',
  appId: '1:265559781258:web:559d5d7a4a6b559b58e273',
  measurementId: 'G-5S76EXB0ZN',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
