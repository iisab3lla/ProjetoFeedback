const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 1, 3, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(150, 150);  // Tamanho da esfera
renderer.setClearColor(0x000000, 0);  // Fundo transparente
document.getElementById('sphere-container').appendChild(renderer.domElement);

// Shader personalizado para gradiente linear
const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;
    void main() {
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
`;

const uniforms = {
    color1: { type: 'vec3', value: new THREE.Color(0x83dff1) },
    color2: { type: 'vec3', value: new THREE.Color(0xec85da3) }
};

const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});

// Criação da esfera
const geometry = new THREE.SphereGeometry(1.3, 32, 32);
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const iconCanvas = document.createElement('canvas');
iconCanvas.width = 256;
iconCanvas.height = 256;
const iconContext = iconCanvas.getContext('2d');

iconContext.font = '200px "Arial"';  
iconContext.fillStyle = '#000000';
iconContext.textAlign = 'center';
iconContext.textBaseline = 'middle';
iconContext.fillText('+', 188, 188);

// Criando uma textura a partir do canvas
const iconTexture = new THREE.CanvasTexture(iconCanvas);
const iconMaterial = new THREE.SpriteMaterial({ map: iconTexture });
const iconSprite = new THREE.Sprite(iconMaterial);
iconSprite.scale.set(2, 2, 0); 

iconSprite.position.set(1, 0, 1.5);
sphere.add(iconSprite);

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.05;
    sphere.rotation.y += 0.05;
    renderer.render(scene, camera);
}

animate();
