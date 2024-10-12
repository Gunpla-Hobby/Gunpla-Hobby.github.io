import * as SPLAT from "./gsplat.js"

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
    `splatData/${filename}.splat`,
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


window.addEventListener('resize', checkIfHorizontal)
checkIfHorizontal()

if (sessionStorage.debug) {
  document.getElementById('particleCanvas').style.display = 'none'
  canvas.addEventListener('touchend', () => {
    try {
      setTimeout(() => {
        prompt('initCtrl', JSON.stringify(controls.getCameraParam()))
      }, [3000])
    } catch (e) {
      alert(e)
    }
  })
}
