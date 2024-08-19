import React, { useState, useEffect } from 'react';
import '../assets/cssFolder/dashboardAdmin.css';
import '../assets/cssFolder/navbar.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
 
}


const Dashboard: React.FC = () => {

  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  
  const fetchUsers = async () => {
    console.log("Fetching users...");
    try {
      const response = await axios.get('http://localhost:8080/auth/get');
      console.log("API Response:", response.data);
  
      // Check if response.data has the expected structure
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data && Array.isArray(response.data.users)) {
        // If response contains a 'users' property
        setUsers(response.data.users);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

          useEffect(() => {
            fetchUsers();
          }, []);


    const handleDelete = async (userId: number) => {
        try {
            await axios.delete(`http://localhost:8080/auth/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
            console.log(`User with ID: ${userId} deleted successfully`);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
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

      <div className="dashboard">
      <h2>Dashboard</h2>
      <table className="user-list-table">
        <thead> 
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
            
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
       
        </div>
        </div>
    );
};

export default Dashboard;

