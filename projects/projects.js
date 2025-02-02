import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');

renderProjects(projects, projectsContainer, 'h2');

document.addEventListener("DOMContentLoaded", function () {
    const projectsTitle = document.querySelector(".projects-title");
    const projectCount = document.querySelectorAll(".project").length;
    projectsTitle.textContent = `${projectCount} projects`;
});