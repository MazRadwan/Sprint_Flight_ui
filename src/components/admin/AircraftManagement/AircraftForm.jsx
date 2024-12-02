import { useState, useEffect } from 'react';
import { aircraftApi } from '../../../services/api';
import { toast } from 'react-toastify';
import styles from './AircraftForm.module.css';

function AircraftForm({ aircraft, onClose, onSave }) {
  const [formData, setFormData] = useState({
    registration: '',
    type: '',
    airline: '',
    capacity: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    if (aircraft) {
      setFormData(aircraft);
    }
  }, [aircraft]);

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
      if (aircraft) {
        await aircraftApi.update(aircraft.id, formData);
        toast.success('Aircraft updated successfully');
      } else {
        await aircraftApi.create(formData);
        toast.success('Aircraft created successfully');
      }
      onSave();
    } catch (error) {
      console.error('Error saving aircraft:', error);
      toast.error('Failed to save aircraft');
    }
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>{aircraft ? 'Edit Aircraft' : 'Add New Aircraft'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="registration">Registration Number</label>
            <input
              type="text"
              id="registration"
              name="registration"
              value={formData.registration}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="type">Aircraft Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="airline">Airline</label>
            <input
              type="text"
              id="airline"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
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
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {aircraft ? 'Update Aircraft' : 'Add Aircraft'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AircraftForm;