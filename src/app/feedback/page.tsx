'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function FeedbackPage() {
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate sending email. The user will replace this with their backend or mailto later.
    setStatus('submitted');
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Feedback</h1>
        <p>We would love to hear your thoughts and reviews!</p>
      </header>

      <div className={styles.container}>
        <div className={styles.formCard}>
          {status === 'submitted' ? (
            <div className={styles.successMessage}>
              <h3>Thank You!</h3>
              <p>Your feedback has been submitted successfully.</p>
              <button onClick={() => setStatus('idle')} className={styles.submitBtn}>
                Submit Another Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" required placeholder="John Doe" />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" required placeholder="john@example.com" />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message">Your Review</label>
                <textarea 
                  id="message" 
                  required 
                  placeholder="Share your thoughts..."
                  rows={5}
                ></textarea>
              </div>

              {/* 
                NOTE TO DEVELOPER: 
                To send this to an email, you can integrate a service like EmailJS, Formspree, 
                or use a server action. 
              */}
              <button type="submit" className={styles.submitBtn}>
                Send Feedback
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
