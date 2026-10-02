'use client';
import { useState, useMemo } from 'react';
import styles from './GlassCalendar.module.css';

interface GlassCalendarProps {
  memoryDates: string[]; // e.g., ["2026-09-18", "2026-09-23"]
  onSelectDate: (date: string | null) => void;
  selectedDate: string | null;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function GlassCalendar({ memoryDates, onSelectDate, selectedDate }: GlassCalendarProps) {
  // Always default to the current real-world date
  const initialDate = new Date();
  
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

  const handleDayClick = (formattedDate: string) => {
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
          const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
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
              onClick={() => handleDayClick(formattedDate)}
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
