import React, { useState, useEffect } from 'react';
import '../assets/cssFolder/sidebarStyles.css';

interface Booking {
  id: number;
  bookingDate: string;
  bike: {
    model: string;
    brand: string;
    price: string;
  };
  status: boolean;
}

interface SidebarProps {
  userId: number;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userId, onClose }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:8080/bookings/getbyuser/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [userId]);

  const deleteBooking = async (bookingId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/bookings/delete/${bookingId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
      } else {
        console.error('Error deleting booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="sidebar">
      <button className="close-btn" onClick={onClose}>X</button>
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <p><strong>Model:</strong> {booking.bike.model}</p>
              <p><strong>Brand:</strong> {booking.bike.brand}</p>
              <p><strong>Price:</strong> {booking.bike.price}</p>
              <p><strong>Date:</strong> {booking.bookingDate}</p>
              <p><strong>Status:</strong> {booking.status ? 'Confirmed' : 'Pending'}</p>
              <button className="delete-btn" onClick={() => deleteBooking(booking.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Sidebar;
