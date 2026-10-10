'use client';
import { useState, useMemo } from 'react';
import styles from './GlassCalendar.module.css';

interface GlassCalendarProps {
  memoryDates: string[]; 
  onSelectDate: (date: string | null) => void;
  selectedDate: string | null;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FULL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function GlassCalendar({ memoryDates, onSelectDate, selectedDate }: GlassCalendarProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  // For Grid View
  const initialDate = new Date();
  const [gridMonth, setGridMonth] = useState(initialDate.getMonth());
  const [gridYear, setGridYear] = useState(initialDate.getFullYear());

  // For List View
  const sortedDates = useMemo(() => {
    return [...memoryDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }, [memoryDates]);

  // Group memory dates by "YYYY-MM"
  const groupedByMonth = useMemo(() => {
    const map = new Map<string, string[]>();
    sortedDates.forEach(dateStr => {
      const ym = dateStr.substring(0, 7); // YYYY-MM
      if (!map.has(ym)) map.set(ym, []);
      map.get(ym)!.push(dateStr);
    });
    return Array.from(map.entries()); // [ ["2026-10", [...]], ["2026-09", [...]] ]
  }, [sortedDates]);

  const [visibleMonthsCount, setVisibleMonthsCount] = useState(1);

  const handleDayClick = (formattedDate: string) => {
    if (selectedDate === formattedDate) {
      onSelectDate(null);
    } else {
      onSelectDate(formattedDate);
    }
  };

  const formatDateList = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Grid Nav
  const handlePrevMonth = () => {
    if (gridMonth === 0) {
      setGridMonth(11);
      setGridYear(gridYear - 1);
    } else {
      setGridMonth(gridMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (gridMonth === 11) {
      setGridMonth(0);
      setGridYear(gridYear + 1);
    } else {
      setGridMonth(gridMonth + 1);
    }
  };

  if (viewMode === 'grid') {
    const daysInMonth = new Date(gridYear, gridMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(gridYear, gridMonth, 1).getDay();

    return (
      <div className={styles.calendarWrapper}>
        <div className={styles.headerGrid}>
          <button onClick={handlePrevMonth} className={styles.navBtn}>‹</button>
          <div className={styles.monthYear}>
            {MONTHS[gridMonth]} {gridYear}
          </div>
          <button onClick={handleNextMonth} className={styles.navBtn}>›</button>
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
            const formattedDate = `${gridYear}-${String(gridMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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
                onClick={() => hasMemory && handleDayClick(formattedDate)}
              >
                <span>{day}</span>
                {hasMemory && <div className={styles.dot} />}
              </div>
            );
          })}
        </div>

        <button className={styles.actionFilter} onClick={() => setViewMode('list')}>
          Back to List View
        </button>
        {selectedDate && (
          <button className={styles.clearFilter} onClick={() => onSelectDate(null)}>
            Clear Selection
          </button>
        )}
      </div>
    );
  }

  // LIST VIEW
  const visibleGroups = groupedByMonth.slice(0, visibleMonthsCount);
  const nextGroup = groupedByMonth[visibleMonthsCount];
  let nextMonthName = "";
  if (nextGroup) {
    const [ym] = nextGroup; // "YYYY-MM"
    const monthIndex = parseInt(ym.split('-')[1], 10) - 1;
    nextMonthName = FULL_MONTHS[monthIndex];
  }

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.header}>
        <div className={styles.monthYear}>Available Memories</div>
      </div>

      <div className={styles.datesList}>
        {visibleGroups.length === 0 ? (
          <div className={styles.noDates}>No memories yet.</div>
        ) : (
          visibleGroups.map(([ym, dates]) => {
            const monthIndex = parseInt(ym.split('-')[1], 10) - 1;
            const year = ym.split('-')[0];
            return (
              <div key={ym} className={styles.monthGroup}>
                <h4 className={styles.monthGroupTitle}>{FULL_MONTHS[monthIndex]} {year}</h4>
                {dates.map((dateStr) => {
                  const isSelected = selectedDate === dateStr;
                  return (
                    <button 
                      key={dateStr}
                      className={`${styles.dateBtn} ${isSelected ? styles.selected : ''}`}
                      onClick={() => handleDayClick(dateStr)}
                    >
                      📅 {formatDateList(dateStr)}
                    </button>
                  );
                })}
              </div>
            );
          })
        )}
      </div>

      {nextGroup && (
        <button 
          className={styles.actionFilter} 
          onClick={() => setVisibleMonthsCount(v => v + 1)}
        >
          Show memories of {nextMonthName}
        </button>
      )}

      <button 
        className={styles.actionFilterAlt} 
        onClick={() => setViewMode('grid')}
      >
        Show all memories in Calendar
      </button>

      {selectedDate && (
        <button className={styles.clearFilter} onClick={() => onSelectDate(null)}>
          Clear Selection
        </button>
      )}
    </div>
  );
}
