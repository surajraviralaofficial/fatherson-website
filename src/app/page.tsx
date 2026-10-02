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
  
  // Toggles between timeline and gallery
  const [viewMode, setViewMode] = useState<'timeline' | 'gallery'>('timeline');
  
  // Controls the full screen modal
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);

  const memories: Memory[] = data as Memory[];
  const memoryDates = Array.from(new Set(memories.map(m => m.date)));

  const displayedMemories = selectedDate 
    ? memories.filter(m => m.date === selectedDate)
    : memories;

  const photosOnly = memories.filter(m => m.mediaUrl);

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
              
              {/* Interactive View Toggles */}
              <div className={styles.stats}>
                <button 
                  className={`${styles.statBtn} ${viewMode === 'timeline' ? styles.activeStat : ''}`}
                  onClick={() => setViewMode('timeline')}
                >
                  ✨ {memories.length} Beautiful Memories
                </button>
                
                <button 
                  className={`${styles.statBtn} ${viewMode === 'gallery' ? styles.activeStat : ''}`}
                  onClick={() => setViewMode('gallery')}
                >
                  📸 Infinite Photos
                </button>
              </div>
            </div>
          </section>

          {/* Conditional Rendering based on View Mode */}
          {viewMode === 'timeline' ? (
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
                    <article 
                      key={memory.id} 
                      className={styles.memoryCard}
                      onClick={() => setActiveMemory(memory)}
                    >
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
          ) : (
            /* Gallery View */
            <section className={styles.gallerySection}>
               <div className={styles.timelineHeader}>
                  <h3>Photo Gallery</h3>
               </div>
               <div className={styles.galleryGrid}>
                 {photosOnly.map(memory => (
                   <div 
                     key={memory.id} 
                     className={styles.galleryItem}
                     onClick={() => setActiveMemory(memory)}
                   >
                     <img src={memory.mediaUrl} alt={memory.title} loading="lazy" />
                     <div className={styles.galleryOverlay}>
                       <span className={styles.galleryDate}>{memory.date}</span>
                       <span className={styles.galleryTitle}>{memory.title}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </section>
          )}
        </div>
      </main>

      {/* FULL SCREEN MODAL */}
      {activeMemory && (
        <div className={styles.fullScreenModal}>
          <div className={styles.modalHeader}>
            <button className={styles.backButton} onClick={() => setActiveMemory(null)}>
              ← Back to Timeline
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.modalDate}>{activeMemory.date}</div>
            <h2 className={styles.modalTitle}>{activeMemory.title}</h2>
            
            {activeMemory.mediaUrl && (
              <img 
                src={activeMemory.mediaUrl} 
                className={styles.modalImage} 
                alt={activeMemory.title}
              />
            )}
            
            {activeMemory.description && (
              <p className={styles.modalDesc}>{activeMemory.description}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
