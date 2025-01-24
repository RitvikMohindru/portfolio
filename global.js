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
    { url: "/index.html", title: 'home' },
    { url: "/contact/index.html", title: 'contact' },
    { url: "/projects/index.html", title: 'projects' },
    { url: "/resume/index.html", title: 'resume'},
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
