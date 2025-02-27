import React from 'react';
import '../App.css';

const projects = [
    {
      title: 'Project One',
      description: 'A brief description of Project One.',
      technologies: 'React, Node.js, MongoDB',
      image: 'project1.jpg',
      link: '#'
    },
    {
      title: 'Project Two',
      description: 'A brief description of Project Two.',
      technologies: 'Python, Flask, PostgreSQL',
      image: 'project2.jpg',
      link: '#'
    },
    {
      title: 'Project Three',
      description: 'A brief description of Project Three.',
      technologies: 'Java, Spring Boot, MySQL',
      image: 'project3.jpg',
      link: '#'
    }
  ];
  
  const Projects = () => {
    return (
      <section id="projects">
      <div className="projects-container">
        <h2 className="projects-heading">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="card-inner">
                <div className="card-front">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="card-back">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>
    );
  };
  
  export default Projects;
  