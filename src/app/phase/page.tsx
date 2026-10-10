'use client';
import styles from './page.module.css';

export default function PhasePage() {
  const sections = [
    {
      id: 1,
      title: "The Beginning",
      text: "A phase in life is a stepping stone. Every moment we spend together builds the foundation of our bond. Those early days were filled with laughter, sleepless nights, and the gentle realization that my world had forever changed. I remember holding your tiny hand and promising to guide you through every challenge. This phase taught me the true meaning of unconditional love.",
      img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1600&auto=format&fit=crop",
      imageRight: true
    },
    {
      id: 2,
      title: "First Steps",
      text: "A phase in life is a leap of faith. As you grew, every new milestone was a celebration. The day you took your first steps, you stumbled, but you got right back up. I watched you explore the world with curious eyes, realizing that soon you wouldn't just be walking, but running towards your own dreams. I will always be the cheering voice behind you.",
      img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop",
      imageRight: false
    },
    {
      id: 3,
      title: "Growing Stronger",
      text: "A phase in life is about resilience. You started going to school, making friends, and learning about the world. There were tough days, tears, and scraped knees, but there was also immense joy. Teaching you how to ride a bike, helping with homework, and seeing your personality shine bright has been the greatest adventure of my life. Our bond only grows stronger.",
      img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1200&auto=format&fit=crop",
      imageRight: true
    }
  ];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>A Phase In My Life</h1>
        <p>Reflecting on the beautiful journey we share.</p>
      </header>

      <div className={styles.container}>
        {sections.map((section) => (
          <section 
            key={section.id} 
            className={`${styles.row} ${section.imageRight ? '' : styles.rowReverse}`}
          >
            <div className={styles.textContent}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>
            <div className={styles.imageContent}>
              <img src={section.img} alt={section.title} loading="lazy" />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
