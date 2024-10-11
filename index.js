import * as SPLAT from "./gsplat.js"

const canvas = document.getElementById("splatCanvas")
const progressDialog = document.getElementById("progress-dialog")
const progressIndicator = document.getElementById("progress-indicator")

const renderer = new SPLAT.WebGLRenderer(canvas)
const scene = new SPLAT.Scene()
const camera = new SPLAT.Camera()
const controls = new SPLAT.OrbitControls(camera, canvas)

async function loadModel(url) {
  await SPLAT.Loader.LoadAsync(url, scene, (progress) => (console.log(progress)))
  // progressDialog.close()

  const handleResize = () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  }

  const frame = () => {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(frame)
  }

  handleResize()
  window.addEventListener("resize", handleResize)

  requestAnimationFrame(frame)
}

function checkIfHorizontal() {
  const dvh100 = window.innerHeight
  const vw100 = window.innerWidth
  if (dvh100 < vw100) {
    document.body.classList.add('horizontal')
  } else {
    document.body.classList.remove('horizontal')
  }
}

(async () => {
  const res = await fetch(`splatData.json?dummy=${Math.floor(new Date().getTime())}`)
  const data = await res.json()

  // data.forEach(([fileName, title, desc]) => {
  //   const template = document.getElementById('slide-template')
  //   const clone = template.content.cloneNode(true)
  //   clone.querySelector('img').src = `splatData/${fileName}.png`
  //   document.querySelector('.swiper-wrapper').append(clone)
  // })

  loadModel('splatData/GGun01.splat')

  window.addEventListener('resize', checkIfHorizontal)
  checkIfHorizontal()
})()
