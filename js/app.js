document.addEventListener("DOMContentLoaded", () => {
    renderHero()
    renderAbout()
    renderStats()
    renderSkills()
    renderExperience()
    renderProjects()
    setupVideoModal()
    setupCopyButtons()
})

const COMPANY_LOGO_PATH = "assets/companies/"
const PROJECT_LOGO_PATH = "assets/projects/"
const VIDEO_PATH = "assets/videos/"

function safeText(value, fallback = "") {
    return value ? value : fallback
}

function calculateTotalExperienceYears(experience) {
    if (!experience || !experience.length) return 0
    let totalMonths = 0

    experience.forEach(job => {
        const startDate = new Date(job.start)
        const endDate = job.end === "Present" ? new Date() : new Date(job.end)

        if (!isNaN(startDate) && !isNaN(endDate)) {
            const months =
                (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                (endDate.getMonth() - startDate.getMonth())
            totalMonths += Math.max(months, 0)
        }
    })
    return Math.max(1, Math.floor(totalMonths / 12))
}

function calculateDuration(start, end) {
    const startDate = new Date(start)
    const endDate = end === "Present" ? new Date() : new Date(end)

    if (isNaN(startDate) || isNaN(endDate)) return ""

    const months =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth())

    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    let text = ""
    if (years > 0) text += `${years} yr${years > 1 ? "s" : ""} `
    if (remainingMonths > 0) text += `${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`

    return text.trim()
}

function renderHero() {
    const hero = portfolio.hero || {}
    const firstExperience = portfolio.experience?.[0]

    document.getElementById("hero-name").textContent = safeText(hero.name, "Your Name")
    document.getElementById("hero-role").textContent = safeText(hero.role, "Creative Developer")
    document.getElementById("hero-linkedin").href = safeText(hero.linkedin, "#")
    document.getElementById("hero-location").textContent = safeText(firstExperience?.location, "India")
    document.getElementById("hero-company").textContent = firstExperience
        ? `Currently at ${firstExperience.company}`
        : "Available for exciting projects"

    const profileImg = document.getElementById("profile-img")
    profileImg.src = hero.image || "assets/profile.jpg"
}

function renderAbout() {
    document.getElementById("about-text").textContent = portfolio.about?.description || ""

    const highlightsContainer = document.getElementById("hero-highlights")
    const highlightItems = [
        "Unity Expert",
        "Multiplayer Systems",
        "AR/VR Development",
        "Gameplay Programming",
        "Production-Ready Builds"
    ]

    highlightsContainer.innerHTML = highlightItems
        .map(item => `<span class="highlight-chip">${item}</span>`)
        .join("")
}

function renderStats() {
    document.getElementById("stat-experience").textContent =
        `${calculateTotalExperienceYears(portfolio.experience)}+`

    document.getElementById("stat-projects").textContent = portfolio.projects?.length || 0
    document.getElementById("stat-skills").textContent = portfolio.skills?.length || 0

    // Email Rendering
    const email = portfolio.contact?.email || ""
    const emailLink = document.getElementById("contact-email")
    const emailText = document.getElementById("contact-email-text")
    emailText.textContent = email
    emailLink.href = email ? `mailto:${email}` : "#"

    // Phone Rendering
    const phone = portfolio.contact?.phone || ""
    const phoneText = document.getElementById("contact-phone-text")
    phoneText.textContent = phone
}

function setupCopyButtons() {
    const emailBtn = document.getElementById("copy-email-btn")
    const phoneBtn = document.getElementById("copy-phone-btn")

    emailBtn.addEventListener("click", () => {
        copyToClipboard(portfolio.contact.email, "Email copied!")
    })

    phoneBtn.addEventListener("click", () => {
        copyToClipboard(portfolio.contact.phone, "Phone number copied!")
    })
}

function copyToClipboard(text, message) {
    if (!text) return
    navigator.clipboard.writeText(text).then(() => {
        showToast(message)
    })
}

function showToast(message) {
    const toast = document.getElementById("toast")
    toast.textContent = message
    toast.classList.add("show")

    setTimeout(() => {
        toast.classList.remove("show")
    }, 2500)
}

function renderSkills() {
    const container = document.getElementById("skills-container")
    container.innerHTML = ""

        ; (portfolio.skills || []).forEach(skill => {
            const div = document.createElement("div")
            div.className = "skill"
            div.textContent = skill
            container.appendChild(div)
        })
}

function renderExperience() {
    const container = document.getElementById("timeline")
    container.innerHTML = ""

        ; (portfolio.experience || []).forEach(job => {
            const item = document.createElement("article")
            item.className = "timeline-item"

            const duration = calculateDuration(job.start, job.end)
            const logoHTML = job.logo
                ? `<img src="${COMPANY_LOGO_PATH + job.logo}.jpg" alt="${job.company} logo" class="company-logo">`
                : `<div class="company-logo" style="background:#38434f;"></div>`

            item.innerHTML = `
            ${logoHTML}
            <div class="job-info">
                <h3>${job.role}</h3>
                <p class="meta-line"><strong>${job.company}</strong>${duration ? ` • ${duration}` : ""}</p>
                <p class="meta-line">${job.start} — ${job.end} • ${job.location}</p>
                <p class="job-description">${job.description}</p>
            </div>
        `
            container.appendChild(item)
        })
}

function getPlatformLinks(platforms = {}) {
    const items = []
    if (platforms.android) items.push(`<a class="project-action" href="${platforms.android}" target="_blank"><i class="fab fa-google-play"></i> Android</a>`)
    if (platforms.ios) items.push(`<a class="project-action" href="${platforms.ios}" target="_blank"><i class="fab fa-apple"></i> iOS</a>`)
    if (platforms.steam) items.push(`<a class="project-action" href="${platforms.steam}" target="_blank"><i class="fab fa-steam"></i> Steam</a>`)
    if (platforms.mac) items.push(`<a class="project-action" href="${platforms.mac}" target="_blank"><i class="fa-solid fa-laptop"></i> Mac</a>`)
    if (platforms.epic) items.push(`<a class="project-action" href="${platforms.epic}" target="_blank"><i class="fa-solid fa-gamepad"></i> Epic</a>`)
    return items.join("")
}

function renderProjects() {
    const container = document.getElementById("projects-grid")
    container.innerHTML = ""

        ; (portfolio.projects || []).forEach(project => {
            const card = document.createElement("article")
            card.className = "project-card"

            const logoHTML = project.logo
                ? `<img src="${PROJECT_LOGO_PATH + project.logo}.png" alt="${project.name} logo" class="project-logo">`
                : `<div class="project-logo" style="background:#38434f;"></div>`

            const techStack = (project.technologies || [])
                .map(tech => `<span class="tech">${tech}</span>`)
                .join("")

            let actionsHTML = getPlatformLinks(project.platforms)

            if (project.video) {
                actionsHTML = `
            <button class="project-action play-video-btn" data-video="${VIDEO_PATH + project.video}.mp4">
                <i class="fa-solid fa-circle-play"></i> Watch Demo
            </button>
            ` + actionsHTML
            }

            card.innerHTML = `
            ${logoHTML}
            <div class="project-info">
                <h3>${project.name}</h3>
                <p class="project-role">${project.role}</p>
                <p class="project-description">${project.description}</p>

                <div class="tech-stack">
                    ${techStack}
                </div>

                <div class="project-actions">
                    ${actionsHTML}
                </div>
            </div>
        `
            container.appendChild(card)
        })

    bindVideoButtons()
}

function bindVideoButtons() {
    document.querySelectorAll(".play-video-btn").forEach(button => {
        button.addEventListener("click", () => {
            const videoSrc = button.getAttribute("data-video")
            openVideo(videoSrc)
        })
    })
}

function setupVideoModal() {
    const modal = document.getElementById("video-modal")
    const closeBtn = document.getElementById("close-video-btn")
    closeBtn.addEventListener("click", closeVideo)
    modal.addEventListener("click", (e) => { if (e.target === modal) closeVideo() })
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeVideo() })
}

function openVideo(videoSrc) {
    const modal = document.getElementById("video-modal")
    const video = document.getElementById("modal-video")
    if (!videoSrc) return
    video.src = videoSrc
    modal.classList.add("active")
    video.play().catch(() => { })
}

function closeVideo() {
    const modal = document.getElementById("video-modal")
    const video = document.getElementById("modal-video")
    video.pause()
    video.currentTime = 0
    video.src = ""
    modal.classList.remove("active")
}