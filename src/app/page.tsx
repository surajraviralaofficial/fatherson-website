'use client';
import { useState } from 'react';
import styles from './page.module.css';
import SplashScreen from '@/components/SplashScreen';
import memoriesData from '../../data/memories.json';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      {!showSplash && (
        <main className={`${styles.main} ${styles.contentReady}`}>
          <header className={styles.header}>
            <h1>Father & Son</h1>
            <p>Capture every moment, every laugh, every milestone. A digital memory book.</p>
          </header>

          <div className={styles.container}>
            <div className={styles.heroCard}>
              <div className={styles.heroBanner}></div>
              <div className={styles.heroContent}>
                <h2>Memories of Us ❤️</h2>
                <p style={{color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '10px'}}>Growing together, one day at a time.</p>
                <div className={styles.stats}>
                  <div className={styles.stat}>✨ {memoriesData.length} Beautiful Memories</div>
                  <div className={styles.stat}>📸 Infinite Photos</div>
                </div>
              </div>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineHeader}>
                <h3>Our Journey</h3>
              </div>

              {memoriesData.map((memory) => (
                <div key={memory.id} className={styles.memoryCard}>
                  <div className={styles.dateBadge}>
                    {new Date(memory.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  
                  <h4>{memory.title}</h4>
                  
                  {memory.description && <p>{memory.description}</p>}
                  
                  {memory.mediaUrl && (
                    <img 
                      src={memory.mediaUrl} 
                      alt={memory.title} 
                      className={styles.memoryImage} 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
