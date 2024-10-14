import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHeWEBHJU4QcPvCd8I_53IAyLpRyNkv9Y",
  authDomain: "my-react-blog-e8bb2.firebaseapp.com",
  projectId: "my-react-blog-e8bb2",
  storageBucket: "my-react-blog-e8bb2.appspot.com",
  messagingSenderId: "322657951209",
  appId: "1:322657951209:web:65f473a0e6118f7485ff78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//index.js code
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
