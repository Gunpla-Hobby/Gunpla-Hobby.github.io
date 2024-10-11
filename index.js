import * as SPLAT from "./gsplat.js"

const canvas = document.getElementById("splatCanvas")
const renderer = new SPLAT.WebGLRenderer(canvas)
renderer.backgroundColor = new SPLAT.Color32(0, 0, 0, 0);
const scene = new SPLAT.Scene()
const camera = new SPLAT.Camera()
const controls = new SPLAT.OrbitControls(camera, canvas, 0, 0, 0, false)
controls.zoomSpeed = 0.5
controls.orbitSpeed = 2

function initSplat() {
  const handleResize = () => {
    renderer.setSize(document.body.clientWidth, document.body.clientHeight)
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

async function loadModel({ filename, initCtrl }) {
  await SPLAT.Loader.LoadAsync(
    `splatData/${filename}.splat`,
    scene,
    (progress) => {
      // console.log(progress)
    },
  )
  if (initCtrl) {
    controls.setCameraParam(initCtrl)
    controls.autoRotate = true
  }
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
  const res = await fetch(`splatData/0000.json?dummy=${Math.floor(new Date().getTime())}`)
  const data = await res.json()

  initSplat()

  // data.forEach(([fileName, title, desc]) => {
  //   const template = document.getElementById('slide-template')
  //   const clone = template.content.cloneNode(true)
  //   clone.querySelector('img').src = `splatData/${fileName}.png`
  //   document.querySelector('.swiper-wrapper').append(clone)
  // })

  await loadModel(data[0])

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
})()
