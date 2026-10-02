'use client';
import { useState } from 'react';
import styles from './page.module.css';
import SplashScreen from '@/components/SplashScreen';
import GlassCalendar from '@/components/GlassCalendar';
import data from '../../data/memories.json';

interface Memory {
  id: string;
  date: string;
  title: string;
  type: string;
  description?: string;
  mediaUrl?: string;
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const memories: Memory[] = data as Memory[];
  const memoryDates = Array.from(new Set(memories.map(m => m.date)));

  const displayedMemories = selectedDate 
    ? memories.filter(m => m.date === selectedDate)
    : memories;

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      <main className={`${styles.main} ${!showSplash ? styles.contentReady : ''}`}>
        <header className={styles.header}>
          <h1>Father & Son</h1>
          <p>Capture every moment, every laugh, every milestone. A digital memory book.</p>
        </header>

        <div className={styles.container}>
          {/* Beautiful Cinematic Hero Card */}
          <section className={styles.heroCard}>
            <div className={styles.heroBanner}></div>
            <div className={styles.heroContent}>
              <h2>Memories of Us ❤️</h2>
              <p>Growing together, one day at a time.</p>
              <div className={styles.stats}>
                <div className={styles.stat}>✨ {memories.length} Beautiful Memories</div>
                <div className={styles.stat}>📸 Infinite Photos</div>
              </div>
            </div>
          </section>

          {/* Timeline and Calendar Layout */}
          <section className={styles.timelineSection}>
            
            {/* Left Column: Glass Calendar Filter */}
            <div className={styles.stickyCalendar}>
              <GlassCalendar 
                memoryDates={memoryDates}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>

            {/* Right Column: Filtered Timeline */}
            <div className={styles.timeline}>
              <div className={styles.timelineHeader}>
                <h3>{selectedDate ? `Memories from ${selectedDate}` : 'Our Journey'}</h3>
              </div>
              
              {displayedMemories.length === 0 ? (
                <div className={styles.emptyState}>
                  No memories found for this date.
                </div>
              ) : (
                displayedMemories.map((memory) => (
                  <article key={memory.id} className={styles.memoryCard}>
                    <div className={styles.dateBadge}>{memory.date}</div>
                    <h4>{memory.title}</h4>
                    {memory.description && <p>{memory.description}</p>}
                    {memory.mediaUrl && (
                      <img 
                        src={memory.mediaUrl} 
                        alt={memory.title} 
                        className={styles.memoryImage} 
                        loading="lazy"
                      />
                    )}
                  </article>
                ))
              )}
            </div>
            
          </section>
        </div>
      </main>
    </>
  );
}
