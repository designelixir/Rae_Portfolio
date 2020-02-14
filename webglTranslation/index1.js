var canvas = document.getElementById("viewport");
 
/* Rresize the canvas to occupy the full page, 
   by getting the widow width and height and setting it to canvas*/
 
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;


let renderer;
let camera;
//let controls;

let scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50);

renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("viewport")
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x3030875, 0));
// document.body.appendChild(renderer.domElement);

camera.position.x = 0;
camera.position.y = 1; //change to 0 when finished 
camera.position.z = 18;


//controls = new THREE.OrbitControls(camera);

// white spotlight shining from the side, casting a shadow


let light = new THREE.AmbientLight(0xFFFFFF);
scene.add(light);

let gridHelper = new THREE.GridHelper(50, 50);
scene.add(gridHelper);

// canvas OBJECTS 
var loader = new THREE.TextureLoader();


var cubeMaterials = [
    new THREE.MeshLambertMaterial({ color: 0x2E345B}),
    
    new THREE.MeshLambertMaterial({ color: 0x2E345B}),
    new THREE.MeshLambertMaterial({    map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v9/pngSRC/flooring.png')}),

    new THREE.MeshLambertMaterial({    map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v9/pngSRC/flooring.png')}),

    new THREE.MeshBasicMaterial({color: 0x2E345B}),

    
  ];
  cubeMaterials = new THREE.MeshFaceMaterial( cubeMaterials );

  var cubeGeometry = new THREE.BoxGeometry(50,0,50);
  var floor = new THREE.Mesh(cubeGeometry,cubeMaterials);
  var ceiling = new THREE.Mesh(cubeGeometry,cubeMaterials);


//loaders
var doorway = new THREE.MeshLambertMaterial({
  map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v9/pngSRC/doorway.png')
});

doorway.transparent=true;



 
// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var doorGeometry = new THREE.PlaneGeometry(40, 18);


// combine our image geometry and material into a mesh
var doorwayMesh = new THREE.Mesh(doorGeometry, doorway);




// set the position of the image mesh in the x,y,z dimensions
doorwayMesh.position.set(0,0,-12);
floor.position.set (-1,-10,2);
ceiling.position.set(-1,10,2)

// add the image to the scene
scene.add(doorwayMesh, floor, ceiling); 



let animate = function() {
    requestAnimationFrame(animate);

    //controls.update();
    renderer.render(scene, camera);
};


//scroll BAR
window.onscroll = function() {scrollProgress()};

function scrollProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  var truncScroll = Math.trunc(scrolled);
  document.getElementById("myBar").style.width = scrolled + "%";
//   document.getElementById("updatedProgress").innerHTML = truncScroll +"%";

}



//update ON SCROLL 
var updatedProgress = window.innerWidth/100;
var updatedProgressHeight = window.innerHeight/100;

const stars = document.querySelector('.starsDiv');
uos(0, .1, p => (stars.style.opacity = ((updatedProgress-(p*90)) / (updatedProgress) )));

//////////////////
animate();



function updateCamera(ev) {
    let div1 = document.getElementById("div1");
	camera.position.z = 18 - window.scrollY / 250.0;
}

window.addEventListener("scroll", updateCamera);