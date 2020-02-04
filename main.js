import './src/index.css';
import cover from './src/cover.jpg';


class MyApp {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

const body = document.getElementsByTagName('body')[0];
const parent = document.createElement('div');
parent.setAttribute('id', 'app');
body.appendChild(parent);

const app = document.getElementById('app');
const img = document.createElement('img');
img.setAttribute('src', cover);
app.appendChild(img);
