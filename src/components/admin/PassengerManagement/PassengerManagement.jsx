import { useState, useEffect } from 'react';
import { passengerApi } from '../../../services/api';
import PassengerList from './PassengerList';
import PassengerForm from './PassengerForm';
import PassengerHistory from './PassengerHistory';
import styles from './PassengerManagement.module.css';
import { toast } from 'react-toastify';

function PassengerManagement() {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null);

  useEffect(() => {
    loadPassengers();
  }, []);

  const loadPassengers = async () => {
    try {
      const response = await passengerApi.getAll();
      setPassengers(response.data);
    } catch (error) {
      console.error('Error loading passengers:', error);
      toast.error('Failed to load passengers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPassenger = () => {
    setSelectedPassenger(null);
    setShowForm(true);
    setShowHistory(false);
  };

  const handleEditPassenger = (passenger) => {
    setSelectedPassenger(passenger);
    setShowForm(true);
    setShowHistory(false);
  };

  const handleViewHistory = (passenger) => {
    setSelectedPassenger(passenger);
    setShowHistory(true);
    setShowForm(false);
  };

  const handleDeletePassenger = async (id) => {
    if (window.confirm('Are you sure you want to delete this passenger?')) {
      try {
        await passengerApi.delete(id);
        toast.success('Passenger deleted successfully');
        await loadPassengers();
      } catch (error) {
        console.error('Error deleting passenger:', error);
        toast.error('Failed to delete passenger');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Passenger Management</h1>
        <button onClick={handleAddPassenger} className={styles.addButton}>
          Add New Passenger
        </button>
      </div>
      
      {showForm && (
        <PassengerForm
          passenger={selectedPassenger}
          onClose={() => setShowForm(false)}
          onSave={() => {
            loadPassengers();
            setShowForm(false);
          }}
        />
      )}

      {showHistory && selectedPassenger && (
        <PassengerHistory
          passenger={selectedPassenger}
          onClose={() => setShowHistory(false)}
        />
      )}

      <PassengerList
        passengers={passengers}
        onEdit={handleEditPassenger}
        onDelete={handleDeletePassenger}
        onViewHistory={handleViewHistory}
      />
    </div>
  );
}

export default PassengerManagement;