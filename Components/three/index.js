import SceneManager from './SceneManager';
import React, { Component } from 'react';

function createCanvas(containerElement) {
  const canvas = document.createElement('canvas');
  containerElement.appendChild(canvas);
  return canvas;
}

function bindEventListeners(props) {
  window.onresize = resizeCanvas.bind(null, props);
}

function resizeCanvas(props) {
  const { sceneManager } = props
console.log('sceneManager', sceneManager)
  sceneManager.onWindowResize();
}


export const Main = containerElement => {
  initGui().then((gui) => {
    const canvas = createCanvas(containerElement);
    const sceneManager = new SceneManager(canvas, gui);

    function render() {
      requestAnimationFrame(render);
      sceneManager.update();
    }
    bindEventListeners({canvas, sceneManager});
    render();

  })
}
const initGui = async () => {
  const dat = await import('dat.gui')
  return new dat.GUI()
}
export default class App extends Component {
  componentDidMount() {
    Main(this.threeRootElement);
  }
  render () {
      return (
        <div ref={element => this.threeRootElement = element} />
      );
  }
}