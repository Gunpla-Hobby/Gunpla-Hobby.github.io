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
} from "//www.gstatic.com/firebasejs/9.9.0/firebase-database.js"
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app-check.js"


//if (window.location.pathname.startsWith('/debug')) {

document.getElementById('particleCanvas').style.display = 'none'

const app = initializeApp({
  apiKey: "AIzaSyAPwxFKKRVV8WNtNEGxdYtStHwe6A4cBdA",
  authDomain: "gunpla-hobby.firebaseapp.com",
  databaseURL: "https://gunpla-hobby-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gunpla-hobby",
  storageBucket: "gunpla-hobby.appspot.com",
  messagingSenderId: "165696452489",
  appId: "1:165696452489:web:6fe3240a62637d1b9c9358"
})

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Ldhml8qAAAAALT_6VS1bXdqZn_CIMozlZShYSC4'),
  isTokenAutoRefreshEnabled: true
})

const database = getDatabase(app)

console.log(database)

setTimeout(() => {
  database.ref('initCtrl').set(JSON.stringify(controls.getCameraParam()))
}, [1000])

//}
