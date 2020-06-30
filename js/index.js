
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

renderer.setClearColor(0x47578a); //back wall
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
loader.minFilter = THREE.LinearFilter;

// canvas OBJECTS 
var cubeMaterials = [
    new THREE.MeshLambertMaterial({ color: 0x2E345B,wireframe: true}),
    new THREE.MeshLambertMaterial({ color: 0x2E345B,wireframe: true}),
    new THREE.MeshLambertMaterial({ map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL_elements/flooring9.jpg')}),
    new THREE.MeshLambertMaterial({ map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL_elements/ceiling3.jpg')}),
    new THREE.MeshBasicMaterial({color: 0x2E345B,wireframe: true})

  ];
var cubeGeometry = new THREE.BoxGeometry(80,0,70);
var floor = new THREE.Mesh(cubeGeometry,cubeMaterials);
var ceiling = new THREE.Mesh(cubeGeometry,cubeMaterials);

var wallGeometry = new THREE.PlaneGeometry(80,80);
var skillGeometry = new THREE.PlaneGeometry(6,3);
var wall2Geometry = new THREE.PlaneGeometry(18,180);

var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x47578a, side: THREE.DoubleSide}); //back wall
var wall2Material = new THREE.MeshBasicMaterial( {color: 0x2E3456, side: THREE.DoubleSide} );


var wall = new THREE.Mesh( wallGeometry, wallMaterial );
var wall2 = new THREE.Mesh( wallGeometry, wall2Material );
var wall3 = new THREE.Mesh( wallGeometry, wall2Material );


//loaders
var doorway = new THREE.MeshLambertMaterial({map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL_elements/doorway_final.png')});
doorway.transparent=true;

var deskchair = new THREE.MeshLambertMaterial({map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL_elements/desk12.png')}); 
deskchair.transparent=true;
var chair = new THREE.MeshLambertMaterial({map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL_elements/chair.png')}); 
chair.transparent=true;
var posters = new THREE.MeshLambertMaterial({map: loader.load('https://raw.githubusercontent.com/coloradical/Rae_Portfolio/master/src/webGL_elements/posters2.png')});
posters.transparent=true;

// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var doorGeometry = new THREE.PlaneGeometry(60, 24);
var deskGeometry = new THREE.PlaneGeometry(31, 19.18);
var chairGeometry = new THREE.PlaneGeometry(10, 14.8);
var posterGeometry = new THREE.PlaneGeometry(19.3,13.1);

// combine our image geometry and material into a mesh
var doorwayMesh = new THREE.Mesh(doorGeometry, doorway);
var deskMesh = new THREE.Mesh(deskGeometry, deskchair);
var chairMesh = new THREE.Mesh(chairGeometry, chair);
var posterMesh = new THREE.Mesh(posterGeometry,posters);

// set the position of the image mesh in the x,y,z dimensions
doorwayMesh.position.set(-1,0,-14);
deskMesh.position.set(-1.5,-3.5,-31);
chairMesh.position.set(5,-8.5,-28);
posterMesh.position.set(2,4.5,-32);

floor.position.set (-1,-16,-30);
ceiling.position.set(-1,16,-30)
wall.position.set(0,1,-40);
wall2.rotateY(180);
wall2.position.set(-25,0,-40);
wall3.rotateY(-180);
wall3.position.set(25,0,-40);

// add the image to the scene
scene.add(doorwayMesh, floor, ceiling, wall, deskMesh, chairMesh, posterMesh); //took out skill

//update ON SCROLL 
var updatedProgress = window.innerWidth/100;
var updatedProgressHeight = window.innerHeight/100;

const header = document.querySelector('.homepage');
const spinny = document.querySelector('.spinny');
const login = document.querySelector('.login');
const profile = document.querySelector('.profile');
const scrollArrow = document.querySelector('#bounce_arrow_button');
const profile_description = document.querySelector('.profile_description');
const toolbar = document.querySelector('.desktop_toolbar');
const toolbar_hide = document.querySelector('#desktop_toolbar_left');
const desktop = document.querySelector('.desktop');
const desktop_icons = document.querySelector('.desktop_icon_container');
const webDevelopmentSplash = document.querySelector('#web_development_splash');
const illustration_splash = document.querySelector('#illustration_splash');
const splash_pages = document.querySelector('#splash_pages');
const splash_page_wrapper = document.querySelector('.splash_page_wrapper');
const loading_bar = document.querySelector('.loading_scroller');

uos(0, .1, p => (header.style.opacity = ((updatedProgress-(p*20)) / (updatedProgress) )));
uos(0.1, 0.15, p => (header.style.left = (p*100)+"%")); //move header out of the way of desktop 
uos(0.2, 0.25, p => (spinny.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.25, 0.39, p => (spinny.style.width = (100-(p*100)) +"%"));
uos(0.39, 0.44, p => (login.style.opacity =  ((updatedProgress-(p*20))/(updatedProgress)) ));
uos(0.35, 0.4, p => (toolbar.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.85, 0.9, p => (toolbar_hide.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.33, 0.37, p => (profile.style.width= ((p*30))+"%"));
uos(0.43, 0.53, p => (login.style.left = (p*200)+"%"));
uos(0.32, 0.34, p => (profile_description.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.43, 0.90, p => (loading_bar.style.width= ((p*90))+"%"));
uos(0.43, 0.45, p => (splash_page_wrapper.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.46, 0.6, p => (webDevelopmentSplash.style.opacity =  ((p*30/updatedProgress)) ));
uos(0.6, 0.75, p => (illustration_splash.style.opacity =  ((p*30/updatedProgress)) ));
uos(0.8, 0.85, p => (splash_pages.style.left = (p*200)+"%"));
uos(0.8, 0.85, p => (scrollArrow.style.left = (p*200)+"%"));
uos(0.85, 0.9, p => (desktop.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.9, 0.94, p => (desktop_icons.style.opacity =  ((p*50/updatedProgress)) ));
uos(0.42, 0.48, p => (desktop.style.opacity =  ((p*50/updatedProgress)) ));



dragElement(document.getElementById("about_window"));
dragElement(document.getElementById("finder_window"));
dragElement(document.getElementById("thankyou_note"));
dragElement(document.getElementById("extras_window"));
dragElement(document.getElementById("thankyou_note"));
dragElement(document.getElementById("mia1"));
dragElement(document.getElementById("mia2"));
dragElement(document.getElementById("mia3"));
dragElement(document.getElementById("contact_window"));
dragElement(document.getElementById("terminal_window"));
dragElement(document.getElementById("testimonial_window1"));
dragElement(document.getElementById("testimonial_window2"));
dragElement(document.getElementById("testimonial_window3"));


var desktop_icons_array = document.getElementsByClassName("desktop_icons");

  const top_padding = [ "75px", "10%", "25%", "35%", "50%", "60%"];
  for (i=0; i<desktop_icons_array.length; i++){
      var y = Math.floor( Math.random()*top_padding.length );
      var icon = desktop_icons_array[i];
      var icon_top = top_padding[y];
      
      top_padding.splice(y,1);
      icon.style.top = icon_top;
              
}

function about_scroller(direction) {
  if (direction === 1) {document.getElementById('about_content').scrollLeft += 590;}
  else {document.getElementById('about_content').scrollLeft -= 590;}
};


var open = [];
function toggleOpenClose(window_id) {
  var icons = document.getElementById("desktop_icon_container");
  var tab = document.getElementById(window_id);

  if (tab.style.display === "block") {
    open.pop(tab);
    tab.style.display = "none";
    icons.style.animation = "fade-in .75s cubic-bezier(.39,.575,.565,1.000) both";
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
  }
}

function trashOpenClose(window_id) {
  var trash = document.getElementById(window_id);
  if (trash.style.display === "block") {
    trash.style.display = "none";
  } else {
    trash.style.display = "block";
    trash.style.animation = "fade-in 0.5s cubic-bezier(.39,.575,.565,1.000) both";
  }
}

// ------------------------------------------------------------------------  
//START finder functions

function finder_filter(filterbutton, filterbuttonName) {
  var allButtons = document.getElementsByClassName("finder_filter_btn");
  for (i = 0; i < allButtons.length; i++){
      var deactivate = allButtons[i];
      deactivate.style.background="#384272";
      deactivate.style.color = "#c7ccde";
  }
  var activeButton = document.getElementById(filterbuttonName);
  activeButton.style.background = "#2f335c";
  activeButton.style.color = "white";

  var all = ["civico_icon", "civico_slide", "millerslide", "miller_icon", "katslide", "kattype_icon", "killanillaslide", "killanilla_icon", "northern_icon", "northernslide", "vans_icon", "vansslide", "wfslide", "wf_icon", "tlgsslide", "tlgs_icon", "debraslide", "debra_icon", "mechslide", "mech_icon", "renu_slide", "renu_icon"];
  var allIcons = ["civico_icon", "miller_icon", "kattype_icon",  "killanilla_icon", "northern_icon", "vans_icon",   "wf_icon",  "tlgs_icon",  "debra_icon", "mech_icon", "renu_icon"];
  
  for (i = 0; i < all.length; i++){
    var showElement = document.getElementById(all[i]);
    showElement.className = showElement.className.replace("hiddenMySlides", "mySlides");
  }
  
  for (i=0; i<allIcons.length; i++){
      var showIcon = document.getElementById(allIcons[i]);
      showIcon.style.display = "block";
  }
  
  if (filterbutton === 1){scaleCarouselButton('tlgs_icon', 1); var hideThis = ["renu_icon", "renu_slide","civico_icon", "civico_slide" , "millerslide", "miller_icon", "katslide", "kattype_icon", "killanillaslide", "killanilla_icon", "northern_icon", "northernslide", "vans_icon", "vansslide", "wfslide", "wf_icon"];}
  else if (filterbutton === 2){scaleCarouselButton('vans_icon', 1); var hideThis = ["millerslide", "miller_icon", "katslide", "kattype_icon", "killanillaslide", "killanilla_icon", "northern_icon", "northernslide", "tlgsslide", "tlgs_icon", "debraslide", "debra_icon", "mechslide", "mech_icon"];}
  else if (filterbutton === 3){scaleCarouselButton('miller_icon', 1); var hideThis = ["tlgsslide", "civico_icon", "civico_slide", "tlgs_icon", "debraslide", "debra_icon", "mechslide", "mech_icon", "vans_icon", "vansslide", "wfslide", "wf_icon", "renu_icon", "renu_slide"];}
  else {var hideThis = []; scaleCarouselButton('renu_icon', 1);}

 for (i = 0; i < hideThis.length; i++){
     var hide = document.getElementById(hideThis[i]);
     hide.style.display = "none";
     hide.className = hide.className.replace('mySlides', "hiddenMySlides");
 }

 var mySlides = document.getElementsByClassName("mySlides");
 mySlides[0].style.display = "block";
}

function scaleCarouselButton(buttonName, buttonPosition){
  var openbuttons = [];
  openbuttons.push(buttonName);
 
  for (i = 0; i<openbuttons.length; i++){
          var scaleDown = document.getElementById(openbuttons[i]);
          scaleDown.classList.remove('active_carousel_button');
          openbuttons.pop(openbuttons[i]);
      }
  if (buttonPosition === 1){
      
      var scaleThisButton = document.getElementById(buttonName);
      scaleThisButton.classList.add("active_carousel_button");
  } 
}

var x = document.getElementsByClassName("mySlides");                    
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}


function currentDiv(n, filteredSlideIndex) {
  if (x.length <= 4){slideIndex = filteredSlideIndex;}
  else {slideIndex = n;}
  showDivs(slideIndex);
}

function showDivs(n) {
var i;
var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
x[slideIndex-1].style.display = "block";  
}


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

var terminal_lines = document.getElementsByClassName('line');
for (i=0; i<terminal_lines.length; i++) {
  console.log(terminal_lines[i]);
  var thisLine = terminal_lines[i];
  thisLine.style.animation = "typing " + i+2 +"s steps(30, end);"
}



function scrollToPosition(value){
  var doc = document.getElementById('viewport');
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  var scrollFrom = top + value;
  if (value === 0){
    window.scrollTo(0,0);
  } else {
  
  window.scrollTo(0,scrollFrom);}
}

function changeTime(){
  const current = new Date();
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
  document.getElementById("timeLogin").innerHTML = "Last Login: "+timeValue+":"+space+minutes+" "+nd;

}
window.addEventListener("scroll", changeTime);

animate();
function updateCamera(ev) {
	camera.position.z = 18 - window.scrollY / 250.0;
}

window.addEventListener("scroll", updateCamera);
window.addEventListener("resize", function resizeWEBGL(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});