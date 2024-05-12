let scene, camera, renderer, controls;

init(); // Initialize scene, camera, renderer, and controls
animate(); // Rendering loop

function init() {
    // Create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    // Add a camera
    camera = new THREE.PerspectiveCamera(75, 1000 / 500, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // Create renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(1000, 500);
    document.getElementById('container3d').appendChild(renderer.domElement);

    // Camera controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    // Lighting
    const light = new THREE.AmbientLight(0x404040); // Ambient light
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
    scene.add(directionalLight);

    // GLTF model loader
    const loader = new THREE.GLTFLoader();
    loader.load('model/1.gltf', function(gltf) {
        scene.add(gltf.scene);
    }, undefined, function(error) {
        console.error(error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Necessary if controls are damping
    renderer.render(scene, camera);
}

window.addEventListener('resize', function() {
    const container = document.getElementById('container3d');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});