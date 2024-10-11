function checkIfHorizontal() {
  const dvh100 = window.innerHeight;
  const vw100 = window.innerWidth;
  if (dvh100 < vw100) {
    console.log('horizontal');
    document.body.classList.add('horizontal');
  } else {
    document.body.classList.remove('horizontal');
  }
}

(async () => {
  const res = await fetch(`3dData.json?dummy=${Math.floor(new Date().getTime())}`)
  const data = await res.json()

  // data.forEach(([fileName, title, desc]) => {
  //   const template = document.getElementById('slide-template')
  //   const clone = template.content.cloneNode(true)
  //   clone.querySelector('img').src = `3dData/${fileName}.png`
  //   document.querySelector('.swiper-wrapper').append(clone)
  // })

  window.addEventListener('resize', checkIfHorizontal)
  checkIfHorizontal()
})()
