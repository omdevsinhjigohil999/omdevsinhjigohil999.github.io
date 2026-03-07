document.addEventListener("DOMContentLoaded", () => {

    renderHero()
    renderAbout()
    renderSkills()
    renderExperience()
    renderProjects()
    renderContact()

    window.addEventListener("scroll", animateTimeline)

})


function renderHero() {
    document.getElementById("hero-name").textContent = portfolio.hero.name
    document.getElementById("hero-role").textContent = portfolio.hero.role
}


function renderAbout() {
    document.getElementById("about-text").textContent = portfolio.about.description
}


function renderSkills() {

    const container = document.getElementById("skills-container")

    portfolio.skills.forEach(skill => {

        const div = document.createElement("div")
        div.className = "skill"
        div.textContent = skill

        container.appendChild(div)

    })

}
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

        const item = document.createElement("div")
        item.className = "timeline-item"

        item.innerHTML = `

<div class="timeline-card">

<img src="${job.logo}" class="company-logo">

<div class="job-info">

<h3>${job.role}</h3>
<p>${job.company}</p>
<p>${job.start} - ${job.end}</p>
<p>${job.location}</p>
<p>${job.description}</p>

</div>

</div>
`

        container.appendChild(item)

    })

}


function renderProjects() {

    const container = document.getElementById("project-timeline")

    portfolio.projects.forEach(project => {

        const item = document.createElement("div")
        item.className = "timeline-item"

        item.innerHTML = `

<div class="timeline-card">

<img src="${project.logo}" class="project-logo">

<div class="job-info">

<h3>${project.name}</h3>
<p class="project-role">${project.role}</p>

<p>${project.description}</p>

<div class="tech-stack">
${project.technologies.map(t => `<span class="tech">${t}</span>`).join("")}
</div>

<a href="${project.link}" target="_blank" class="project-link">
Open Project ↗
</a>

</div>

</div>

`

        container.appendChild(item)

    })

}


function renderCompanyProjects() {

    const container = document.getElementById("company-projects")

    portfolio.companyProjects.forEach(company => {

        const block = document.createElement("div")

        block.className = "company-block"

        block.innerHTML = `

<div class="company-header">

<img src="${company.logo}">

<h3>${company.name}</h3>

</div>

<div class="company-project-grid">

${company.projects.map(p => `

<div class="company-project-card">

<h4>${p.name}</h4>
<p>${p.description}</p>

</div>

`).join("")}

</div>

`

        container.appendChild(block)

    })

}


function renderContact() {
    document.getElementById("contact-email").textContent = portfolio.contact.email
}


function animateTimeline() {

    const items = document.querySelectorAll(".timeline-item")

    items.forEach(el => {

        const rect = el.getBoundingClientRect()

        if (rect.top < window.innerHeight - 100) {
            el.classList.add("show")
        }

    })

}
function renderExperience() {

    const container = document.getElementById("timeline")

    portfolio.experience.forEach(job => {

        const duration = calculateDuration(job.start, job.end)

        const item = document.createElement("div")
        item.className = "timeline-item"

        item.innerHTML = `

<div class="timeline-card">

<img src="${job.logo}" class="company-logo">

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