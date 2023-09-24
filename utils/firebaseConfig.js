import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBu5PwuSlkRCFGZBMdEROBv0GzJiTbPitY',
  authDomain: 'tutor-plus-ucab.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'tutor-plus-ucab',
  storageBucket: 'tutor-plus-ucab.appspot.com',
  messagingSenderId: '265559781258',
  appId: '1:265559781258:web:559d5d7a4a6b559b58e273',
  measurementId: 'G-5S76EXB0ZN'
}

export const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
