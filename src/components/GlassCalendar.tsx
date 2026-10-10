'use client';
import styles from './GlassCalendar.module.css';

interface GlassCalendarProps {
  memoryDates: string[]; // e.g., ["2026-09-18", "2026-09-23"]
  onSelectDate: (date: string | null) => void;
  selectedDate: string | null;
}

export default function GlassCalendar({ memoryDates, onSelectDate, selectedDate }: GlassCalendarProps) {
  
  // Sort dates in descending order (newest first)
  const sortedDates = [...memoryDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const handleDayClick = (formattedDate: string) => {
    if (selectedDate === formattedDate) {
      onSelectDate(null);
    } else {
      onSelectDate(formattedDate);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.header}>
        <div className={styles.monthYear}>Available Memories</div>
      </div>

      <div className={styles.datesList}>
        {sortedDates.length === 0 ? (
          <div className={styles.noDates}>No memories yet.</div>
        ) : (
          sortedDates.map((dateStr) => {
            const isSelected = selectedDate === dateStr;
            return (
              <button 
                key={dateStr}
                className={`${styles.dateBtn} ${isSelected ? styles.selected : ''}`}
                onClick={() => handleDayClick(dateStr)}
              >
                📅 {formatDate(dateStr)}
              </button>
            );
          })
        )}
      </div>

      {selectedDate && (
        <button className={styles.clearFilter} onClick={() => onSelectDate(null)}>
          Show All Memories
        </button>
      )}
    </div>
  );
}
