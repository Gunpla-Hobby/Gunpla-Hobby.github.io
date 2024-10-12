import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js"
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  child,
  push,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js"

if (window.location.pathname.startsWith('/debug')) {
  const apiKey = /debug\/(.+)/g.exec(window.location.pathname)[1]
  console.log(apiKey)
  const app = initializeApp({
    apiKey,
    authDomain: "gunpla-hobby.firebaseapp.com",
    databaseURL: "https://gunpla-hobby-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gunpla-hobby",
    storageBucket: "gunpla-hobby.appspot.com",
    messagingSenderId: "165696452489",
    appId: "1:165696452489:web:6fe3240a62637d1b9c9358"
  })
}
