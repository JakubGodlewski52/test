let scene, camera, renderer, controls;

init();
animate(); 

function init() {
 
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xACACFF);

   
    camera = new THREE.PerspectiveCamera(75, 1000 / 500, 0.1, 1000);
    camera.position.set(0, 0, 10);

   
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(1000, 500);
    document.getElementById('container3d').appendChild(renderer.domElement);

  
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

   
    const light = new THREE.AmbientLight(0x404040); 
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
    scene.add(directionalLight);

   
    const loader = new THREE.GLTFLoader();
    loader.load('model/1.gltf', function(gltf) {
        scene.add(gltf.scene);
    }, undefined, function(error) {
        console.error(error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}

window.addEventListener('resize', function() {
    const container = document.getElementById('container3d');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
