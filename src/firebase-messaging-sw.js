importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCKtjR0Mpjt4h7AfLoqLFGKJ7F10n58kPU",
  authDomain: "cashless-system.firebaseapp.com",
  databaseURL: "https://cashless-system.firebaseio.com",
  projectId: "cashless-system",
  storageBucket: "cashless-system.appspot.com",
  messagingSenderId: "416401448327",
  appId: "1:416401448327:web:399d366dcdffb9f318c722",
  measurementId: "G-33PLCBTMQT",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
