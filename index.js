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

function checkIfHorizontal() {
  const dvh100 = window.innerHeight
  const vw100 = window.innerWidth
  if (dvh100 < vw100) {
    document.body.classList.add('horizontal')
  } else {
    document.body.classList.remove('horizontal')
  }
}
window.addEventListener('resize', checkIfHorizontal)
checkIfHorizontal()

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

async function loadModel({ filename, initCtrl }) {
  await SPLAT.Loader.LoadAsync(
    `/splatData/${filename}.splat`,
    scene,
    (progress) => {
      // console.log(progress)
    },
  )
  if (initCtrl) {
    controls.setCameraParam(JSON.parse(initCtrl))
    // controls.autoRotate = 0.0025
  }
}

function loadDataItem(item) {
  const title = document.querySelector('.text .title')
  title.textContent = item.title
  title.style.fontFamily = `${item.titleFont}, "UoqMunThenKhung"`
  document.querySelector('.text .description').textContent = item.description
  loadModel(item)
}

loadDataItem(window.data[0])

// data.forEach(([fileName, title, desc]) => {
//   const template = document.getElementById('slide-template')
//   const clone = template.content.cloneNode(true)
//   clone.querySelector('img').src = `splatData/${fileName}.png`
//   document.querySelector('.swiper-wrapper').append(clone)
// })


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

  setTimeout(() => {
    set(ref(database, '/initCtrl'), JSON.stringify(controls.getCameraParam()))
  }, [1000])
}
