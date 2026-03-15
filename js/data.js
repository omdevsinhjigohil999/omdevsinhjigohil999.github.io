/* ================================
SKILL ENUM
================================ */

const Skill = {
    UNITY: "Unity",
    CSHARP: "C#",
    REST_APIS: "REST APIs",
    DELEGATES: "Delegates",
    SOCKET_IO: "Socket.io",
    FMOD: "FMOD",
    METAVERSE: "Metaverse",
    AR_VR: "AR / VR",
    OCCLUSION: "Occlusion",
    UNITY_UI: "Unity UI Design",
    UNITY_PHYSICS: "Unity Physics",
    PHYSICS_SIM: "Physics Simulation",
    UNITY_CLOUD_CODE: "Unity Cloud Code",
    UNITY_CLOUD_SERVICES: "Unity Cloud Services",
    UNITY_AUTH: "Unity Authentication",
    UNITY_ECONOMY: "Unity Economy",
    GAME_CENTER_LOGIN: "Game Center Login",
    GOOGLE_PLAY_LOGIN: "Google Play Games Login",
    MULTIPLAYER: "Multiplayer Basics",
    PUN: "PUN",
    PUN2: "PUN2",
    PHOTON_FUSION: "Photon Fusion",
    NETCODE_GAMEOBJECTS: "Netcode for GameObjects",
    NETCODE_ENTITIES: "Netcode for Entities",
    ECS: "ECS",
    OPTIMIZATION: "Optimization",

    GOOGLE_ADS: "Google Mobile Ads",
    ADDRESSABLES: "Addressables",
    FIREBASE: "Firebase",
    FIREBASE_DB: "Firebase Database",
    PARTICLE_SYSTEM: "Particle System",
    SCRIPTABLE_OBJECT: "Scriptable Object",
    PROCEDURAL_GEN: "Procedural Generation",
    BAKERY: "Bakery GPU Lightmapper",
    ARCORE: "ARCore",
    TOOLING: "Tooling",
    OPEN_CV: "OpenCV",
    WEBGL: "WebGL"
}

/* ================================
PORTFOLIO DATA
================================ */

const portfolio = {

    hero: {
        name: "Hariomsinh Gohil",
        role: "Unity Game Developer • Multiplayer • AR/VR",
        linkedin: "https://www.linkedin.com/in/hariomsinhgohil/",
        image: "assets/profile.jpg"
    },

    about: {
        description: `I’m a passionate Unity game developer focused on building polished gameplay systems, real-time multiplayer experiences, and immersive AR/VR applications.`
    },

    skills: [
        Skill.UNITY,
        Skill.CSHARP,
        Skill.REST_APIS,
        Skill.DELEGATES,
        Skill.SOCKET_IO,
        Skill.FMOD,
        Skill.METAVERSE,
        Skill.AR_VR,
        Skill.OCCLUSION,
        Skill.UNITY_UI,
        Skill.UNITY_PHYSICS,
        Skill.PHYSICS_SIM,
        Skill.UNITY_CLOUD_CODE,
        Skill.UNITY_CLOUD_SERVICES,
        Skill.UNITY_AUTH,
        Skill.UNITY_ECONOMY,
        Skill.GAME_CENTER_LOGIN,
        Skill.GOOGLE_PLAY_LOGIN,
        Skill.MULTIPLAYER,
        Skill.PUN,
        Skill.PUN2,
        Skill.PHOTON_FUSION,
        Skill.NETCODE_GAMEOBJECTS,
        Skill.NETCODE_ENTITIES,
        Skill.ECS,
        Skill.OPTIMIZATION
    ],

    experience: [
        {
            company: "300Mind",
            logo: "300mind",
            role: "Unity Game Developer",
            start: "Apr 2025",
            end: "Present",
            location: "Ahmedabad, India",
            description: "Working on multiplayer gameplay using Netcode for Entities and ECS architecture."
        },
        {
            company: "StreakByte",
            logo: "streakbyte",
            role: "Unity Game & AR/VR Developer",
            start: "Feb 2020",
            end: "Apr 2025",
            location: "Bhavnagar, India",
            description: "Built hyper-casual games, AR/VR experiences, and multiple client Unity projects."
        }
    ],

    projects: [

        {
            name: "ONE MAP: Battle Royale Online",
            logo: "onemap",
            role: "Gameplay Developer, UI Designer",
            description: "Real-time multiplayer battle royale built with ECS networking.",
            technologies: [
                Skill.UNITY,
                Skill.NETCODE_ENTITIES,
                Skill.ECS,
                Skill.UNITY_CLOUD_SERVICES,
                Skill.UNITY_CLOUD_CODE,
                Skill.UNITY_AUTH,
                Skill.UNITY_ECONOMY
            ],
            platforms: {}
        },

        {
            name: "Hurricane.io",
            logo: "hurracain.io",
            role: "Gameplay Developer",
            description: "Online action-strategy hurricane growth game.",
            technologies: [
                Skill.UNITY,
                Skill.GOOGLE_ADS,
                Skill.PUN2
            ],
            platforms: {}
        },

        {
            name: "TheCryptoRace",
            logo: "thecryptorace",
            role: "Gameplay Developer",
            description: "Procedural multiplayer racing experience.",
            technologies: [
                Skill.UNITY,
                Skill.PHOTON_FUSION,
                Skill.PROCEDURAL_GEN
            ],
            platforms: {}
        },

        {
            name: "SoyGame",
            logo: "ussoy",
            role: "Gameplay Developer",
            description: "Farming simulation with progression and upgrades.",
            technologies: [
                Skill.UNITY,
                Skill.ADDRESSABLES,
                Skill.FIREBASE,
                Skill.FIREBASE_DB
            ],
            platforms: {}
        }

    ],

    contact: {
        email: "omdevsinhjigohil999@gmail.com",
        phone: "+91 99139 53003"
    }
}