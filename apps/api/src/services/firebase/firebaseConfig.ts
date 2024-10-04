import firebase from 'firebase/compat/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCChYKMCeEBMJKhaHuTBawj-7mViGlaTFY',
  authDomain: 'test-vacancy-task.firebaseapp.com',
  projectId: 'test-vacancy-task',
  storageBucket: 'test-vacancy-task.appspot.com',
  messagingSenderId: '579409871880',
  appId: '1:579409871880:web:5b5b6f960f86b5acabfdbd',
  measurementId: 'G-5ESG6Q5QK0',
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

export { getDownloadURL, ref, storage, uploadBytes };
