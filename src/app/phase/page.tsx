'use client';
import styles from './page.module.css';

export default function PhasePage() {
  const sections = [
    {
      id: 1,
      title: "The Beginning",
      text: "A phase in life is a stepping stone. Every moment we spend together builds the foundation of our bond. Those early days were filled with laughter, sleepless nights, and the gentle realization that my world had forever changed. I remember holding your tiny hand and promising to guide you through every challenge. This phase taught me the true meaning of unconditional love. As the days turned into weeks, and the weeks into months, I watched you grow with absolute amazement. Every little smile and every tiny grasp of your fingers around mine made me realize that this journey is the most beautiful story ever written.",
      img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1600&auto=format&fit=crop",
      imageRight: true
    },
    {
      id: 2,
      title: "First Steps",
      text: "A phase in life is a leap of faith. As you grew, every new milestone was a celebration. The day you took your first steps, you stumbled, but you got right back up. I watched you explore the world with curious eyes, realizing that soon you wouldn't just be walking, but running towards your own dreams. I will always be the cheering voice behind you. It was a moment of pure joy and slight terror, watching you let go of the couch and balance on your own two feet. You laughed as you fell, and in that moment, I knew you would always have the courage to try again, no matter how many times you stumble.",
      img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop",
      imageRight: false
    },
    {
      id: 3,
      title: "Growing Stronger",
      text: "A phase in life is about resilience. You started going to school, making friends, and learning about the world. There were tough days, tears, and scraped knees, but there was also immense joy. Teaching you how to ride a bike, helping with homework, and seeing your personality shine bright has been the greatest adventure of my life. Our bond only grows stronger. Watching you discover your favorite books, your passion for sports, and your incredible kindness towards others makes me prouder than words can express. You are not just growing older; you are growing into an amazing human being.",
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
          <section key={section.id} className={styles.storySection}>
            <img 
              src={section.img} 
              alt={section.title} 
              loading="lazy" 
              className={`${styles.storyImage} ${section.imageRight ? styles.floatRight : styles.floatLeft}`}
            />
            <h2>{section.title}</h2>
            <p>{section.text}</p>
            <div className={styles.clear}></div>
          </section>
        ))}
      </div>
    </main>
  );
}
