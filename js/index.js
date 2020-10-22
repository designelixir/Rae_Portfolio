window.addEventListener( 'resize', onWindowResize, false );
window.ImageBitmap = window.ImageBitmap || function () { return null }

var isThisMobile;

  if (typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1){
      console.log("mobile");
      var isThisMobile = true;
      
      
      
      
  } else {
      console.log("not mobile");
      var isThisMobile = false;
      
  } console.log(isThisMobile);
 
if (!isThisMobile){



// ------------------------------------------------------------------------------------------------------------------------------

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate(time) {
  time *= 0.001;  // seconds
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

var canvas = document.getElementById("viewport");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50); //first number should be 60 
camera.position.set(0, 1, 18);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

let renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("viewport")
});

renderer.setClearColor(0x47578A); //back wall
renderer.setSize(window.innerWidth, window.innerHeight, false);

let light = new THREE.AmbientLight(0xFFFFFF); 
scene.add(light);



var loader = new THREE.TextureLoader();
loader.generateMipmaps = false;
loader.minFilter = THREE.LinearFilter;
loader.wrapS = loader.wrapT = THREE.ClampToEdgeWrapping;


var DESKGeom = new THREE.PlaneGeometry(40, 40);
var DESKSrc = 'https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL_elements/desk_resized_v4.png';
var DESKmesh;
var DESKtex = new THREE.TextureLoader().load(DESKSrc, (DESKtex) => {
  DESKtex.needsUpdate = true;
  DESKmesh.scale.set(1.0, DESKtex.image.height / DESKtex.image.width, 1.0);
});
var DESKmaterial = new THREE.MeshLambertMaterial({map: DESKtex});
DESKmesh = new THREE.Mesh(DESKGeom, DESKmaterial);
DESKmaterial.transparent = true;
DESKmesh.position.set(-1.5,-5,-35);

var POSTERGeom = new THREE.PlaneGeometry(30, 30);
var POSTERSrc = 'https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL_elements/posters_resized_v2.png';
var POSTERmesh;
var POSTERtex = new THREE.TextureLoader().load(POSTERSrc, (POSTERtex) => {
  POSTERtex.needsUpdate = true;
  POSTERmesh.scale.set(1.0, POSTERtex.image.height / POSTERtex.image.width, 1.0);
});
var POSTERmaterial = new THREE.MeshLambertMaterial({map: POSTERtex});
POSTERmesh = new THREE.Mesh(POSTERGeom, POSTERmaterial);
POSTERmaterial.transparent = true;
POSTERmesh.position.set(2,5,-36);

// canvas OBJECTS 

function makeInstance(geometry, color, rotY, url) {
  const texture = loader.load(url, render);
  const material = new THREE.MeshPhongMaterial({
    color: 0x2E345B,
    map: texture,
    opacity: 0.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  mesh.rotation.y = rotY;
}

var cubeMaterials = [
    new THREE.MeshLambertMaterial({ color: 0x2E345B,wireframe: false}),
    new THREE.MeshLambertMaterial({ color: 0x2E345B,wireframe: false}),
    new THREE.MeshLambertMaterial({ map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL_elements/flooring9.jpg')}),
    new THREE.MeshLambertMaterial({ color: 0x2E345B, transparent: true, opacity: 0.5, map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL_elements/wood_texture_test.png')}),
    

  ];
var cubeGeometry = new THREE.BoxGeometry(80,0,70);
var floor = new THREE.Mesh(cubeGeometry,cubeMaterials);
var ceiling = new THREE.Mesh(cubeGeometry,cubeMaterials);

var wallGeometry = new THREE.PlaneGeometry(80,80);
var skillGeometry = new THREE.PlaneGeometry(6,3);
var wall2Geometry = new THREE.PlaneGeometry(18,180);

var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x47578a, side: THREE.DoubleSide}); //back wall
var wall2Material = new THREE.MeshBasicMaterial( {color: 0xFF0000, side: THREE.DoubleSide} );

var wall = new THREE.Mesh( wallGeometry, wallMaterial );
var wall2 = new THREE.Mesh( wallGeometry, wall2Material ); //ceiling
var wall3 = new THREE.Mesh( wallGeometry, wall2Material ); //floor

//loaders

var doorway = new THREE.MeshLambertMaterial({map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL_elements/resized_doorway.png')});
doorway.transparent=true;

var chair = new THREE.MeshLambertMaterial({map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL_elements/chair.png')}); 
chair.transparent=true;

// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var doorGeometry = new THREE.PlaneGeometry(70, 34);
var chairGeometry = new THREE.PlaneGeometry(10, 14.8);

// combine our image geometry and material into a mesh
var doorwayMesh = new THREE.Mesh(doorGeometry, doorway);
var chairMesh = new THREE.Mesh(chairGeometry, chair);

// set the position of the image mesh in the x,y,z dimensions
doorwayMesh.position.set(1.5,0,-14);
chairMesh.position.set(5,-8.5,-28);

floor.position.set (-1,-16,-30);
ceiling.position.set(-1,18,-30)
wall.position.set(0,1,-40);
wall2.rotateY(180);
wall2.position.set(-25,0,-40);
wall3.rotateY(-180);
wall3.position.set(25,0,-40);

// add the image to the scene
scene.add(doorwayMesh, floor, wall, ceiling, DESKmesh, chairMesh, POSTERmesh); //took out 

//update ON SCROLL 
var updatedProgress = window.innerWidth/100;
var updatedProgressHeight = window.innerHeight/100;

const header = document.querySelector('.homepage');
const login = document.querySelector('.login');
const profile = document.querySelector('.profile');
const scrollArrow = document.querySelector('#bounce_arrow_button');
const profile_description = document.querySelector('.profile_description');
const toolbar = document.querySelector('.desktop_toolbar');
const toolbar_hide = document.querySelector('#desktop_toolbar_left');
const desktop = document.querySelector('.desktop');
const webDevelopmentSplash = document.querySelector('#web_development_splash');
const illustration_splash = document.querySelector('#illustration_splash');
const splash_pages = document.querySelector('#splash_pages');
const splash_page_wrapper = document.querySelector('.splash_page_wrapper');

uos(0, .1, p => (header.style.opacity = ((updatedProgress-(p*20)) / (updatedProgress) )));
uos(0.1, 0.15, p => (header.style.left = (p*100)+"%")); //move header out of the way of desktop 
uos(0.39, 0.44, p => (login.style.opacity =  ((updatedProgress-(p*20))/(updatedProgress)) ));
uos(0.35, 0.4, p => (toolbar.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.85, 0.9, p => (toolbar_hide.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.33, 0.37, p => (profile.style.width= ((p*30))+"%"));
uos(0.43, 0.53, p => (login.style.left = (p*200)+"%"));
uos(0.32, 0.34, p => (profile_description.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.43, 0.45, p => (splash_page_wrapper.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.46, 0.6, p => (webDevelopmentSplash.style.opacity =  ((p*30/updatedProgress)) ));
uos(0.6, 0.75, p => (illustration_splash.style.opacity =  ((p*30/updatedProgress)) ));
uos(0.8, 0.85, p => (splash_pages.style.left = (p*200)+"%"));
uos(0.8, 0.85, p => (scrollArrow.style.left = (p*200)+"%"));
uos(0.85, 0.9, p => (desktop.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.42, 0.48, p => (desktop.style.opacity =  ((p*50/updatedProgress)) ));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var window = document.getElementsByClassName('window');
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
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

window.addEventListener("load", function(){
  dragElement(document.getElementById("about_window"));
  dragElement(document.getElementById("extras_window"));
  dragElement(document.getElementById("mia2"));
  dragElement(document.getElementById("mia3"));
  dragElement(document.getElementById("contact_window"));
  dragElement(document.getElementById("terminal_window"));
  dragElement(document.getElementById("about_window"));

});


function scrollToPosition(value){
  var doc = document.getElementById('viewport');
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  var scrollFrom = top + value;
  if (value === 0){
    window.scrollTo(0,0);
  } else {
  
  window.scrollTo(0,scrollFrom);}
}

animate();
function updateCamera(ev) {
	camera.position.z = 18 - window.scrollY / 250.0;
}

window.addEventListener("scroll", updateCamera);


} //ending bracket for desktop only javascript 
// ################################################################################
else {
  document.getElementById('portfolio_page_wrapper').style.height = "100vh";
  document.getElementById('portfolio_page_wrapper').style.overflowY = "hidden";
  var hide_homepage = document.getElementById('homepage_wrapper');
  var hide_arrow = document.getElementById('arrow');
  hide_homepage.classList.add('mobile_hide');
  hide_arrow.classList.add('mobile_hide');
  document.getElementById('de_link').addEventListener("click", function(){toggleOpenClose('mobile_homepage_wrapper')});
  var mobile_revealers = document.getElementsByClassName('mobile_reveal');
  var revealThese = mobile_revealers.length;
  for (i = 0; i < revealThese ; i++ ){
    mobile_revealers[i].style.display = "block";
  }
  
}





var open = [];
function toggleOpenClose(window_id) {
  var icons = document.getElementById("desktop_icon_container");
  var mobile_icons = document.getElementById('mobile_icon_container');
  var tab = document.getElementById(window_id);

  if (tab.style.display === "block") {
    open.pop(tab);
    tab.style.display = "none";
    icons.style.animation = "fade-in .75s cubic-bezier(.39,.575,.565,1.000) both";
    mobile_icons.style.animation = "fade-in .75s cubic-bezier(.39,.575,.565,1.000) both";

  }else {
    tab.style.display = "block";
    tab.style.animation = "fade-in 0.5s cubic-bezier(.39,.575,.565,1.000) both";

    var openWindow = open.length;
    if (open.length > 0) {
      for (i = 0; i < openWindow ; i++ ){
        var closeThis = open[i];
        closeThis.style.display = "none";
        open.pop(closeThis);
      }
    }
    open.push(tab);
    icons.style.animation="fade-out2 .5s ease-out both";
    mobile_icons.style.animation="fade-out2 .5s ease-out both";

  }
}

//switch between slides on project viewer
var open_frames = [];
if (open_frames.length === 0){
  var tlgs = document.getElementById('tlgs_frame');
  open_frames.push(tlgs);
  tlgs.style.display = "block";
}

function togglePhoto(frame_name, tile_name) {
  var frame = document.getElementById(frame_name);
  document.getElementById(tile_name).scrollIntoView({inline: "center"});
  
  if (open_frames.length > 0) {
    for (i = 0; i < open_frames.length; i++ ){
      var closeThis = open_frames[i];
      closeThis.style.display = "none";
      open_frames.pop(closeThis);
    }
    frame.style.animation = "fade-in .75s cubic-bezier(.39,.575,.565,1.000) both";
    open_frames.push(frame);
    frame.style.display = "block";
    
  }else{
      for (i = 0; i < openFrames ; i++ ){
        var closeThis = open_frames[i];
        closeThis.style.display = "none";
        open_frames.pop(closeThis);
      }
      frame.style.animation="fade-out2 .5s ease-out both";
      frame.style.display = "block";
    open_frames.push(frame);
  }
} 

//eventually change all buttons to this.. sigh 
  document.getElementById('mobile_dock_finder').addEventListener("click", function()
  {toggleOpenClose('instagram_window')});



function trashOpenClose(window_id) {
  var trash = document.getElementById(window_id);
  if (trash.style.display === "block") {
    trash.style.display = "none";
  } else {
    trash.style.display = "block";
    trash.style.animation = "fade-in 0.5s cubic-bezier(.39,.575,.565,1.000) both";
  }
}

function changeTime(){
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const current = new Date();
  const month = months[current.getMonth()];
  const dayWeek = days[current.getUTCDay()-1];
  const day = current.getUTCDay();
  
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
  document.getElementById("time").innerHTML = timeValue+":"+space+minutes+" "+nd;
  document.getElementById("mobile_time").innerHTML = timeValue+":"+space+minutes;
  document.getElementById('mobile_date').innerHTML = dayWeek+", "+month+" "+day;
}
window.addEventListener("scroll", changeTime);
window.addEventListener("click", changeTime);
window.addEventListener("load", changeTime);





function dragMobileSlider(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

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
    pos3 = e.clientX;
    // set the element's new position:
    
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


dragMobileSlider(document.getElementById("unlock_btn"));