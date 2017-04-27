const THREE = require('three');

const cubes = function(container) {
  let HEIGHT = container.offsetHeight;
  let WIDTH = container.offsetWidth;

  let camera, scene, renderer, group, cube;
  let mouseX = 0, mouseY = 0;

  let windowHalfX = window.innerWidth/2;
  let windowHalfY = window.innerHeight/2;

  init();
  animate();

  function init() {

    camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 1, 3000 );
    camera.position.z = -1000;

    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add( ambientLight );

    const directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 0.5 , 0.5, 1 );
    scene.add( directionalLight );

    group = new THREE.Group();
    scene.add( group );

    const geometry = new THREE.SphereGeometry( 3, 20, 20 );
    const material = new THREE.MeshLambertMaterial( {
      color: 0xffdc00,
      opacity: 0.5
    } );


    for (let i=0; i < 2000; i++) {
      cube = new THREE.Mesh( geometry, material );
      cube.position.x = Math.random() * 2000 - 1000;
			cube.position.y = Math.random() * 2000 - 1000;
			cube.position.z = Math.random() * 2000 - 1000;
			cube.scale.x = Math.random() * 2;
      cube.scale.y = cube.scale.x;
			group.add( cube );
    }

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( WIDTH, HEIGHT );
    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
  }

  function onWindowResize() {
    WIDTH = container.offsetWidth;
    HEIGHT = container.offsetHeight;

		windowHalfX = WIDTH / 2;
		windowHalfY = HEIGHT / 2;
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
		renderer.setSize( WIDTH, HEIGHT );
	}

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function animate() {
    requestAnimationFrame( animate );
    render();
  }

  function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .005;
		camera.position.y += ( - mouseY - camera.position.y ) * .005;
		camera.lookAt( scene.position );

    group.rotation.x += 0.0001;
		group.rotation.y += 0.0002;

		renderer.render( scene, camera );
  }

}

module.exports = cubes;