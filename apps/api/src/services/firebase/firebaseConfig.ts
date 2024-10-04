import firebase from 'firebase/compat/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import config from 'config';

const {
  FIREABSE_AUTH_DOMAIN,
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_MEASURMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_STORAGE_BUCKET,
} = config;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREABSE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASURMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

export { getDownloadURL, ref, storage, uploadBytes };
