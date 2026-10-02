'use client';
import { useEffect, useState } from 'react';
import styles from './SplashScreen.module.css';

// SVG path for a running man silhouette
const RunningSilhouette = ({ className }: { className: string }) => (
  <svg viewBox="0 0 512 512" className={className}>
    <path d="M312.6,204.4c-11.4-15.8-28.7-27.1-48.4-30.8l-52-9.6c-17.6-3.2-35.3,1.6-48.8,13.2L116,218.4c-9.1,7.9-10.1,21.8-2.1,30.9c7.9,9.1,21.8,10.1,30.9,2.1l43.2-37.4l15.2,50.7l-53.7,43.2c-11,8.9-12.8,25-3.9,36c8.9,11,25,12.8,36,3.9l69.1-55.6c6.2-5,10.1-12.4,10.7-20.4l5.3-64.8l20.1,3.7c4,0.7,7.8,2.4,11.2,5l36.5,27.9c13.7,10.5,33.5,8,44-5.7C372.6,224.2,370,204.4,312.6,204.4z M256,128c26.5,0,48-21.5,48-48s-21.5-48-48-48s-48,21.5-48,48S229.5,128,256,128z M224.5,301.7l-15.6,33l42.6,89.5c6,12.6,20.8,17.9,33.4,11.9c12.6-6,17.9-20.8,11.9-33.4l-49.4-103.7L224.5,301.7z"/>
  </svg>
);

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 3000; // 3 seconds loading for drama
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
            <RunningSilhouette className={`${styles.silhouette} ${styles.dad}`} />
            <RunningSilhouette className={`${styles.silhouette} ${styles.kid}`} />
          </div>
          <div className={styles.bar} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}
