var canvas = document.getElementById("viewport");
 
/* Rresize the canvas to occupy the full page, 
   by getting the widow width and height and setting it to canvas*/
 
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50); //first number should be 60 

let renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("viewport")
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x47578a); //back wall
// document.body.appendChild(renderer.domElement);

camera.position.x = 0;
camera.position.y = 1; //change to 0 when finished 
camera.position.z = 18;

let light = new THREE.AmbientLight(0xFFFFFF); // white spotlight shining from the side, casting a shadow
scene.add(light);

//remove grid when finished 
let gridHelper = new THREE.GridHelper(50, 50);
scene.add(gridHelper);

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

var skillGeometry = new THREE.PlaneGeometry(6,3);



var wall2Geometry = new THREE.PlaneGeometry(18,180);
var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x47578a, side: THREE.DoubleSide});
var wall2Material = new THREE.MeshBasicMaterial( {color: 0x2E3456, side: THREE.DoubleSide} );

var skillMaterial = new THREE.MeshBasicMaterial ( {color: 0xFF0000, side: THREE.DoubleSide});

var wall = new THREE.Mesh( wallGeometry, wallMaterial );
var wall2 = new THREE.Mesh( wallGeometry, wall2Material );
var wall3 = new THREE.Mesh( wallGeometry, wall2Material );

var skill = new THREE.Mesh( skillGeometry, skillMaterial);

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

wall.position.set(0,1,-40);

skill.position.set(0,1,-50);



wall2.rotateY(180);
wall2.position.set(-25,0,-40);

wall3.rotateY(-180);
wall3.position.set(25,0,-40);

// add the image to the scene
scene.add(doorwayMesh, floor, ceiling, wall, deskMesh, chairMesh, posterMesh); //took out skill



let animate = function() {
    requestAnimationFrame(animate);

    //controls.update();
    renderer.render(scene, camera);
};


//scroll BAR
// window.onscroll = function() {scrollProgress()};

// function scrollProgress() {
//   var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//   var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//   var scrolled = (winScroll / height) * 100;
//   var truncScroll = Math.trunc(scrolled);
//   document.getElementById("myBar").style.width = scrolled + "%";
//     // document.getElementById("updatedProgress").innerHTML = truncScroll +"%"; scroll shows infinite? 

// }



//update ON SCROLL 
var updatedProgress = window.innerWidth/100;
var updatedProgressHeight = window.innerHeight/100;

const header = document.querySelector('.headerOverview');
const spinny = document.querySelector('.spinny');
// const wallpaper = document.querySelector('.wallpaper');
const dock = document.querySelector('.dock');
const login = document.querySelector('.login');
const profile = document.querySelector('.profile');
const delay_attribute = document.querySelector('.delay_attribute')
const profile_description = document.querySelector('.profile_description');
const profile_description_wrapper = document.querySelector('.profile_description_wrapper');
const desktop = document.querySelector('.desktop');
const toolbar = document.querySelector('.toolbar');

uos(0.03, .15, p => (header.style.opacity = ((updatedProgress-(p*20)) / (updatedProgress) )));

uos(0.15, 0.25, p => (header.style.left = (p*100)+"%"));

uos(0.2, 0.25, p => (spinny.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.25, 0.39, p => (spinny.style.width = (100-(p*100)) +"%"));
uos(0.34, 0.38, p => (login.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.34, 0.38, p => (toolbar.style.opacity =  ((p*50/updatedProgress)) ));

uos(0.29, 0.33, p => (profile.style.width= ((p*16))+"%"));

uos(0.43, 0.53, p => (login.style.left = (p*200)+"%"));




uos(0.4, 0.44, p => (delay_attribute.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.30, 0.34, p => (profile_description.style.opacity =  ((p*50/updatedProgress)) ));

uos(0.38, .4, p => (profile_description_wrapper.style.opacity = ((updatedProgress-(p*20)) / (updatedProgress) )));
uos(0.38, .4, p => (profile.style.opacity = ((updatedProgress-(p*20)) / (updatedProgress) )));


uos(0.3, 0.46, p => (spinny.style.width = (100-(p*100)) +"%"));

uos(0.4, 0.44, p => (desktop.style.opacity =  ((p*50/updatedProgress)) ));



function openSocials() {
  var x = document.getElementById("social_banners");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function openShortcuts() {
  var x = document.getElementById("shortcut_banners");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


function openSynopsis() {
  var x = document.getElementById("projectSynopsis");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function openEmail() {
  var x = document.getElementById("email");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
    
  }
}

function openTesties() {
  var x = document.getElementById("testies");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function openStats() {
  var x = document.getElementById("stats");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}




dragElement(document.getElementById("windowToolbar"));
dragElement(document.getElementById("windowToolbar2"));
dragElement(document.getElementById("windowToolbar3"));
dragElement(document.getElementById("windowToolbar4"));
dragElement(document.getElementById("windowToolbar5"));
dragElement(document.getElementById("windowToolbar6"));






function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//calculate time 
const current = new Date();
const day = current.getDate();

const monthArray = [ 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
const monthGet = current.getMonth();
const monthName = monthArray[monthGet];

const hours = current.getHours();
if (hours > 0 && hours <= 12) {
  timeValue= "" + hours;
} else if (hours > 12) {
  timeValue= "" + (hours - 12);
} else if (hours == 0) {
  timeValue= "12";
}

if (hours >0 && hours <= 11) {nd="AM";}
else {nd = "PM"}

const minutes = current.getMinutes();
if (minutes < 10){space ="0";}
else {space=""};

document.getElementById("time").innerHTML = monthName +" "+ day+" - "+timeValue+":"+space+minutes+" "+nd;



//////////////////
animate();



function updateCamera(ev) {
    let div1 = document.getElementById("div1");
	camera.position.z = 18 - window.scrollY / 250.0;
}

window.addEventListener("scroll", updateCamera);