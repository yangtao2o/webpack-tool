import _ from 'lodash'

import SaySomething from './components/SaySomething.ts'

import './assets/css/index.css'
import './assets/css/main.less'
import './assets/css/main.scss'
import './assets/css/main.styl'

import coverImg from './assets/img/cover.jpg'
import minImg from './assets/img/icon_new.png'
import svgImg from './assets/img/icon_ding.svg'

function component() {
  const element = document.createElement('div')
  element.className = 'main-page'

  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  return element
}

function createImg(src) {
  const element = document.createElement('img')
  element.src = src || coverImg
  element.style.width = '100px'
  element.style.height = 'auto'

  return element
}

window.onload = () => {
  document.body.appendChild(component())

  document.body.appendChild(createImg(coverImg))
  document.body.appendChild(createImg(minImg))
  document.body.appendChild(createImg(svgImg))

  SaySomething('Hello Nihao!!!')
}
