import React, { useState, useEffect } from 'react';
import '../assets/cssFolder/home.css'
import '../assets/cssFolder/navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../public/Sidebar';
// import Modal from 'react-modal';

interface Bike {
    id: number;
    model: string;
    brand: string;
    price: string;
    imageUrl: string;
  }

  


const Home: React.FC = () => {
    const [bikes, setBikes] = useState<Bike[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch bikes from backend
        const fetchBikes = async () => {
          try {
            const response = await fetch('http://localhost:8080/bikes/getAll'); // Update with your API endpoint
            const data = await response.json();
            setBikes(data);
          } catch (error) {
            console.error('Error fetching bikes:', error);
          }
        };
    
        fetchBikes();
      }, []);


    const handleBooking = async (bikeId: number) => {
        const bookingDate = prompt('Enter the booking date (yyyy-MM-dd):');

        if (bookingDate) {
            const userId = localStorage.getItem('userId'); // Get user ID from local storage
            if (userId) {
                const bookingData = { 
                    userId: parseInt(userId, 10),
                    bikeId: bikeId, // Pass bikeId as a number
                    bookingDate: bookingDate // Send the date string directly
                };

                try {
                    const response = await fetch('http://localhost:8080/bookings/save', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(bookingData),
                    });

                    if (response.ok) {
                        alert('Booking successful');
                    } else {
                        const errorText = await response.text();
                        alert('Error booking: ' + errorText);
                    }
                } catch (error) {
                    alert('Error booking: ' + error);
                }
            } else {
                alert('User ID not found');
            }
        } else {
            alert('Booking date is required');
        }
    };

   
    
    
    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };
    

    
    // Dummy function to get bike ID based on product name
    const getBikeId = (productName: string): number | null => {
        const bikeIds: { [key: string]: number } = {
            'XSR900 GP': 1,
            'YZ450F 50th Anniversary Edition': 2,
            'XSR900': 3,
        };
        return bikeIds[productName] || null;
    };

    return (
        <div className="homeContainer">
            <header>
                <div className="NavBar">
                    <div className="logo">
                        <h1>BikeKudam</h1>
                        
                    </div>
                    <nav>
                        <ul>
                        <li><Link to="/home">Bikes</Link></li>
                        <li><a href="#" onClick={toggleSidebar}>Cart</a></li>
                        {/* <li><Link to="/account">Account</Link></li> */}
                        <li><a href="#" onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="homeheader">Home Page</div>
                <div className="products">
                {bikes.map(bike => (
                        <div className="product" key={bike.id}>
                         <img src={bike.imageUrl} alt={bike.model} />
                        <div className="product-info">
                        <p>{bike.model}</p>
                        <p>£{bike.price}</p>
                        <button className="bookNow" onClick={() => handleBooking(bike.id)}>Book Now</button>
                       
                   
                    </div>
                </div>    ))}
                </div>
            </main>
            
            {sidebarOpen && (
                <Sidebar
                  userId={parseInt(localStorage.getItem('userId') || '0', 10)}
                  onClose={toggleSidebar}
                />
              )}
        </div>
    );
}

export default Home;
