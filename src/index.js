function getRandomBetween(value) {
  const floor = -value;
  return floor + Math.random() * value * 2;
}

function getArrayWithNoise(array, noise) {
  return array.map(item => item + getRandomBetween(noise));
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createInstance({ rainbow = false, geometry, material, multiplier, duration, points }) {
  const attributes = [
    {
      name: 'aPositionStart',
      data: points[0],
      size: 3,
    },
    {
      name: 'aControlPointOne',
      data: points[1],
      size: 3,
    },
    {
      name: 'aControlPointTwo',
      data: points[2],
      size: 3,
    },
    {
      name: 'aPositionEnd',
      data: points[3],
      size: 3,
    },
    {
      name: 'aOffset',
      data: i => [i * ((1 + duration) / (multiplier - 1))],
      size: 1,
    },
  ];

  // if (rainbow) {
  //   attributes.push({
  //     name: 'aColor',
  //     data: (i, total) => {
  //       const color = new THREE.Color();
  //       color.setHSL(i / total, 0.6, 0.7);
  //       return [color.r, color.g, color.b];
  //     },
  //     size: 3,
  //   });
  // }

  const uniforms = {
    time: {
      value: 0,
    },
  };

  const vertex = `
    attribute vec3 aPositionStart;
    attribute vec3 aControlPointOne;
    attribute vec3 aControlPointTwo;
    attribute vec3 aPositionEnd;
    attribute float aOffset;
    uniform float time;
    ${rainbow ? `attribute vec3 aColor; varying vec3 vColor;` : ``}

    float easeInOutSin(float t){
      return (1.0 + sin(${Math.PI} * t - ${Math.PI} / 2.0)) / 2.0;
    }

    vec4 quatFromAxisAngle(vec3 axis, float angle) {
      float halfAngle = angle * 0.5;
      return vec4(axis.xyz * sin(halfAngle), cos(halfAngle));
    }

    vec3 rotateVector(vec4 q, vec3 v) {
      return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
    }

    vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
      return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
    }

    void main(){
      float tProgress = easeInOutSin(min(1.0, max(0.0, (time - aOffset)) / ${duration}));
      vec4 quatX = quatFromAxisAngle(vec3(1.0, 0.0, 0.0), -5.0 * tProgress);
      vec4 quatY = quatFromAxisAngle(vec3(0.0, 1.0, 0.0), -5.0 * tProgress);
      vec3 basePosition = rotateVector(quatX, rotateVector(quatY, position));
      vec3 newPosition = bezier4(aPositionStart, aControlPointOne, aControlPointTwo, aPositionEnd, tProgress);
      float scale = tProgress * 2.0 - 1.0;
      scale = 1.0 - scale * scale;
      basePosition *= scale;
      gl_Position = basePosition + newPosition;
      ${rainbow ? `vColor = aColor;` : ``}
    }
  `;

  const fragment = rainbow
    ? [
        ['#define PHONG', 'varying vec3 vColor;'],
        ['vec4( diffuse, opacity )', 'vec4( vColor, opacity )'],
        ['vec3 totalEmissiveRadiance = emissive;', 'vec3 totalEmissiveRadiance = vColor;'],
      ]
    : [];

  const instance = new THREE.Phenomenon({
    attributes,
    uniforms,
    vertex,
    geometry,
    multiplier,
    material,
    fragment,
  });

  // scene.add(instance.mesh);
  return instance;
}

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setClearColor(0x2E345B, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio >= 2 ? 2 : 1);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 20 * 1, 35 * 1);
camera.lookAt(scene.position);
scene.add(camera);

function render() {
  renderer.render(scene, camera);
}

//something to do with canvas width and size 
function hcfp(percent) {
  return `#${new THREE.Color().setHSL(percent, 33, 27).getHexString()}`;
}

//shapes or GEOMETRIES 
const instances = [

  //weird geometric cube things
  createInstance({
    geometry: new THREE.IcosahedronGeometry(1, 0),
    material: new THREE.MeshPhongMaterial({
      // emissive: hcfp(0),
      // specular: '#efefef',
      // shininess: 20,
      // flatShading: true,
    }),
    multiplier: 200,
    duration: 0.7,
    points: [
      () => getArrayWithNoise([0, 0, 0], 10),
      () => getArrayWithNoise([0, 0, 0], 8),
      () => getArrayWithNoise([0, 0, 0], 2),
      () => getArrayWithNoise([0, 0, 0], 12),
    ],
  }),

  //boxes
  createInstance({
    geometry: new THREE.BoxGeometry(1, 1, 1),
    material: new THREE.MeshPhongMaterial({
      // emissive: hcfp(0.5 / 3),
      // specular: '#efefef',
      // shininess: 2,
      // flatShading: false,
    }),
    multiplier: 200,
    duration: 0.4,
    points: [
      () => getArrayWithNoise([-10, 0, 0], 4),
      () => getArrayWithNoise([-2.5, -10, 0], 4),
      () => getArrayWithNoise([2.5, 10, 0], 4),
      () => getArrayWithNoise([10, 0, 0], 4),
    ],
  }),

  //triangles 
  createInstance({
    geometry: new THREE.TetrahedronGeometry(1),
    material: new THREE.MeshPhongMaterial({
      // emissive: hcfp(1.5 / 3),
      // specular: '#efefef',
      // shininess: 20,
      // flatShading: true,
    }),
    multiplier: 40,
    duration: 0.4,
    points: [
      () => getArrayWithNoise([0, 10, 0], 10),
      () => getArrayWithNoise([0, 0, 0], 10),
      () => getArrayWithNoise([0, 0, 0], 10),
      () => getArrayWithNoise([0, -10, 0], 10),
    ],
  }),

  //circles
  createInstance({
    rainbow: true,
    geometry: new THREE.IcosahedronGeometry(0.8, 3),
    material: new THREE.MeshPhongMaterial({
      emissive: hcfp(2 / 3),
      specular: '#efefef',
      shininess: 20,
      flatShading: true,
    }),
    multiplier: 400,
    duration: 0.4,
    points: [
      () => getArrayWithNoise([0, -20, 0], 0),
      () => getArrayWithNoise([0, 10, 0], 0),
      () => getArrayWithNoise([0, -10, 0], 10),
      () => getArrayWithNoise([0, 15, 0], 15),
    ],
  }),
];


//query selectors for scrolling behavior
const headings = document.querySelectorAll('.heading');
const header = document.querySelector('.header');
const desk = document.querySelector('.desk');
const doorway = document.querySelector('.doorway');
const circle = document.querySelector('.circle');
const desktop = document.querySelector('.desktop');
const elixir = document.querySelector('.logo');
const downArrow = document.querySelector('.downArrow');

// const square = document.querySelector('.black');
const social = document.querySelector('.social');
const welcome= document.querySelector('.welcome');
const stars = document.querySelector('.stars');
const logo = document.querySelector('.logo');

const spinny = document.querySelector('.spinny');
const on = document.querySelector('.on');
const wallpaper = document.querySelector('.wallpaper');

const toolbar = document.querySelector('.toolbar');
const dock = document.querySelector('.dock');
const finder = document.querySelector('.finder');
const notif = document.querySelector('.notif');


const file2 = document.querySelector('#icon2');
const file3 = document.querySelector('#icon3');
const file4 = document.querySelector('#icon4');
const file5 = document.querySelector('#icon5');
const file6 = document.querySelector('#icon6');
const file7 = document.querySelector('#icon7');
const file8 = document.querySelector('#icon8');
const file9 = document.querySelector('#icon9');
const file10 = document.querySelector('#icon10');
const file11 = document.querySelector('#icon11');
const file12 = document.querySelector('#icon12');
const file13 = document.querySelector('#icon13');
const file14 = document.querySelector('#icon14');
const file15 = document.querySelector('#icon15');

const notifs = document.querySelector('.notifs');
const notifContainer = document.querySelector('.notifContainer');


var updatedProgress = window.innerWidth/100;
var updatedProgressHeight = window.innerHeight/100;

//scrolling behavior for SVGS 
uos(0, .1, p => (welcome.style.opacity = ((updatedProgress-(p*90)) / (updatedProgress) )));
uos(0, .1, p => (social.style.paddingBottom= (((p)) / (updatedProgress) +"%" )));

uos(0, .1, p => (stars.style.opacity = ((updatedProgress-(p*90)) / (updatedProgress) )));

// uos(0, .1, p => (social.style.opacity = ((updatedProgress-(p*90)) / (updatedProgress) )));
uos(0.3, 1, p => (downArrow.style.opacity = ((updatedProgress-(p*1000)) / (updatedProgress) )));

uos(0, .1, p => (social.style.opacity = ((updatedProgress-(p*90)) / (updatedProgress) )));
uos(0, .1, p => (social.style.paddingTop= (((p)) * (updatedProgress) +"%" )));


// uos(0.02, 0.52, p => (desk.style.width = (p * updatedProgress*20)*10+"%")); 
uos(0.02, 0.6, p => (desk.style.width = ((p*2500)+"%"))); 
uos(0.022, 0.45, p => (doorway.style.width = ((p*3000)+"%"))); 

// uos(0.03, 0.2, p => (doorway.style.width = (p * updatedProgress*20)*10+"%"));


uos(0.28, 0.4, p => (on.style.opacity =  ((p*10/updatedProgress)) ));


uos(0.32, 0.4, p => (toolbar.style.opacity =  ((p*25/updatedProgress)) ));
uos(0.32, 0.4, p => (dock.style.opacity =  ((p*20/updatedProgress)) ));
uos(0.32, 0.4, p => (wallpaper.style.opacity =  ((p*8/updatedProgress)) ));



uos(0.4, 0.42, p => (file2.style.opacity =  ((p*20/updatedProgress)) )); //baja
uos(0.4, 0.42, p => (file3.style.opacity =  ((p*20/updatedProgress)) )); //mucca
uos(0.4, 0.42, p => (file7.style.opacity =  ((p*20/updatedProgress)) )); //mucca
uos(0.4, 0.42, p => (file8.style.opacity =  ((p*20/updatedProgress)) )); //renu
uos(0.4, 0.42, p => (file15.style.opacity =  ((p*20/updatedProgress)) )); //killanilla

uos(0.4, 0.43, p => (file4.style.opacity =  ((p*20/updatedProgress)) )); //civico
uos(0.4, 0.43, p => (file5.style.opacity =  ((p*20/updatedProgress)) )); //futura
uos(0.4, 0.43, p => (file6.style.opacity =  ((p*20/updatedProgress)) )); //menu

uos(0.4, 0.43, p => (file12.style.opacity =  ((p*20/updatedProgress)) )); //symphony

uos(0.4, 0.44, p => (file10.style.opacity =  ((p*20/updatedProgress)) )); //selfport

uos(0.4, 0.45, p => (file11.style.opacity =  ((p*20/updatedProgress)) )); //summitplan
uos(0.4, 0.45, p => (file13.style.opacity =  ((p*20/updatedProgress)) )); //wordpress
uos(0.4, 0.45, p => (file14.style.opacity =  ((p*20/updatedProgress)) )); //world hashtag

uos(0.25, 0.3, p => (spinny.style.width = (100-(p*100)) +"%"));
uos(0.2, 0.25, p => (spinny.style.opacity =  ((p*50/updatedProgress)) ));

uos(0.47, 0.48, p => (notifs.style.paddingLeft= (100-(p*100)) +"%"));
uos(0.5, 0.55, p => (notifContainer.style.opacity= (100-(p*100)) +"%"));


function openFinder() {
  document.getElementById('finder').style.display = "block";
  document.getElementById('finder').style.animation = "scale-in-bottom 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
  document.getElementById('finderIcon').style.animation = "none";
  document.getElementById('desktopFileContainer').style.opacity = 0.75;
}

function closeFinder() {
  document.getElementById('finder').style.display = "none";
  document.getElementById('desktopFileContainer').style.opacity = 1;
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




window.onscroll = function() {scrollProgress()};

function scrollProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  var truncScroll = Math.trunc(scrolled);
  document.getElementById("myBar").style.width = scrolled + "%";
  document.getElementById("updatedProgress").innerHTML = truncScroll +"%";

}



function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const divs = document.querySelectorAll('.heading');
  for (let i = 0; i < divs.length; i += 1) {
    divs[i].style.height = `${window.innerHeight}px`;
  }
  render();
}

requestAnimationFrame(() => {
  window.scrollTo(0, 0);
  resize();
  header.style.opacity = 1;
});

window.addEventListener('resize', resize, false);
