import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Insights from './Insights';

const ScrollFade = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);  // Trigger fade-in when element is in view
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const target = document.querySelector('.fade-section'); // Select the section to observe

    if (target) {
      observer.observe(target);  // Start observing the element
    }

    return () => observer.disconnect(); // Cleanup on component unmount
  }, []);

  // Define fade-in/fade-out animations
  const fadeProps = useSpring({
    opacity: isVisible ? 1 : 0,       // Fade in when visible, fade out when not
    transform: isVisible ? 'translateY(10px)' : 'translateY(50px)', // Optional: add a slide effect
    config: { tension: 280, friction: 60 },  // Adjust the spring config for smoothness
  });

  return (
    <animated.div style={fadeProps}>
      <section className="fade-section container py-5">
        <h2 className="section-heading text-center" style={{ color: "#FFD700" }}>
          Our Latest Insights
        </h2>
        <Insights />
      </section>
    </animated.div>
  );
};

export default ScrollFade;
