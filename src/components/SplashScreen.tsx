'use client';
import { useEffect, useState } from 'react';
import styles from './SplashScreen.module.css';

// A beautifully constructed CSS-only kinematically animated human figure!
const AnimatedRunningFigure = ({ className }: { className: string }) => (
  <div className={`${styles.figure} ${className}`}>
    <div className={styles.bodyWrapper}>
      <div className={styles.head}></div>
      <div className={styles.torso}></div>
      
      {/* Left Arm (Behind) */}
      <div className={`${styles.arm} ${styles.armLeft}`}>
        <div className={`${styles.lowerArm} ${styles.lowerArmLeft}`}></div>
      </div>
      
      {/* Right Arm (Front) */}
      <div className={`${styles.arm} ${styles.armRight}`}>
        <div className={`${styles.lowerArm} ${styles.lowerArmRight}`}></div>
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

  useEffect(() => {
    const duration = 3000; // 3 seconds total loading
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
    </div>
  );
}
