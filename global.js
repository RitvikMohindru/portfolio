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
    { url: "../portfolio/", title: 'home' },
    { url: "../portfolio/contact", title: 'contact' },
    { url: "../portfolio/projects", title: 'projects' },
    { url: "../portfolio/resume", title: 'resume'},
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
