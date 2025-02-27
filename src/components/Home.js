import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';


const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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

  useEffect(() => {
    if (isScrolled) {
      setIsVisible(false);
    } else {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isScrolled]);

  const words = isScrolled ? ['LOGGING', 'OFF...'] : ['SOFTWARE', 'DEVELOPER', 'LOADING...'];

return (
  <section id="home">
    <div className="home-container">
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