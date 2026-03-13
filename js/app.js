document.addEventListener("DOMContentLoaded", () => {

    renderHero()
    renderAbout()
    renderSkills()
    renderExperience()
    renderProjects()
    renderContact()

    window.addEventListener("scroll", animateTimeline)

})

/* ===============================
   CENTRALIZED ASSET PATHS
================================ */

const COMPANY_LOGO_PATH = "assets/companies/"
const PROJECT_LOGO_PATH = "assets/projects/"
const VIDEO_PATH = "assets/videos/"

/* ===============================
   HERO
================================ */

function renderHero() {
    document.getElementById("hero-name").textContent = portfolio.hero.name
    document.getElementById("hero-role").textContent = portfolio.hero.role
}

/* ===============================
   ABOUT
================================ */

function renderAbout() {
    document.getElementById("about-text").textContent = portfolio.about.description
}

/* ===============================
   SKILLS
================================ */

function renderSkills() {

    const container = document.getElementById("skills-container")

    portfolio.skills.forEach(skill => {

        const div = document.createElement("div")
        div.className = "skill"
        div.textContent = skill

        container.appendChild(div)

    })

}

/* ===============================
   EXPERIENCE
================================ */

function calculateDuration(start, end) {

    const startDate = new Date(start)
    const endDate = end === "Present" ? new Date() : new Date(end)

    let months =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth())

    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    let text = ""

    if (years > 0) text += `${years} yr${years > 1 ? "s" : ""} `
    if (remainingMonths > 0) text += `${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`

    return text.trim()
}

function renderExperience() {

    const container = document.getElementById("timeline")

    portfolio.experience.forEach(job => {

        const duration = calculateDuration(job.start, job.end)

        const item = document.createElement("div")
        item.className = "timeline-item"

        let logoHTML = ""

        if (job.logo) {
            logoHTML = `<img src="${COMPANY_LOGO_PATH + job.logo}.jpg" class="company-logo">`
        }

        item.innerHTML = `

        <div class="timeline-card">

        ${logoHTML}

        <div class="job-info">

        <h3>${job.role}</h3>
        <p><strong>${job.company} (${duration})</strong></p>
        <p>${job.start} - ${job.end}</p>
        <p>${job.location}</p>
        <p>${job.description}</p>

        </div>

        </div>
        `

        container.appendChild(item)

    })

}

/* ===============================
   PROJECTS
================================ */

function renderProjects() {

    const container = document.getElementById("project-timeline")

    portfolio.projects.forEach(project => {

        const techStack = project.technologies
            .map(t => `<span class="tech">${t}</span>`)
            .join("")

        let logoHTML = ""

        if (project.logo) {
            logoHTML = `
            <img src="${PROJECT_LOGO_PATH + project.logo}.png" class="project-logo">
            `
        }

        /* VIDEO BUTTON */

        let actionHTML = ""

        if (project.video) {

            actionHTML = `
            <button class="play-video-btn" onclick="openVideo('${VIDEO_PATH + project.video}.mp4')">
                ▶ Play Video
            </button>
            `

        } else if (project.platforms) {

            if (project.platforms.android)
                actionHTML += `<a href="${project.platforms.android}" target="_blank"><i class="fab fa-android"></i></a>`

            if (project.platforms.ios)
                actionHTML += `<a href="${project.platforms.ios}" target="_blank"><i class="fab fa-apple"></i></a>`

            if (project.platforms.steam)
                actionHTML += `<a href="${project.platforms.steam}" target="_blank"><i class="fab fa-steam"></i></a>`

            if (project.platforms.mac)
                actionHTML += `<a href="${project.platforms.mac}" target="_blank"><i class="fab fa-apple"></i></a>`

            if (project.platforms.epic)
                actionHTML += `<a href="${project.platforms.epic}" target="_blank"><i class="fas fa-gamepad"></i></a>`
        }

        const card = document.createElement("div")
        card.className = "timeline-item"

        card.innerHTML = `

        <div class="timeline-card project-card">

        ${logoHTML}

        <div class="project-info">

        <h3>${project.name}</h3>

        <p class="project-role">${project.role}</p>

        <p>${project.description}</p>

        <div class="tech-stack">
        ${techStack}
        </div>

        <div class="platform-icons">
        ${actionHTML}
        </div>

        </div>

        </div>
        `

        container.appendChild(card)

    })

}
function openVideo(videoSrc) {

    const modal = document.getElementById("video-modal")
    const video = document.getElementById("modal-video")

    video.src = videoSrc
    modal.style.display = "flex"

    video.play()

}

function closeVideo() {

    const modal = document.getElementById("video-modal")
    const video = document.getElementById("modal-video")

    video.pause()
    video.src = ""

    modal.style.display = "none"

} function openVideo(videoSrc) {

    const modal = document.getElementById("video-modal")
    const video = document.getElementById("modal-video")

    video.src = videoSrc
    modal.style.display = "flex"

    video.currentTime = 0
    video.play()
}

function closeVideo() {

    const modal = document.getElementById("video-modal")
    const video = document.getElementById("modal-video")

    video.pause()
    video.currentTime = 0
    video.src = ""

    modal.style.display = "none"
}

/* CLOSE WHEN CLICK OUTSIDE VIDEO */

document.getElementById("video-modal").addEventListener("click", function (e) {

    if (e.target.id === "video-modal") {
        closeVideo()
    }

})
/* ===============================
   CONTACT
================================ */

function renderContact() {
    document.getElementById("contact-email").textContent = portfolio.contact.email
}

/* ===============================
   TIMELINE ANIMATION
================================ */

function animateTimeline() {

    const items = document.querySelectorAll(".timeline-item")

    items.forEach(el => {

        const rect = el.getBoundingClientRect()

        if (rect.top < window.innerHeight - 100) {
            el.classList.add("show")
        }

    })

}