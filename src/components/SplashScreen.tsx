'use client';
import { useEffect, useState } from 'react';
import styles from './SplashScreen.module.css';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds total loading
    const interval = 25;
    const steps = duration / interval;
    const increment = 100 / steps;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onFinish, 800); // Wait for fade out animation
          }, 300);
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
            <span className={styles.dad}>👨</span>
            <span className={styles.kid}>👦</span>
          </div>
          <div className={styles.bar} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}
