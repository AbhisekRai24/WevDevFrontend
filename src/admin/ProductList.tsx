import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/cssFolder/navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import UpdateBikeModal from './UpdateBikeModal';

interface Bike {
  id: number;
  model: string;
  brand: string;
  status: string;
  description: string;
  imageUrl: string;
  price: string;
}

const ProductList: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
    const navigate = useNavigate();

    const fetchBikes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bikes/getAll');
        const bikes = response.data.map((bike: any) => ({
          id: bike.id,
          model: bike.model,
          brand: bike.brand,
          price: bike.price,
          description: bike.description,
          availability_status: bike.availabilityStatus,
          // Optionally handle nested data if needed
        }));
        setBikes(bikes);
      } catch (error) {
        console.error('Error fetching bikes:', error);
      }
    };
    useEffect(() => {
      fetchBikes();
    }, []);
  const handleDelete = async (bikeId: number) => {
    try {
      await axios.delete(`http://localhost:8080/bikes/remove/${bikeId}`);
      setBikes(bikes.filter(bike => bike.id !== bikeId)); // Update the state to remove the deleted bike
    } catch (error) {
      console.error('Error deleting bike:', error);
    }
  };

  const handleUpdateClick = (bike: Bike) => {
    setSelectedBike(bike);
  };

  const handleModalClose = () => {
    setSelectedBike(null);
  };

  const handleUpdate = (updatedBike: Bike) => {
    setBikes(bikes.map(bike => (bike.id === updatedBike.id ? updatedBike : bike)));
  };

  
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('userId'); // Remove userId or any other data you stored
    // Redirect to login page
    navigate('/login');
};

  return (
    <div>
      <header>
        <div className="NavBar">
          <div className="logo">
            <h1>BikeKudam</h1>
          </div>
          <nav>
            <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
              <li><Link to="/admin/sellbike">Sell</Link></li>
              <li><Link to ="/admin/productlist">Product</Link></li>
              <li><a href="#" onClick={handleLogout}>Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="product-list">
        <h2>Products for Sale</h2>
        <table className="product-list-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Brand</th>
              <th>Status</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map(bike => (
              <tr key={bike.id}>
                <td>{bike.model}</td>
                <td>{bike.brand}</td>
                <td>{bike.status}</td>
                <td>{bike.description}</td>
                <td>{bike.price}</td>
                <td><img src={bike.imageUrl} alt={bike.model} style={{ width: '100px' }} /></td>
                <td>
                <button onClick={() => handleUpdateClick(bike)}>Update</button>
                  <button onClick={() => handleDelete(bike.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBike && (
        <UpdateBikeModal
          bike={selectedBike}
          onClose={handleModalClose}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ProductList;
