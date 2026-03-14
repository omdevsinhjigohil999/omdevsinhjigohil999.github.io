const canvas = document.getElementById("bg")

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 18

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
})

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)

/* LIGHTS */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.45)
scene.add(ambientLight)

const pointLight1 = new THREE.PointLight(0x6ea8ff, 1.6, 120)
pointLight1.position.set(10, 8, 12)
scene.add(pointLight1)

const pointLight2 = new THREE.PointLight(0x8f6bff, 1.4, 120)
pointLight2.position.set(-12, -6, 10)
scene.add(pointLight2)

/* MAIN WIREFRAME OBJECT */
const heroGeometry = new THREE.IcosahedronGeometry(3.2, 1)
const heroMaterial = new THREE.MeshStandardMaterial({
    color: 0x79a8ff,
    wireframe: true,
    transparent: true,
    opacity: 0.42
})
const heroMesh = new THREE.Mesh(heroGeometry, heroMaterial)
heroMesh.position.set(5.5, 2.5, -2)
scene.add(heroMesh)

/* SECONDARY TORUS */
const torusGeometry = new THREE.TorusGeometry(5.8, 0.08, 16, 140)
const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0x9a7dff,
    transparent: true,
    opacity: 0.35
})
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.position.set(-7, -3, -8)
torus.rotation.x = 1.1
scene.add(torus)

/* FLOATING PARTICLES */
const particleCount = 900
const particleGeometry = new THREE.BufferGeometry()
const positions = new Float32Array(particleCount * 3)

for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 70
    positions[i + 1] = (Math.random() - 0.5) * 50
    positions[i + 2] = (Math.random() - 0.5) * 50
}

particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

const particleMaterial = new THREE.PointsMaterial({
    color: 0xbdd2ff,
    size: 0.08,
    transparent: true,
    opacity: 0.8
})

const particles = new THREE.Points(particleGeometry, particleMaterial)
scene.add(particles)

const mouse = {
    x: 0,
    y: 0
}

window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
})

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

function animate() {
    requestAnimationFrame(animate)

    const time = performance.now() * 0.00035

    heroMesh.rotation.x += 0.0028
    heroMesh.rotation.y += 0.0035

    torus.rotation.z += 0.002
    torus.rotation.y += 0.0016

    particles.rotation.y = time * 0.18
    particles.rotation.x = time * 0.05

    camera.position.x += ((mouse.x * 1.5) - camera.position.x) * 0.03
    camera.position.y += ((mouse.y * 1.2) - camera.position.y) * 0.03
    camera.lookAt(scene.position)

    renderer.render(scene, camera)
}

animate()