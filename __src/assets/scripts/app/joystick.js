const THREE = require('three');
const OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

const joystick = function() {

  const container = document.querySelector('.joystick');

  let HEIGHT = container.offsetHeight;
  let WIDTH = container.offsetWidth;

  let camera, scene, renderer, material;
  let mouseX = 0, mouseY = 0;

  let windowHalfX = window.innerWidth/2;
  let windowHalfY = window.innerHeight/2;

  init();
  animate();

  function init() {

    material = new THREE.MeshPhongMaterial({ color: 0xffdc00 });

    camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, 1, 3000 );
    camera.position.z = -1500;
    camera.position.y = 90;

    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add( ambientLight );

    const directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 0.5 , 0.5, 1 );
    scene.add( directionalLight );

    const loader = new THREE.OBJLoader();
    loader.load('/assets/objects/joystick.obj', function( object ) {
      object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material = material;
				}
			});
			scene.add( object );
    });


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
    camera.position.x += ( mouseX - camera.position.x ) * 1;
		camera.position.y += ( - mouseY - camera.position.y ) * 1;
		camera.lookAt( scene.position );

		renderer.render( scene, camera );
  }

}

module.exports = joystick;
