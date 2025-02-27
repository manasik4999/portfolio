import React from "react";
import { useSpring, animated } from "react-spring";
import "../App.css";
import logo from "./images/home_photo.jpg";

const Header = () => {
  const tabs = [
    { name: "About Me", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact Me", id: "contact" },
  ];

  const AnimatedTab = ({ children, id }) => {
    const [props, set] = useSpring(() => ({ scale: 1, color: "#000" }));

    const handleMouseEnter = () => set({ scale: 1.1, color: "#007bff" });
    const handleMouseLeave = () => set({ scale: 1, color: "#000" });

    const handleClick = (event) => {
      event.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <animated.a
        href={`#${id}`}
        className="nav-item"
        style={props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </animated.a>
    );
  };

  return (
    <header className="header">
      <div className="logo">
        <nav className="nav-links">
        <AnimatedTab key="" id="home">
        <img src={logo} alt="Logo" width="30px" height="30px" />
          </AnimatedTab>
        </nav>
      </div>
      <nav className="nav-links">

        {tabs.map((tab) => (
          <AnimatedTab key={tab.id} id={tab.id}>
            {tab.name}
          </AnimatedTab>
        ))}
      </nav>
    </header>
  );
};

export default Header;
