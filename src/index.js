import _ from 'lodash'
import { say } from './say.ts'

import './index.css'
import './main.less'
import './main.scss'
import './main.styl'

function component() {
  const element = document.createElement('div')
  element.className = 'main-page'

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  return element
}

window.onload = () => {
  document.body.appendChild(component())

  say('Hello Nihao!!!')
}
