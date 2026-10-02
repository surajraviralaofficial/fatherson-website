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
            <h1>👨‍👦 Father & Son</h1>
            <p>Capture every moment, every laugh, every milestone. A digital memory book.</p>
          </header>

          <div className={styles.container}>
            <div className={styles.heroCard}>
              <div className={styles.heroBanner}></div>
              <div className={styles.heroContent}>
                <h2>Memories of Us ❤️</h2>
                <p>Growing together, one day at a time.</p>
                <div className={styles.stats}>
                  <div className={styles.stat}>📅 {memoriesData.length} Memories</div>
                  <div className={styles.stat}>📷 Photos & Videos</div>
                </div>
              </div>
            </div>

            <div className={styles.dashboard}>
              {/* Sidebar Info / Future Calendar Area */}
              <aside>
                <div className={styles.timeline}>
                  <h3 style={{fontSize: '1.2rem', marginBottom: '15px'}}>About This Space</h3>
                  <p style={{color: '#64748b', lineHeight: '1.6'}}>
                    This website is dedicated to our bond. Every new adventure, every small 
                    victory, and every precious moment is documented here to look back on.
                  </p>
                  <p style={{color: '#64748b', lineHeight: '1.6', marginTop: '15px'}}>
                    <b>How to update:</b> Add new entries to the <code>data/memories.json</code> file, 
                    and they will appear right here on the timeline!
                  </p>
                </div>
              </aside>

              {/* Memories Timeline */}
              <div className={styles.timeline}>
                <div className={styles.timelineHeader}>
                  <h3>Our Journey</h3>
                </div>

                {memoriesData.map((memory) => (
                  <div key={memory.id} className={styles.memoryCard}>
                    <div className={styles.dateBadge}>
                      🗓️ {new Date(memory.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    
                    <span className={`${styles.tag} ${
                      memory.type === 'MESSAGE' ? styles.tagMessage : 
                      memory.type === 'PHOTO' ? styles.tagPhoto : styles.tagVideo
                    }`}>
                      {memory.type}
                    </span>
                    
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
          </div>
        </main>
      )}
    </>
  );
}
