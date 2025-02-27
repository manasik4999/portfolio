import React, { useEffect, useRef } from "react";
import "../App.css";

const skills = [
  "Python",
  "Java",
  "C++",
  "JavaScript",
  "SQL",
  "R",
  "Go",
  "Swift",
  "Kotlin",
  "TypeScript",
  "React",
  "Node.js",
  "Django",
  "Flask",
  "Spring Boot",
  "TensorFlow",
  "PyTorch",
  "Express.js",
  "Bootstrap",
  "Tailwind CSS",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "SQLite",
  "Oracle",
  "Redis",
  "Cassandra",
  "DynamoDB",
  "Firebase",
  "MariaDB",
  "AWS",
  "Azure",
  "Google Cloud",
  "Heroku",
  "Firebase",
  "DigitalOcean",
  "Kubernetes",
  "Docker",
  "Terraform",
  "Cloudflare",
  "Problem-Solving",
  "Communication",
  "Leadership",
  "Teamwork",
  "Agile Methodology",
  "Scrum",
  "Project Management",
  "Critical Thinking",
  "Time Management",
  "Creativity",
];

const getRandomFontSize = () => {
  const sizes = ["1rem", "1.5rem", "2rem"];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

const Skills = () => {
  useEffect(() => {
    const canvas = document.getElementById("starCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      speed: Math.random() * 0.5,
    }));

    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animateStars);
    };

    animateStars();
  }, []);

  return (
    <section id="skills">
      <div className="skills-container">
        <h2 className="skills-heading">My Skills</h2>
        <div className="skills-content">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="skill-item"
              style={{
                fontSize: getRandomFontSize(),
              }}
            >
              {skill}
            </span>
          ))}
        </div>
        <canvas id="starCanvas" className="stars"></canvas>
      </div>
    </section>
  );
};

export default Skills;
