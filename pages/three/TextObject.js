import * as THREE from 'three'
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

const TextObject = scene => {
  // create text texture from threejs
  //https://github.com/webpack/webpack/issues/6586
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );
  var cube = new THREE.Mesh( geometry, material );
  
  // Add cube to Scene
  //scene.add( cube );
  var loader = new THREE.FontLoader();

  loader.load('https://threejs.org/examples/fonts/droid/droid_serif_bold.typeface.json', function ( font ) { 
    setText("NEON ", new THREE.Vector3(0, 0, 10), font);
    // // create cubes
    // var geometry = new BoxGeometry( 1, 1, 1 );
    // var material = new MeshBasicMaterial( { color: "#fff" } );
    // var cube = new Mesh( geometry, material );

    // // Add cube to Scene
    // scene.add( cube );

  });


  function setText(text, position, font) {
    var textGeo = new THREE.TextGeometry(text, {
        font: font,
        size: 3,
        height: 0.25,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01,
        bevelSegments: 1
      });
      textGeo.computeBoundingBox();
      textGeo.computeVertexNormals();
      textGeo.center();
    
      // var textMesh = new THREE.Mesh(textGeo, new THREE.MeshStandardMaterial({
      //   color: Math.random() * 0xFFFFFF
      // }));
      // textMesh.position.copy(position); 
      
      // scene.add(textMesh);

      var material = new MeshBasicMaterial( { color: "#fff" } );
      var textMesh = new Mesh( textGeo, material );
  
      // Add cube to Scene
      scene.add( textMesh );
    }

    function update(time) {
      
    }

    return {
        update
    }
}

  export default TextObject
