var canvas = document.getElementById("viewport");
 
/* Rresize the canvas to occupy the full page, 
   by getting the widow width and height and setting it to canvas*/
 
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50);

let renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("viewport")
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x2e345B);
// document.body.appendChild(renderer.domElement);

camera.position.x = 0;
camera.position.y = 1; //change to 0 when finished 
camera.position.z = 18;

let light = new THREE.AmbientLight(0xFFFFFF); // white spotlight shining from the side, casting a shadow
scene.add(light);

//remove grid when finished 
// let gridHelper = new THREE.GridHelper(50, 50);
// scene.add(gridHelper);

var loader = new THREE.TextureLoader();

// canvas OBJECTS 
var cubeMaterials = [
    new THREE.MeshLambertMaterial({ color: 0x2E345B,wireframe: true, wireframe_linewidth: 10}),
    new THREE.MeshLambertMaterial({ color: 0x2E345B,wireframe: true, wireframe_linewidth: 10}),
    new THREE.MeshLambertMaterial({ map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v9/pngSRC/flooring.png')}),
    new THREE.MeshLambertMaterial({ map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v9/pngSRC/flooring.png')}),
    new THREE.MeshBasicMaterial({color: 0x2E345B,wireframe: true, wireframe_linewidth: 10})

  ];


  
cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterials);

var cubeGeometry = new THREE.BoxGeometry(80,0,70);
var floor = new THREE.Mesh(cubeGeometry,cubeMaterials);
var ceiling = new THREE.Mesh(cubeGeometry,cubeMaterials);

var wallGeometry = new THREE.PlaneGeometry(80,80);


var wall2Geometry = new THREE.PlaneGeometry(18,180);
var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x47578a, side: THREE.DoubleSide});
var wall2Material = new THREE.MeshBasicMaterial( {color: 0x2E3456, side: THREE.DoubleSide} );

var wall = new THREE.Mesh( wallGeometry, wallMaterial );
var wall2 = new THREE.Mesh( wallGeometry, wall2Material );
var wall3 = new THREE.Mesh( wallGeometry, wall2Material );


//loaders
var doorway = new THREE.MeshLambertMaterial({
  map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v11/pngSRC/doorway2.png')
});

doorway.transparent=true;

var deskchair = new THREE.MeshLambertMaterial({
  map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v11/pngSRC/desk_1@600x.png')
}); 
deskchair.transparent=true;

var chair = new THREE.MeshLambertMaterial({
  map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v11/pngSRC/chair.png')

}); 
chair.transparent=true;

var posters = new THREE.MeshLambertMaterial({
  map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/v11/pngSRC/posters2.png')
});
 
posters.transparent=true;
// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var doorGeometry = new THREE.PlaneGeometry(60, 24);
var deskGeometry = new THREE.PlaneGeometry(20, 18.75);
var chairGeometry = new THREE.PlaneGeometry(10, 14.8);
var posterGeometry = new THREE.PlaneGeometry(24,22);


// combine our image geometry and material into a mesh
var doorwayMesh = new THREE.Mesh(doorGeometry, doorway);
var deskMesh = new THREE.Mesh(deskGeometry, deskchair);
var chairMesh = new THREE.Mesh(chairGeometry, chair);
var posterMesh = new THREE.Mesh(posterGeometry,posters);


// set the position of the image mesh in the x,y,z dimensions
doorwayMesh.position.set(-1,0,-14);
deskMesh.position.set(0,-5,-30);
chairMesh.position.set(0,-8.5,-28);
posterMesh.position.set(0,0,-32);


floor.position.set (-1,-16,-30);
ceiling.position.set(-1,16,-30)
wall.position.set(-1,0,-40);



wall2.rotateY(180);
wall2.position.set(-25,0,-40);

wall3.rotateY(-180);
wall3.position.set(25,0,-40);

// add the image to the scene
scene.add(doorwayMesh, floor, ceiling, wall, deskMesh, chairMesh, posterMesh); 



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

}



//update ON SCROLL 
var updatedProgress = window.innerWidth/100;
var updatedProgressHeight = window.innerHeight/100;

const header = document.querySelector('.header');
const spinny = document.querySelector('.spinny');
const on = document.querySelector('.on');
const dock = document.querySelector('.dock');
const login = document.querySelector('.login');

uos(0.03, .15, p => (header.style.opacity = ((updatedProgress-(p*20)) / (updatedProgress) )));


uos(0.2, 0.25, p => (spinny.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.25, 0.39, p => (spinny.style.width = (100-(p*100)) +"%"));
uos(0.25, 0.35, p => (login.style.opacity =  ((p*50/updatedProgress)) ));

uos(0.35, 0.38, p => (login.style.width = (100-(p*1000)) +"%")); //FIX !!!!!!!!!!!!!!


uos(0.35, 0.5, p => (on.style.opacity =  ((p*100/updatedProgress)) ));
uos(0.38, 0.4, p => (dock.style.opacity =  ((p*20/updatedProgress)) ));




//////////////////
animate();



function updateCamera(ev) {
    let div1 = document.getElementById("div1");
	camera.position.z = 18 - window.scrollY / 250.0;
}

window.addEventListener("scroll", updateCamera);