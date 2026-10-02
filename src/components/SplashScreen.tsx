'use client';
import { useEffect, useState } from 'react';
import styles from './SplashScreen.module.css';

const QUOTES = [
  { text: "A father is someone you look up to, no matter how tall you grow.", author: "Unknown" },
  { text: "A son's first hero, a daughter's first love.", author: "Unknown" },
  { text: "The imprint of a father remains forever on the life of the child.", author: "Roy Lessin" },
  { text: "To the world you are a dad. To our family, you are the world.", author: "Unknown" },
  { text: "No matter how much time passes, you will always be my little boy.", author: "Unknown" },
  { text: "We are growing together, learning from each other, one beautiful day at a time.", author: "Unknown" }
];

// A beautifully constructed CSS-only kinematically animated human figure!
const AnimatedRunningFigure = ({ className }: { className: string }) => (
  <div className={`${styles.figure} ${className}`}>
    <div className={styles.bodyWrapper}>
      <div className={styles.head}></div>
      <div className={styles.torso}></div>
      
      {/* Left Arm (Behind) */}
      <div className={`${styles.arm} ${styles.armLeft}`}>
        <div className={styles.lowerArm}></div>
      </div>
      
      {/* Right Arm (Front) */}
      <div className={`${styles.arm} ${styles.armRight}`}>
        <div className={styles.lowerArm}></div>
      </div>
      
      {/* Left Leg (Behind) */}
      <div className={`${styles.leg} ${styles.legLeft}`}>
        <div className={`${styles.lowerLeg} ${styles.lowerLegLeft}`}></div>
      </div>
      
      {/* Right Leg (Front) */}
      <div className={`${styles.leg} ${styles.legRight}`}>
        <div className={`${styles.lowerLeg} ${styles.lowerLegRight}`}></div>
      </div>
    </div>
  </div>
);

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    // Pick a random quote on mount
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(randomQuote);

    const duration = 4000; // Increased to 4 seconds to read the quote
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onFinish, 1200); // Wait for fade out animation
          }, 400);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className={`${styles.overlay} ${!isVisible ? styles.hidden : ''}`}>
      <h1 className={styles.title}>Father & Son</h1>
      <div className={styles.loaderContainer}>
        <div className={styles.track}>
          <div className={styles.characters} style={{ left: `${progress}%` }}>
            <AnimatedRunningFigure className={styles.dad} />
            <AnimatedRunningFigure className={styles.kid} />
          </div>
          <div className={styles.bar} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className={styles.quoteContainer}>
        "{quote.text}"
        <span>— {quote.author}</span>
      </div>
    </div>
  );
}
