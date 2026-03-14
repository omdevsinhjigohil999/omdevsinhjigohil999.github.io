const canvas = document.getElementById("bg")

/* SCENE */

const scene = new THREE.Scene()

/* CAMERA */

const camera = new THREE.PerspectiveCamera(
45,
window.innerWidth/window.innerHeight,
0.1,
2000
)

camera.position.set(0,1.5,8)

/* RENDERER */

const renderer = new THREE.WebGLRenderer({
canvas,
antialias:true,
alpha:true
})

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.setSize(window.innerWidth,window.innerHeight)


/* TEXTURES */

const loader = new THREE.TextureLoader()

const earthDay = loader.load("./textures/earth_day.jpg")
const earthNight = loader.load("./textures/earth_night.jpg")
const earthCloud = loader.load("./textures/earth_clouds.jpg")
const earthBump = loader.load("./textures/earth_bump.jpg")

const milkyWay = loader.load("./textures/stars.jpg")

const flare0 = loader.load("https://threejs.org/examples/textures/lensflare/lensflare0.png")
const flare3 = loader.load("https://threejs.org/examples/textures/lensflare/lensflare3.png")


/* MILKY WAY SKY */

const skyGeo = new THREE.SphereGeometry(500,64,64)

const skyMat = new THREE.MeshBasicMaterial({
map:milkyWay,
side:THREE.BackSide
})

const sky = new THREE.Mesh(skyGeo,skyMat)
scene.add(sky)


/* LIGHTING (SUN) */

const sunLight = new THREE.DirectionalLight(0xffffff,3)
sunLight.position.set(10,2,5)
scene.add(sunLight)

const ambient = new THREE.AmbientLight(0x223344,0.25)
scene.add(ambient)


/* SUN LENS FLARE */

const flareGroup = new THREE.Group()

const spriteMat = new THREE.SpriteMaterial({
map:flare0,
transparent:true,
blending:THREE.AdditiveBlending
})

const sprite = new THREE.Sprite(spriteMat)
sprite.scale.set(4,4,1)

flareGroup.add(sprite)

flareGroup.position.copy(sunLight.position).multiplyScalar(20)

scene.add(flareGroup)


/* EARTH */

const earthGroup = new THREE.Group()
scene.add(earthGroup)

const earthGeo = new THREE.SphereGeometry(2,128,128)

const earthMat = new THREE.MeshStandardMaterial({
map:earthDay,
bumpMap:earthBump,
bumpScale:0.05,
roughness:1
})

const earth = new THREE.Mesh(earthGeo,earthMat)
earthGroup.add(earth)


/* NIGHT LIGHTS */

const nightMat = new THREE.MeshBasicMaterial({
map:earthNight,
transparent:true,
opacity:0.6,
blending:THREE.AdditiveBlending
})

const night = new THREE.Mesh(
new THREE.SphereGeometry(2.01,128,128),
nightMat
)

earthGroup.add(night)


/* CLOUDS */

const cloudMat = new THREE.MeshStandardMaterial({
map:earthCloud,
transparent:true,
opacity:0.35,
depthWrite:false
})

const clouds = new THREE.Mesh(
new THREE.SphereGeometry(2.05,128,128),
cloudMat
)

earthGroup.add(clouds)


/* ATMOSPHERE SCATTERING */

const atmosphereMat = new THREE.ShaderMaterial({
side:THREE.BackSide,
transparent:true,
blending:THREE.AdditiveBlending,

vertexShader:`

varying vec3 vNormal;

void main(){

vNormal = normalize(normalMatrix * normal);

gl_Position = projectionMatrix *
modelViewMatrix *
vec4(position,1.0);

}

`,

fragmentShader:`

varying vec3 vNormal;

void main(){

float intensity =
pow(0.8 - dot(vNormal,vec3(0,0,1.0)),4.0);

gl_FragColor = vec4(0.3,0.6,1.0,1.0) * intensity;

}

`
})

const atmosphere = new THREE.Mesh(
new THREE.SphereGeometry(2.2,128,128),
atmosphereMat
)

earthGroup.add(atmosphere)


/* METEOR SYSTEM */

const meteors = []
const meteorGroup = new THREE.Group()
scene.add(meteorGroup)

function createMeteor(){

const geo = new THREE.CylinderGeometry(0.02,0.02,1,6)

const mat = new THREE.MeshBasicMaterial({
color:0xffffff
})

const meteor = new THREE.Mesh(geo,mat)

meteor.rotation.z = Math.PI/2

meteor.position.set(
Math.random()*80-40,
Math.random()*40+10,
Math.random()*80-40
)

meteorGroup.add(meteor)

meteors.push({
mesh:meteor,
vel:new THREE.Vector3(-0.6,-0.3,0),
life:0
})

}


/* MOUSE */

const mouse={x:0,y:0}

window.addEventListener("mousemove",(e)=>{

mouse.x = (e.clientX/window.innerWidth)*2 -1
mouse.y = -(e.clientY/window.innerHeight)*2 +1

})


/* RESIZE */

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})


/* ANIMATE */

function animate(){

requestAnimationFrame(animate)

earth.rotation.y += 0.0012
clouds.rotation.y += 0.0015
night.rotation.y += 0.0012

sky.rotation.y += 0.00003


/* METEOR SPAWN */

if(Math.random()<0.015){
createMeteor()
}


/* METEOR UPDATE */

for(let i=meteors.length-1;i>=0;i--){

const m = meteors[i]

m.mesh.position.add(m.vel)

m.life++

if(m.life>100){

meteorGroup.remove(m.mesh)
meteors.splice(i,1)

}

}


/* CAMERA ORBIT FEEL */

camera.position.x += ((mouse.x*1.2)-camera.position.x)*0.02
camera.position.y += (((mouse.y*0.7)+1.5)-camera.position.y)*0.02

camera.lookAt(0,0,0)

renderer.render(scene,camera)

}

animate()