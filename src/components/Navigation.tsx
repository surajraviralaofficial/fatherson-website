'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button 
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} 
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={closeMenu}>
          <nav className={styles.nav} onClick={e => e.stopPropagation()}>
            <div className={styles.navHeader}>
              <h2>Menu</h2>
              <button className={styles.closeBtn} onClick={closeMenu}>×</button>
            </div>
            <ul className={styles.navList}>
              <li>
                <Link 
                  href="/" 
                  className={pathname === '/' ? styles.active : ''}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/phase" 
                  className={pathname === '/phase' ? styles.active : ''}
                  onClick={closeMenu}
                >
                  A Phase In My Life
                </Link>
              </li>
              <li>
                <Link 
                  href="/feedback" 
                  className={pathname === '/feedback' ? styles.active : ''}
                  onClick={closeMenu}
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
