const THREE = require('three');

const cubes = function() {

  const scene = new THREE.Scene();
  const TARGET = passions;

  // Set the scene size
  let WIDTH = TARGET.offsetWidth;
  let HEIGHT = TARGET.offsetHeight;
  let ASPECT = WIDTH / HEIGHT;

  // Create a WebGL renderer, camera and scene
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  const camera = new THREE.PerspectiveCamera( 45, ASPECT, 0.1, 10000 );

  // Start the renderer
  renderer.setSize( WIDTH, HEIGHT );

  // Attach the renderer-supplied DOM element
  TARGET.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshLambertMaterial( { color: 0xffdc00 } );
  const cube = new THREE.Mesh( geometry, material );
  const pointLight = new THREE.PointLight(0xFFFFFF);

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  scene.add( pointLight, cube );

  camera.position.z = 5;

  function render() {
    requestAnimationFrame( render );

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
  };

  render();

  window.addEventListener('resize', onWindowResize, false);

  function onWindowResize() {
    // Set the scene size
    WIDTH = TARGET.offsetWidth;
    HEIGHT = TARGET.offsetHeight;
    ASPECT = WIDTH / HEIGHT;

    camera.aspect = ASPECT;
    camera.updateProjectionMatrix();

    renderer.setSize( WIDTH, HEIGHT );
  }

}

module.exports = cubes();
