const canvas = document.getElementById("bg")

/* SCENE */

const scene = new THREE.Scene()

/* CAMERA */

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
)

camera.position.set(0, 1.5, 8)

/* RENDERER */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)


/* TEXTURES */

const loader = new THREE.TextureLoader()

const earthDay = loader.load("./textures/earth_day.jpg")
const earthNight = loader.load("./textures/earth_night.jpg")
const earthCloud = loader.load("./textures/earth_clouds.jpg")
const earthBump = loader.load("./textures/earth_bump.jpg")

const stars = loader.load("./textures/stars.jpg")

const flare0 = loader.load("https://threejs.org/examples/textures/lensflare/lensflare0.png")
const flare3 = loader.load("https://threejs.org/examples/textures/lensflare/lensflare3.png")


/* SKY */

const skyGeo = new THREE.SphereGeometry(500, 64, 64)

const skyMat = new THREE.MeshBasicMaterial({
    map: stars,
    side: THREE.BackSide
})

const sky = new THREE.Mesh(skyGeo, skyMat)
scene.add(sky)


/* LIGHT */

const sunLight = new THREE.DirectionalLight(0xffffff, 3)
scene.add(sunLight)

const ambient = new THREE.AmbientLight(0x223344, 0.3)
scene.add(ambient)


/* SUN */

const sunGeometry = new THREE.SphereGeometry(3, 32, 32)

const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffdd88
})

const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)


/* SUN GLOW */

const glowGeometry = new THREE.PlaneGeometry(20, 20)

const glowMaterial = new THREE.MeshBasicMaterial({
    map: flare0,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
})

const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial)
scene.add(sunGlow)


/* LENS FLARE */

const flareGroup = new THREE.Group()

function addFlare(texture, size, dist) {

    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    })

    const sprite = new THREE.Sprite(material)

    sprite.scale.set(size, size, 1)
    sprite.userData.dist = dist

    flareGroup.add(sprite)

}

addFlare(flare0, 10, 0)
addFlare(flare3, 4, 0.3)
addFlare(flare3, 2, 0.6)
addFlare(flare3, 1.5, 1)

scene.add(flareGroup)


/* EARTH */

const earthGroup = new THREE.Group()
scene.add(earthGroup)

const earthGeometry = new THREE.SphereGeometry(2, 128, 128)

const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthDay,
    bumpMap: earthBump,
    bumpScale: 0.05,
    roughness: 1
})

const earth = new THREE.Mesh(earthGeometry, earthMaterial)
earthGroup.add(earth)


/* NIGHT LIGHTS */

const nightMaterial = new THREE.MeshBasicMaterial({
    map: earthNight,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
})

const night = new THREE.Mesh(
    new THREE.SphereGeometry(2.01, 128, 128),
    nightMaterial
)

earthGroup.add(night)


/* CLOUDS */

const cloudMaterial = new THREE.MeshStandardMaterial({
    map: earthCloud,
    transparent: true,
    opacity: 0.35,
    depthWrite: false
})

const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(2.05, 128, 128),
    cloudMaterial
)

earthGroup.add(clouds)


/* ATMOSPHERE */

const atmosphereMaterial = new THREE.ShaderMaterial({

    side: THREE.BackSide,
    transparent: true,
    blending: THREE.AdditiveBlending,

    vertexShader: `
varying vec3 vNormal;

void main(){

vNormal = normalize(normalMatrix * normal);

gl_Position =
projectionMatrix *
modelViewMatrix *
vec4(position,1.0);

}
`,

    fragmentShader: `
varying vec3 vNormal;

void main(){

float intensity =
pow(0.8 - dot(vNormal,vec3(0,0,1.0)),4.0);

gl_FragColor =
vec4(0.3,0.6,1.0,1.0) * intensity;

}
`

})

const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 128, 128),
    atmosphereMaterial
)

earthGroup.add(atmosphere)


/* SUN MOVEMENT */

let sunAngle = -Math.PI / 3


/* MOUSE */

const mouse = { x: 0, y: 0 }

window.addEventListener("mousemove", (event) => {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

})


/* RESIZE */

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)

})


/* ANIMATION */

function animate() {

    requestAnimationFrame(animate)

    /* EARTH ROTATION */

    earth.rotation.y += 0.0012
    clouds.rotation.y += 0.0015
    night.rotation.y += 0.0012

    sky.rotation.y += 0.00003


    /* SUNRISE MOTION */

    sunAngle += 0.002

    const radius = 30

    const x = Math.cos(sunAngle) * radius
    const y = Math.sin(sunAngle) * radius
    const z = -10

    sun.position.set(x, y, z)
    sunLight.position.copy(sun.position)

    sunGlow.position.copy(sun.position)
    sunGlow.lookAt(camera.position)


    /* FLARE FOLLOW SUN */

    flareGroup.position.copy(sun.position)

    flareGroup.children.forEach(f => {

        f.position.set(
            sun.position.x * f.userData.dist,
            sun.position.y * f.userData.dist,
            sun.position.z * f.userData.dist
        )

    })


    /* CAMERA PARALLAX */

    camera.position.x += ((mouse.x * 1.2) - camera.position.x) * 0.02
    camera.position.y += (((mouse.y * 0.7) + 1.5) - camera.position.y) * 0.02

    camera.lookAt(0, 0, 0)

    renderer.render(scene, camera)

}

animate()

