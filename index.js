import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js"
import {
  getDatabase, ref, set,
  /* get,  onValue,  child,  push,  remove,  update, */
} from "//www.gstatic.com/firebasejs/9.9.0/firebase-database.js"
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app-check.js"

import * as SPLAT from "/gsplat.js"

const canvas = document.getElementById("splatCanvas")
const renderer = new SPLAT.WebGLRenderer(canvas)
renderer.backgroundColor = new SPLAT.Color32(0, 0, 0, 0);
const scene = new SPLAT.Scene()
const camera = new SPLAT.Camera()
const controls = new SPLAT.OrbitControls(camera, canvas, 0, 0, 0, false)
controls.zoomSpeed = 0.5
controls.orbitSpeed = 2

/* init splat viewer */
const handleResize = () => {
  renderer.setSize(document.body.clientWidth, document.body.clientHeight)
}
handleResize()
window.addEventListener("resize", handleResize)

const frame = () => {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(frame)
}
requestAnimationFrame(frame)

canvas.addEventListener('mousedown', () => controls.autoRotate = 0)
canvas.addEventListener('touchstart', () => controls.autoRotate = 0)

async function loadModel(filename) {
  await SPLAT.Loader.LoadAsync(`/splatData/${filename}.splat`, scene, (progress) => {
    // console.log(progress)
  })
}

function loadText([, right, left]) {
  const applyTextToElem = (elem, { font, sz, t }) => {
    elem.style.fontFamily = font || ''
    elem.textContent = t
    elem.style.fontSize = `${sz}rem`
    elem.style.lineHeight = `${sz + 0.5}rem`
    if (sz > 2) {
      elem.classList.add('headline')
    } else {
      elem.classList.remove('headline')
    }
  }
  const rightElem = document.querySelector('.msg.right')
  if (right) {
    applyTextToElem(rightElem, right)
  } else {
    rightElem.textContent = ''
  }

  const leftElem = document.querySelector('.msg.left')
  if (left) {
    applyTextToElem(leftElem, left)
  } else {
    leftElem.textContent = ''
  }
}

let itemIdx = 0
// 0 is filename, step always start from 1
let stepIdx = 1

const nextBtn = document.getElementById('nextBtn')
const prevBtn = document.getElementById('prevBtn')

function checkBtn() {
  if (stepIdx === window.data[itemIdx].length - 1 && !window.data[itemIdx + 1]) {
    nextBtn.style.display = 'none'
  } else {
    nextBtn.style.display = 'block'
  }
  if (stepIdx === 1 && !itemIdx) {
    prevBtn.style.display = 'none'
  } else {
    prevBtn.style.display = 'block'
  }
}

async function next() {
  nextBtn.blur()
  if (stepIdx === window.data[itemIdx].length - 1) {
    stepIdx = 1
    itemIdx += 1
    await loadModel(window.data[itemIdx][0])
  } else {
    stepIdx += 1
  }
  checkBtn()
  controls.setCameraParam(JSON.parse(window.data[itemIdx][stepIdx][0]))
  loadText(window.data[itemIdx][stepIdx])
}
nextBtn.addEventListener('click', next)

async function prev() {
  prevBtn.blur()
  if (stepIdx === 1) {
    stepIdx = 1
    itemIdx -= 1
    await loadModel(window.data[itemIdx][0])
  } else {
    stepIdx -= 1
  }
  checkBtn()
  controls.setCameraParam(JSON.parse(window.data[itemIdx][stepIdx][0]))
  loadText(window.data[itemIdx][stepIdx])
}
prevBtn.addEventListener('click', prev);

(async () => {
  loadText(window.data[0][1])
  await loadModel(window.data[0][0])
  controls.setCameraParam(JSON.parse(window.data[0][1][0]))
})()

if (window.location.pathname.startsWith('/debug')) {
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
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Ldhml8qAAAAALT_6VS1bXdqZn_CIMozlZShYSC4'),
    isTokenAutoRefreshEnabled: true
  })

  const database = getDatabase(app)

  setInterval(() => {
    set(ref(database, '/initCtrl'), JSON.stringify(controls.getCameraParam()))
  }, [1000])
} else if (sessionStorage.debug) {
  setInterval(() => {
    console.log(JSON.stringify(controls.getCameraParam()))
  }, [1000])
}
