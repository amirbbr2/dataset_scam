if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
firebase.initializeApp({
  "apiKey": "AIzaSyBCZ62UYXSEl3sEAd7r6EQmF2IhPUagZ9w",
  "authDomain": "srv-auth.firebaseapp.com",
  "databaseURL": "https://srv-auth.firebaseio.com",
  "messagingSenderId": "673768208034",
  "projectId": "srv-auth",
  "storageBucket": "srv-auth.appspot.com"
});