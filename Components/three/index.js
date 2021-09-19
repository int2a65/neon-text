import SceneManager from './SceneManager';
import React, { Component } from 'react';


function createCanvas(containerElement) {
  const canvas = document.createElement('canvas');
  containerElement.appendChild(canvas);
  return canvas;
}

function bindEventListeners(props) {
  window.onresize = resizeCanvas;
  resizeCanvas(props);
}

function resizeCanvas(props) {
  const { sceneManager } = props

  sceneManager.onWindowResize();
}


export const Main = containerElement => {

  function render() {
    requestAnimationFrame(render);
    sceneManager.update();
  }

  const canvas = createCanvas(containerElement);
  const sceneManager = new SceneManager(canvas);
 
  bindEventListeners({canvas, sceneManager});
  render();

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