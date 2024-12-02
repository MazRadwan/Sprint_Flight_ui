import styles from './FilterButtons.module.css';

function FilterButtons({ activeFilter, onFilterChange }) {
  return (
    <div className={styles.filters}>
      <button 
        className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All Flights
      </button>
      <button 
        className={`${styles.filterButton} ${activeFilter === 'departures' ? styles.active : ''}`}
        onClick={() => onFilterChange('departures')}
      >
        Departures
      </button>
      <button 
        className={`${styles.filterButton} ${activeFilter === 'arrivals' ? styles.active : ''}`}
        onClick={() => onFilterChange('arrivals')}
      >
        Arrivals
      </button>
    </div>
  );
}

export default FilterButtons;