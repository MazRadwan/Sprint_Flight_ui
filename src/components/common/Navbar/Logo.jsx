import { Link } from 'react-router-dom';
import { FaPlane } from 'react-icons/fa';
import styles from './Logo.module.css';

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <FaPlane className={styles.icon} />
      <span className={styles.text}>FlightTracker</span>
    </Link>
  );
}

export default Logo;