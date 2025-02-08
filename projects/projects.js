import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');

renderProjects(projects, projectsContainer, 'h2');

document.addEventListener("DOMContentLoaded", function () {
    const projectsTitle = document.querySelector(".projects-title");
    const projectCount = document.querySelectorAll(".project").length;
    projectsTitle.textContent = `${projectCount} projects`;
});

let colors = d3.scaleOrdinal(d3.schemeTableau10);
let selectedIndex = -1;

function renderPieChart(projectsGiven) {
    // re-calculate rolled data
    let newRolledData = d3.rollups(
      projectsGiven,
      (v) => v.length,
      (d) => d.year,
    );
    let newData = newRolledData.map(([year, count]) => {
        return {value: count, label: year};
    });
    let newArcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let newSliceGenerator = d3.pie().value((d) => d.value);
    let newArcData = newSliceGenerator(newData);
    let newArcs = newArcData.map((d) => newArcGenerator(d));

    let newSVG = d3.select('#projects-pie-plot'); 
    newSVG.selectAll('path').remove();
    let legend = d3.select('.legend');
    legend.selectAll("li").remove();

    newArcs.forEach((arc, idx) => {
        newSVG
        .append('path')
        .attr('d', arc)
        .attr('fill', colors(idx))
        .attr("class", (_, idx) => (selectedIndex === idx ? "selected" : ""))
        .on('click', () => {
            selectedIndex = selectedIndex === idx ? -1 : idx;
            newSVG
                .selectAll('path')
                .attr("class", (_, idx) => (selectedIndex === idx ? "selected" : ""));
    
            legend
                .selectAll('li')
                .attr("class", (_, idx) => (selectedIndex === idx ? "selected" : ""));
    
            if (selectedIndex === -1) {
                renderProjects(projects, projectsContainer, 'h2');
                } else {
                    let chosenYear = newData[selectedIndex].label;
                    let filteredProjects = projects.filter(
                        (project) => project.year === chosenYear
                    );
                    renderProjects(filteredProjects, projectsContainer, "h2");
                }
        });
    })
    newData.forEach((d, idx) => {
        legend.append('li')
              .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
              .attr("class", (_, idx) => (selectedIndex === idx ? "selected" : ""))
              .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`) // set the inner html of <li>
              .on('click', () => {
                selectedIndex = selectedIndex === idx ? -1 : idx;
            newSVG
                .selectAll('path')
                .attr("class", (_, idx) => (selectedIndex === idx ? "selected" : ""));
    
            legend
                .selectAll('li')
                .attr("class", (_, idx) => (selectedIndex === idx ? "selected" : ""));
    
            if (selectedIndex === -1) {
                renderProjects(projects, projectsContainer, 'h2');
                } else {
                    let chosenYear = newData[selectedIndex].label;
                    let filteredProjects = projects.filter(
                        (project) => project.year === chosenYear
                    );
                    renderProjects(filteredProjects, projectsContainer, "h2");
                }
            });
    });
}

renderPieChart(projects);

let query = '';
let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('change', (event) => {
  // update query value
  query = event.target.value;
  // filter projects
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });
  renderPieChart(filteredProjects);
  renderProjects(filteredProjects, projectsContainer, 'h2');
});

