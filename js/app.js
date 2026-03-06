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
    document.getElementById("hero-name").textContent =
        portfolio.hero.name

    document.getElementById("hero-role").textContent =
        portfolio.hero.role
}

function renderAbout() {
    document.getElementById("about-text").textContent =
        portfolio.about.description
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

    const container = document.getElementById("project-track")

    let projects = [...portfolio.projects, ...portfolio.projects]

    projects.forEach(project => {

        const card = document.createElement("div")

        card.className = "project-card"

        card.innerHTML = `

<h3>${project.name}</h3>

<p>${project.description}</p>

<a href="${project.link}" target="_blank">
View Project →
</a>

`

        container.appendChild(card)

    })

}



function renderContact() {
    document.getElementById("contact-email").textContent =
        portfolio.contact.email
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