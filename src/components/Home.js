import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Scroll event handler to change the text and background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Visibility toggle for text based on scroll state
  useEffect(() => {
    if (isScrolled) {
      setIsVisible(false);
    } else {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isScrolled]);

  const words = isScrolled ? ['LOGGING', 'OFF...'] : ['SOFTWARE', 'DEVELOPER'];

  // Handle mouse move to update position for the curves
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section id="home" onMouseMove={handleMouseMove}>
      <div className="home-container">
        {/* Background with curves */}
        <div className="background">
          <div
            className="curve curve1"
            style={{
              transform: `translate(${mousePosition.x / 100}px, ${mousePosition.y / 100}px)`,
            }}
          />
          <div
            className="curve curve2"
            style={{
              transform: `translate(${mousePosition.x / 120}px, ${mousePosition.y / 120}px)`,
            }}
          />
          <div
            className="curve curve3"
            style={{
              transform: `translate(${mousePosition.x / 140}px, ${mousePosition.y / 140}px)`,
            }}
          />
        </div>

        {/* Computer Screen */}
        <div className={`computer-screen ${isScrolled ? 'black-screen' : ''}`}>
          <AnimatePresence>
            {isVisible && (
              <motion.div
                className="screen-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {words.map((word, wordIndex) => (
                  <div key={wordIndex} className="word">
                    {word.split('').map((letter, letterIndex) => (
                      <motion.span
                        key={letterIndex}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: (wordIndex * 9 + letterIndex) * 0.1, duration: 1 }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Home;
