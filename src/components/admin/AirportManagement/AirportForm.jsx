import { useState, useEffect } from 'react';
import { airportApi } from '../../../services/api';
import { toast } from 'react-toastify';
import styles from './AirportForm.module.css';

function AirportForm({ airport, onClose, onSave }) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    city: '',
    country: '',
    gateCount: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    if (airport) {
      setFormData(airport);
    }
  }, [airport]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (airport) {
        await airportApi.update(airport.id, formData);
        toast.success('Airport updated successfully');
      } else {
        await airportApi.create(formData);
        toast.success('Airport created successfully');
      }
      onSave();
    } catch (error) {
      console.error('Error saving airport:', error);
      toast.error('Failed to save airport');
    }
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>{airport ? 'Edit Airport' : 'Add New Airport'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="code">Airport Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              maxLength="3"
              placeholder="e.g., LAX"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Airport Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Los Angeles International Airport"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="gateCount">Number of Gates</label>
              <input
                type="number"
                id="gateCount"
                name="gateCount"
                value={formData.gateCount}
                onChange={handleChange}
                required
                min="1"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="ACTIVE">Active</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {airport ? 'Update Airport' : 'Add Airport'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AirportForm;