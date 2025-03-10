console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

const navLinks = $$("nav a");
const ARE_WE_HOME = document.documentElement.classList.contains('home');

let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
);

currentLink?.classList.add('current');

let pages = [
    { url: "/portfolio/index.html", title: 'home' },
    { url: "/portfolio/contact", title: 'contact' },
    { url: "/portfolio/projects", title: 'projects' },
    { url: "/portfolio/resume/index.html", title: 'resume'},
    { url: "/portfolio/meta/index.html", title: 'meta'},
    { url: "https://github.com/RitvikMohindru", title: 'github'}
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);
    
    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
    }
    if (a.host !== location.host) {
        a.target = "_blank";
    }
}

document.body.insertAdjacentHTML(
  'afterbegin',`
    <label class="color-scheme">
        Theme:
        <select>
            <option value="light dark">automatic</option>
            <option value="light">light</option>
            <option value="dark">dark</option>
        </select>
    </label>
    `
);

const select = document.querySelector('.color-scheme select');

select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value;
});

if ("colorScheme" in localStorage) {
    document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}

export async function fetchJSON(url) {
    try {
        // Fetch the JSON file from the given URL
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
        const data = await response.json();
        return data; 

    } catch (error) {
        console.error('Error fetching or parsing JSON data:', error);
    }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
    containerElement.innerHTML = '';
    for(let project of projects) {
        const article = document.createElement('article');
        article.innerHTML = `
            <h3>${project.title}</h3>
            <img src="${project.image}" alt="${project.title}">
            <p>${project.description}</p>
        `;
        containerElement.appendChild(article);
    }
}

export async function fetchGitHubData(username) {
    return fetchJSON(`https://api.github.com/users/${username}`);
}