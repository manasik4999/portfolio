import React from 'react';
import '../App.css';

const About = () => {
  return (
    <section id="about">
    <div className="about-container">
      <div className="about-text">
        <h1>About Me</h1>
        <p className='big-text'>
          I am a passionate Software Development Engineer with a deep interest in
          building scalable applications and solving complex problems using
          cutting-edge technologies. My expertise lies in full-stack development,
          data structures, and algorithms, with a strong focus on performance and
          optimization.
        </p>
      </div>
      <div className="about-video">
        <video controls>
          <source src="your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    </section>
  );
};

export default About;

