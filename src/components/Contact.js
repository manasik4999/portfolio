import React from "react";
import "../App.css";
import contactPhoto from "./images/contact.jpg";
import keepintouch from './images/keepintouch.gif'
import instagramIcon from "./images/instagram.jpeg";
import linkedinIcon from "./images/linkedin.jpeg";
import facebookIcon from "./images/facebook.jpeg";
import githubIcon from "./images/github.jpeg";

const Contact = () => {
  return (
    <div>
      <section id="contact">
        <h1 className="heading">Contact Me</h1>
        <div className="section-div">
          <div className="contact-container">
            <div className="contact-photo">
              <img
                id="contact-photo"
                src={keepintouch}
                alt="Contact"
                width="300"
                height="300"
              />
            </div>
            <div className="contact-form">
              <form action="submit_form.php" method="post">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                ></textarea>

                <button type="submit">Send Message</button>
              </form>
              <div className="social-links">
                <h2>Connect with me:</h2>
                <a
                  href="https://www.instagram.com/manasi_k04/?next=%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    id="instagram-icon"
                    src={instagramIcon}
                    alt="Instagram"
                    width="30"
                    height="30"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/manasi-khamkar-75353a1b0/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    id="linkedin-icon"
                    src={linkedinIcon}
                    alt="LinkedIn"
                    width="30"
                    height="30"
                  />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100001748767312"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    id="facebook-icon"
                    src={facebookIcon}
                    alt="Facebook"
                    width="30"
                    height="30"
                  />
                </a>
                <a
                  href="https://github.com/manasik4999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    id="github-icon"
                    src={githubIcon}
                    alt="GitHub"
                    width="30"
                    height="30"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} Manasi Khamkar. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default Contact;
