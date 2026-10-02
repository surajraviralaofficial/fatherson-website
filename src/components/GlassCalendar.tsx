'use client';
import { useState, useMemo } from 'react';
import styles from './GlassCalendar.module.css';

interface GlassCalendarProps {
  memoryDates: string[]; // e.g., ["Oct 15, 2026", "Oct 18, 2026"]
  onSelectDate: (date: string | null) => void;
  selectedDate: string | null;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function GlassCalendar({ memoryDates, onSelectDate, selectedDate }: GlassCalendarProps) {
  // Parse latest memory to set initial month, or default to current
  const initialDate = memoryDates.length > 0 ? new Date(memoryDates[0]) : new Date();
  
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  // Generate calendar days
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const formattedDate = `${MONTHS[currentMonth]} ${day}, ${currentYear}`;
    
    // Check if the user is clicking the already selected date, if so, clear it
    if (selectedDate === formattedDate) {
      onSelectDate(null);
    } else {
      onSelectDate(formattedDate);
    }
  };

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.header}>
        <button onClick={handlePrevMonth}>‹</button>
        <div className={styles.monthYear}>
          {MONTHS[currentMonth]} {currentYear}
        </div>
        <button onClick={handleNextMonth}>›</button>
      </div>

      <div className={styles.weekdays}>
        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
      </div>

      <div className={styles.daysGrid}>
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className={`${styles.day} ${styles.emptyDay}`} />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const formattedDate = `${MONTHS[currentMonth]} ${day}, ${currentYear}`;
          
          // Next.js doesn't natively parse "Oct 15, 2026" easily if there's no zero padding,
          // so we check if this specific string exists in the memory array.
          // Note: ensure memories.json dates match this exact format.
          const hasMemory = memoryDates.includes(formattedDate);
          const isSelected = selectedDate === formattedDate;

          return (
            <div 
              key={day} 
              className={`
                ${styles.day} 
                ${hasMemory ? styles.hasMemory : ''} 
                ${isSelected ? styles.selected : ''}
              `}
              onClick={() => handleDayClick(day)}
            >
              <span>{day}</span>
              {hasMemory && <div className={styles.dot} />}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <button className={styles.clearFilter} onClick={() => onSelectDate(null)}>
          Show All Memories
        </button>
      )}
    </div>
  );
}
