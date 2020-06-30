var container, mesh;

container = document.getElementById( 'threejs2' );
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 1000);

scene.add(camera)

// Make use of the `TextureLoader` object to handle asynchronus loading and
// assignment of the texture to your material    
var material = new THREE.MeshBasicMaterial();
var loader = new THREE.TextureLoader();
loader.load( 'https://images.pexels.com/photos/358482/pexels-photo-358482.jpeg?auto=compress&cs=tinysrgb', 
function ( texture ) {    

    // The texture has loaded, so assign it to your material object. In the 
    // next render cycle, this material update will be shown on the plane 
    // geometry
    material.map = texture;
    material.needsUpdate = true;
});

var geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 32 );

var mesh = new THREE.Mesh( geometry, material );

scene.add( mesh );

var renderer = new THREE.WebGLRenderer({
  canvas: container,
  antialias: true
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

// [UPDATE]
function renderFrame() {
  renderer.render( scene, camera );
  window.requestAnimationFrame(renderFrame);
}
renderFrame();