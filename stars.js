import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


// Initialize Three.js variables
let scene, camera, renderer;
let starsGeometry; // Bu değişken, stars geometrisini tutacak


// Function to create the star field
function createStarField() {
  const starCount = 10000;

  const positions = new Float32Array(starCount * 3); // Three coordinates (x, y, z) for each star

  for (let i = 0; i < starCount; i++) {
    const index = i * 3;
    positions[index] = (Math.random() - 0.5) * 1000;
    positions[index + 1] = (Math.random() - 0.5) * 1000; 
    positions[index + 2] = Math.random() * 1000;
    positions[index + 3] = (Math.random() + 0.5) * 2000;

  }

  starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));


  const renk = THREE.MathUtils.randInt(0, 0xffffff)
	const starMaterial = new THREE.PointsMaterial({ color: renk  });

  const starField = new THREE.Points(starsGeometry, starMaterial);


  const geometry = new THREE.SphereGeometry( 5,64,32 ); 
  const material = new THREE.MeshBasicMaterial( { color: renk } ); 
  const sphere = new THREE.Mesh( geometry, material );
  
  scene.add( sphere );
  scene.add(starField);
}



// Function to animate the stars
function animateStars() {
  const positions = starsGeometry.attributes.position.array;

  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 2] -= 1;

    if (positions[i + 2] < -200) {
      positions[i + 2] = 1000;
    }
  }

  starsGeometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(animateStars);
}



// Function to set up the Three.js scene
function init() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(125, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 80;
  
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
  
	createStarField();
	animateStars();

  }
  
  // Run the initialization function when the window loads
  window.addEventListener('load', init);

  

