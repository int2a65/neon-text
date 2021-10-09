import * as THREE from 'three';
import SceneSubject from './SceneSubject';
import GeneralLights from './GeneralLights';
import TextObject from './TextObject';
import { EffectComposer, RenderPass, ShaderPass } from "postprocessing";
import { UnrealBloomPass, FXAAShader } from  "threejs-post-processing"
import { Vector2, Color, Scene, WebGLRenderer, PerspectiveCamera, Clock } from 'three';
import { OrbitControls } from 'threejs-controls-es6';


function buildScene() {
  const scene = new Scene();
  scene.background = new Color( 0x000000 );

  return scene;
}

function buildRender({ width, height, canvas }) {
  const renderer = new WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 

  renderer.setClearColor("#000000");
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaInput = true;
  renderer.gammaOutput = true; 

  return renderer;
}

function buildCamera({ width, height }) {
  const fov = 75;
    const aspect = window.innerWidth/window.innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 4;

  return camera;
}

export default function SceneManager(canvas, gui) {
  function update() {
    const elapsedTime = clock.getElapsedTime();

     renderer.render(scene, camera);
     composer.render(clock.getDelta());
     controls.update();
  }

  function onWindowResize() {
    const { width, height } = canvas;
    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  const clock = new Clock();

  const screenDimensions = {
      width: canvas.width,
      height: canvas.height
  }

  const scene = buildScene();
  const renderer = buildRender({...screenDimensions, canvas});
  const camera = buildCamera(screenDimensions);

  const parameters = {
    inputText: 'Neon',
    color: '#8eeded'
  }

  const textGui = gui.add(parameters, 'inputText')
  // GUI controls color
  const colorGui = gui
    .addColor(parameters, "color")
  
  colorGui
    .onChange(function() {
      //Do something with the new value
      controls.enabled = false;
      scene.clear()
      //remove old scene
      createSceneSubjects(scene, parameters)
    });
    colorGui.onFinishChange(function(value) {
      controls.enabled = true;
    })

  textGui.onChange(function () {
    //Do something with the new value
    controls.enabled = false;
    scene.clear()
    //remove old scene
    createSceneSubjects(scene, parameters)
  });
  textGui.onFinishChange(function() {
    controls.enabled = true;
  })

  const sceneSubjects = createSceneSubjects(scene, parameters);
  // // post-processing
  var composer = new EffectComposer(renderer);

  composer.addPass(new RenderPass(scene, camera));

  var params = {
    exposure: 1,
    bloomStrength: 1.5,
    bloomThreshold: 0,
    bloomRadius: 0
  };
  var bloomPass = new UnrealBloomPass( new Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.renderToScreen = true;
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

  var effectFXAA = new ShaderPass(FXAAShader);

  composer.addPass(effectFXAA);
  composer.addPass(bloomPass);

  // controls - somehow it causes dat.gui onChange return same value
  // upgrade OrbitControls not fixing the issue
  // The solution is disable OrbitControls when editing dat.gui text input.
  // enable OrbitControls when input is done
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;

  controls.maxPolarAngle = Math.PI / 2;

  function createSceneSubjects(scene, parameters) {
      const sceneSubjects = [
          new GeneralLights(scene),
          new TextObject(scene, parameters)
      ];

      return sceneSubjects;
  }

  return {
      update,
      onWindowResize
  }
}