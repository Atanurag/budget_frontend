// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDub1g_oWvIiAMpgFwUFWKckl0KfIJJ4ME',
  authDomain: 'workstation-79b50.firebaseapp.com',
  projectId: 'workstation-79b50',
  storageBucket: 'workstation-79b50.firebasestorage.app',
  messagingSenderId: '201443933949',
  appId: '1:201443933949:web:f4e2f254b5f22522bdc894',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
export const database = getFirestore(app);
