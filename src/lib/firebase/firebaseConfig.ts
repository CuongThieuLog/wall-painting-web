import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3TmVBi6Vdg3n9jj0hwT62e0v5pd-r6TU",
  authDomain: "wall-painting-745a0.firebaseapp.com",
  projectId: "wall-painting-745a0",
  storageBucket: "wall-painting-745a0.appspot.com",
  messagingSenderId: "562195902865",
  appId: "1:562195902865:web:ebacfb5e91564a89bbaa30",
  measurementId: "G-31N9ZRXTV4",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage();
