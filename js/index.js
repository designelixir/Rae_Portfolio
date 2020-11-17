window.addEventListener( 'resize', function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
});
window.ImageBitmap = window.ImageBitmap || function () { return null }

var isThisMobile;

  if (typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1){
      var isThisMobile = true;
  } else {
      var isThisMobile = false;
  } console.log("Mobile device detected: " + isThisMobile);
 
if (!isThisMobile){



// ------------------------------------------------------------------------------------------------------------------------------

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}




var canvas = document.getElementById("viewport");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50); //first number should be 60 
camera.position.set(0, 1, 18);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("viewport")
});

renderer.setClearColor(0x47578A); //back wall
renderer.setSize(window.innerWidth, window.innerHeight, false);


let light = new THREE.AmbientLight(0xFFFFFF); 
scene.add(light);

function animate(time) {
  time *= 0.001;  // seconds
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

var loader = new THREE.TextureLoader();
loader.generateMipmaps = false;
loader.minFilter = THREE.LinearFilter;
loader.wrapS = loader.wrapT = THREE.ClampToEdgeWrapping;


var DESKGeom = new THREE.PlaneGeometry(40, 40);
var DESKSrc = 'https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL/desk_resized_optimized_v5.png';
var DESKmesh;
var DESKtex = new THREE.TextureLoader().load(DESKSrc, (DESKtex) => {
  DESKtex.needsUpdate = true;
  DESKmesh.scale.set(1.0, DESKtex.image.height / DESKtex.image.width, 1.0);
});
var DESKmaterial = new THREE.MeshLambertMaterial({map: DESKtex});
DESKmesh = new THREE.Mesh(DESKGeom, DESKmaterial);
DESKmaterial.transparent = true;
DESKmesh.position.set(-1,-5.5,-35);

var POSTERGeom = new THREE.PlaneGeometry(28, 28);
var POSTERSrc = 'https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL/posters_resized_optimized_v2.png';
var POSTERmesh;
var POSTERtex = new THREE.TextureLoader().load(POSTERSrc, (POSTERtex) => {
  POSTERtex.needsUpdate = true;
  POSTERmesh.scale.set(1.0, POSTERtex.image.height / POSTERtex.image.width, 1.0);
});
var POSTERmaterial = new THREE.MeshLambertMaterial({map: POSTERtex});
POSTERmesh = new THREE.Mesh(POSTERGeom, POSTERmaterial);
POSTERmaterial.transparent = true;
POSTERmesh.position.set(2,1,-36);

// canvas OBJECTS 

var cubeMaterials = [
    new THREE.MeshLambertMaterial({ color: 0x2E345B,wireframe: false}),
    new THREE.MeshLambertMaterial({ color: 0x2E345B,wireframe: false}),
    new THREE.MeshLambertMaterial({  map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL/flooring_resized_optimized_v6.png')}),
    new THREE.MeshLambertMaterial({  map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL/ceiling_resized_optimized_v4.png')}),
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

var doorway = new THREE.MeshLambertMaterial({map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL/doorway_resized_optimized_v1.png')});
doorway.transparent=true;

var chair = new THREE.MeshLambertMaterial({map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL/chair_resized_optimized_v2.png')}); 
chair.transparent=true;

// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var doorGeometry = new THREE.PlaneGeometry(70, 34);
var chairGeometry = new THREE.PlaneGeometry(10, 20);

// combine our image geometry and material into a mesh
var doorwayMesh = new THREE.Mesh(doorGeometry, doorway);
var chairMesh = new THREE.Mesh(chairGeometry, chair);

// set the position of the image mesh in the x,y,z dimensions
doorwayMesh.position.set(1.5,0,-14);
chairMesh.position.set(6,-8,-30);


floor.position.set (-1,-16,-26);
ceiling.position.set(-1,18,-30)
wall.position.set(0,1,-42);
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
const desktop_icons = document.querySelector('.desktop_icon_container');


uos(0, .1, p => (header.style.opacity = ((updatedProgress-(p*20)) / (updatedProgress) )));
uos(0.1, 0.15, p => (header.style.left = (p*100)+"%")); //move header out of the way of desktop 
uos(0.35, 0.4, p => (toolbar.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.85, 0.9, p => (toolbar_hide.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.45, 0.48, p => (login.style.opacity =  ((updatedProgress-(p*20))/(updatedProgress)) ));
uos(0.56, 0.60, p => (login.style.left = (p*200)+"%"));
uos(0.33, 0.48, p => (profile.style.width= ((p*30))+"%"));
uos(0.33, 0.60, p => (profile_description.style.opacity =  ((p*50/updatedProgress)) ));


uos(0.6, 0.65, p => (splash_page_wrapper.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.6, 0.7, p => (webDevelopmentSplash.style.opacity =  ((p*30/updatedProgress)) ));
uos(0.7, 0.85, p => (illustration_splash.style.opacity =  ((p*30/updatedProgress)) ));
uos(0.88, 0.93, p => (splash_pages.style.left = (p*200)+"%"));
uos(0.9, 0.95, p => (scrollArrow.style.left = (p*200)+"%"));
uos(0.90, 1, p => (desktop.style.opacity =  ((p*50/updatedProgress)) ));

uos(0.97, 1, p => (desktop_icons.style.opacity =  ((p*50/updatedProgress)) ));



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


function updateCamera(ev) {
	camera.position.z = 18 - window.scrollY / 250.0;
}

window.addEventListener("scroll", updateCamera);


} //ending bracket for desktop only javascript ^^^^^^^^^^^^
// ################################################################################

else {
 


  changeTime();
  document.getElementById('body').style.height = "100vh";
  document.getElementById('body').style.overflowY = "hidden";
  document.getElementById('homepage_wrapper').style.display = 'none';
  
  var mobile_show = document.getElementsByClassName('mobile_show');
  for (i=0; i<mobile_show.length; i++){
    mobile_show[i].style.display = 'block';
  }
  var mobile_hide = document.getElementsByClassName('mobile_hide');
  for (i=0; i<mobile_hide.length; i++){
    mobile_hide[i].style.display = 'none';
  }
  var hide_homepage = document.getElementById('homepage_wrapper');
  var hide_arrow = document.getElementById('arrow');
  hide_homepage.classList.add('mobile_hide');
  hide_arrow.classList.add('mobile_hide');
  document.getElementById('de_link').addEventListener("click", function(){document.getElementById('mobile_homepage_wrapper').style.display="block"; unlock(false);});
  var mobile_revealers = document.getElementsByClassName('mobile_reveal');
  var revealThese = mobile_revealers.length;
  for (i = 0; i < revealThese ; i++ ){
    mobile_revealers[i].style.display = "block";
  }
  
}

function unlock(open){
  var mobile_homepage = document.getElementById('mobile_homepage_wrapper');
  var mobile_icons = document.getElementsByClassName('app');
  var desktop_icons = document.getElementById('desktop_icon_container');
  var lock_icon=document.getElementById('lock');
  var mobile_dock = document.getElementById('mobile_dock_container');

  if (open && window.innerWidth < 450) {
    lock_icon.style.animation = "fade-out .5s ease-out both";
    mobile_homepage.style.animation = "fade-out .5s ease-out both";
    mobile_homepage.style.display = "none";
    mobile_dock.style.animation = "slide-in-fwd-bottom 0.75s cubic-bezier(.25,.46,.45,.94) both";
    for (i=0; i<8; i++){
      mobile_icons[i].style.animation = 'fade-in .25s cubic-bezier(.39,.575,.565,1.000) both';
      mobile_icons[i].style.animation = 'scale-in-center 1s cubic-bezier(.25,.46,.45,.94) both';
    }
    
  } else if (open && window.innerWidth > 400) {
    document.getElementById('mobile_icon_container').style.display = "none";
    desktop_icons.style.display = "block";
    desktop_icons.style.animation = 'fade-in .5s cubic-bezier(.39,.575,.565,1.000) both';

    lock_icon.style.animation = "fade-out .5s ease-out both";
    mobile_homepage.style.animation = "fade-out .5s ease-out both";
    mobile_homepage.style.display = "none";
    mobile_dock.style.animation = "slide-in-fwd-bottom 0.75s cubic-bezier(.25,.46,.45,.94) both";

  } else {
    location.reload();

  }


}




var open = [];
function toggleOpenClose(window_id) {

  var icons = document.getElementById("desktop_icon_container");
  var mobile_icons = document.getElementById('mobile_icon_container');
  var tab = document.getElementById(window_id);
 

 if (tab.style.display === "block") {
    document.getElementById('body').style.overflow = 'scroll';

    open.pop(tab);
    tab.style.display = "none";
    icons.style.animation = "fade-in .75s cubic-bezier(.39,.575,.565,1.000) both";
    mobile_icons.style.animation = "fade-in .75s cubic-bezier(.39,.575,.565,1.000) both";

  } else {
    tab.style.display = "block";
    document.getElementById('body').style.overflow = 'hidden';

    if(window_id === 'mobile_notification_window'){
      tab.style.animation = 'slide-in-top 0.5s cubic-bezier(.25,.46,.45,.94) both;'
    } else {
      tab.style.animation = "fade-in 1s cubic-bezier(.39,.575,.565,1.000) both";

    }

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

var all_instagram_tiles = document.getElementsByClassName('instagram_tile');

function togglePhoto(frame_name, tile_name) {
  var frame = document.getElementById(frame_name);
  var active_tile = document.getElementById(tile_name);
  for (i=0; i<14; i++){
    all_instagram_tiles[i].style.border = 'none';
  }
  active_tile.scrollIntoView({inline: "center"});
  active_tile.style.border = '2px solid black';
  
  
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


  document.getElementById('social_banner_toggle').addEventListener("click", function()
  {
    var social_banner = document.getElementById('social_banners');
    if (social_banner.style.display === "block") {social_banner.style.display = "none";}
    else {social_banner.style.display = "block";}
  });

  document.getElementById('shortcut_banner_toggle').addEventListener("click", function()
  {
    var shortcut_banner = document.getElementById('shortcut_banners');
    if (shortcut_banner.style.display === "block") {shortcut_banner.style.display = "none";}
    else {shortcut_banner.style.display = "block";}
  });


var section1 = document.getElementById('section1');
var section2 = document.getElementById('section2');
var section3 = document.getElementById('section3');

  document.getElementById('section1_btn').addEventListener("click", function()
  {
    section1.style.display = "block";
    section1.style.animation = "fade-in 0.75s cubic-bezier(.0,.25,.75,1.000) both";
    section2.style.display = "none";
    section3.style.display = "none";
});

document.getElementById('section2_btn').addEventListener("click", function()
  {
    section1.style.display = "none";
    section2.style.animation = "fade-in 0.75s cubic-bezier(.0,.25,.75,1.000) both";
    section2.style.display = "block";
    section3.style.display = "none";

});



document.getElementById('section3_btn').addEventListener("click", function()
  {
    section1.style.display = "none";
    section2.style.display = "none";
    section3.style.display = "block";
    section3.style.animation = "fade-in 0.75s cubic-bezier(.0,.25,.75,1.000) both";

});


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
  const week = days[current.getDay()];
  const day = current.getDate();
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
  document.getElementById('mobile_date').innerHTML = week+", "+month+" "+day;
}
window.addEventListener("scroll", changeTime);
window.addEventListener("click", changeTime);
window.addEventListener("load", changeTime);


