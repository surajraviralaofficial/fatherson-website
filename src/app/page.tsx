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
  mediaUrls?: string[];
  isFavorite?: boolean;
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  // Toggles between timeline, gallery, and favorites
  const [viewMode, setViewMode] = useState<'timeline' | 'gallery' | 'favorites'>('timeline');
  
  // Controls the full screen modal
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (memory: Memory, startIndex: number = 0) => {
    setActiveMemory(memory);
    setCurrentImageIndex(startIndex);
    // Push a state to the browser history so the back button works for the modal
    window.history.pushState({ modalOpen: true }, '');
  };

  // Listen for the browser/mobile back button
  useEffect(() => {
    const handlePopState = () => {
      if (activeMemory) {
        setActiveMemory(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeMemory]);

  const memories: Memory[] = data as Memory[];

  const baseMemories = viewMode === 'favorites' ? memories.filter(m => m.isFavorite) : memories;
  const memoryDates = Array.from(new Set(baseMemories.map(m => m.date)));

  const displayedMemories = selectedDate 
    ? baseMemories.filter(m => m.date === selectedDate)
    : baseMemories;

  const photosOnly = memories.filter(m => m.mediaUrl || (m.mediaUrls && m.mediaUrls.length > 0));

  const galleryItems = photosOnly.flatMap(memory => {
    if (memory.mediaUrls && memory.mediaUrls.length > 0) {
      return memory.mediaUrls.map((url, idx) => ({ 
        ...memory, 
        mediaUrl: url, 
        mediaUrls: undefined, 
        uniqueId: `${memory.id}-${idx}` 
      }));
    }
    return [{ ...memory, uniqueId: memory.id }];
  });

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
                  📅 Home
                </button>

                <button 
                  className={`${styles.statBtn} ${viewMode === 'favorites' ? styles.activeStat : ''}`}
                  onClick={() => setViewMode('favorites')}
                >
                  ✨ Favorite Memories
                </button>

                <button 
                  className={`${styles.statBtn} ${viewMode === 'gallery' ? styles.activeStat : ''}`}
                  onClick={() => setViewMode('gallery')}
                >
                  📸 Photos
                </button>
              </div>
            </div>
          </section>

          {/* Conditional Rendering based on View Mode */}
          {(viewMode === 'timeline' || viewMode === 'favorites') ? (
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
                  <h3>{selectedDate ? `Memories from ${selectedDate}` : viewMode === 'favorites' ? 'Favorite Memories' : 'Our Journey'}</h3>
                </div>
                
                {displayedMemories.length === 0 ? (
                  <div className={styles.emptyState}>
                    No memories found.
                  </div>
                ) : (
                  displayedMemories.map((memory) => (
                    <article 
                      key={memory.id} 
                      className={styles.memoryCard}
                      onClick={() => openModal(memory, 0)}
                    >
                      <div className={styles.dateBadge}>{memory.date}</div>
                      <h4>{memory.title} {memory.isFavorite && '🌟'}</h4>
                      {memory.description && <p>{memory.description}</p>}
                      {memory.mediaUrl && !memory.mediaUrls && (
                        <img 
                          src={memory.mediaUrl} 
                          alt={memory.title} 
                          className={styles.memoryImage} 
                          loading="lazy"
                        />
                      )}
                      {memory.mediaUrls && memory.mediaUrls.length > 0 && (
                        <div className={styles.imageGrid}>
                          {memory.mediaUrls.map((url, idx) => (
                            <img 
                              key={idx}
                              src={url} 
                              alt={`${memory.title} ${idx + 1}`} 
                              className={styles.memoryImage} 
                              loading="lazy"
                              onClick={(e) => {
                                e.stopPropagation();
                                openModal(memory, idx);
                              }}
                            />
                          ))}
                        </div>
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
                 {galleryItems.map(item => (
                   <div 
                     key={item.uniqueId} 
                     className={styles.galleryItem}
                     onClick={() => openModal(item, 0)}
                   >
                     <img src={item.mediaUrl} alt={item.title} loading="lazy" />
                     <div className={styles.galleryOverlay}>
                       <span className={styles.galleryDate}>{item.date}</span>
                       <span className={styles.galleryTitle}>{item.title}</span>
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
            <button 
              className={styles.backButton} 
              onClick={() => {
                setActiveMemory(null);
                // Also go back in history to keep it clean
                window.history.back();
              }}
            >
              ← Back to Timeline
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.modalDate}>{activeMemory.date}</div>
            <h2 className={styles.modalTitle}>{activeMemory.title}</h2>
            
            {activeMemory.mediaUrl && !activeMemory.mediaUrls && (
              <img 
                src={activeMemory.mediaUrl} 
                className={styles.modalImage} 
                alt={activeMemory.title}
              />
            )}

            {activeMemory.mediaUrls && activeMemory.mediaUrls.length > 0 && (
              <div className={styles.carouselContainer}>
                <button 
                  className={`${styles.carouselBtn} ${styles.prevBtn}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev > 0 ? prev - 1 : activeMemory.mediaUrls!.length - 1); }}
                >
                  ◀
                </button>
                
                <img 
                  src={activeMemory.mediaUrls[currentImageIndex]} 
                  className={styles.modalImage} 
                  alt={`${activeMemory.title} ${currentImageIndex + 1}`}
                />
                
                <button 
                  className={`${styles.carouselBtn} ${styles.nextBtn}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev < activeMemory.mediaUrls!.length - 1 ? prev + 1 : 0); }}
                >
                  ▶
                </button>
                
                <div className={styles.carouselDots}>
                  {activeMemory.mediaUrls.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`${styles.dot} ${idx === currentImageIndex ? styles.activeDot : ''}`}
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                    />
                  ))}
                </div>
              </div>
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
