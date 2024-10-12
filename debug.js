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
  console.log(window.location.pathname)

  document.getElementById('particleCanvas').style.display = 'none'

  const firebaseConfig = {
    apiKey: "AIzaSyAPwxFKKRVV8WNtNEGxdYtStHwe6A4cBdA",
    authDomain: "gunpla-hobby.firebaseapp.com",
    databaseURL: "https://gunpla-hobby-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gunpla-hobby",
    storageBucket: "gunpla-hobby.appspot.com",
    messagingSenderId: "165696452489",
    appId: "1:165696452489:web:6fe3240a62637d1b9c9358"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  const appCheck = firebase.appCheck();
  appCheck.activate('6Ldhml8qAAAAALT_6VS1bXdqZn_CIMozlZShYSC4', true);

  setTimeout(() => {
    firebase.database().ref('initCtrl').set(JSON.stringify(controls.getCameraParam()))
  }, [1000])
}
