import React, { useState } from 'react';
import '../assets/cssFolder/login.css'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import { Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8080/login/authentication', { // Replace with your actual backend URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('Response:', response);  // Debug: Check response status
            console.log('Data:', data); 

            if (response.ok) {
                // Store token or userId or any other info as needed
                // For example:
                localStorage.setItem('userId', data.userId); // Save userId if returned


                if (email === 'admin@gmail.com' && password === 'passwordadmin') { 
                    console.log('Admin login detected'); // Debugging
                    toast.success('Welcome Admin!', {
                        position: 'top-center',
                    });
                    navigate('/admin/dashboard'); // Check if this path is correct
                    
                
                }else{ toast.success('Welcome to BikeKudam!', {
                    position: 'top-center',
                });

                navigate('/home'); // Navigate to the homepage on successful login
                }
            } else {
                // Display error message from API
                console.error('Login error:', error);
                setError(data.message || 'Login failed');
                toast.error(data.message || 'Login failed', {
                    position: 'top-center', // Use string value directly    
                });
            }
        } catch (error) {
            setError('An error occurred during login');
            toast.error('An error occurred during login', {
                position: 'top-center', // Use string value directly
            });
        }
    };
    return (

        
        <div className="bg">
            <div className="loginContainer">
                <h1>Sign in to your account</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  required />
                    <input type="password" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)} required />
                    
                    <button type="submit" className="loginbtn">Login</button>
                </form>
                {error && <p className="error">{error}</p>}
              
                <p>New to this app? Click <Link to="/register">Register</Link>
                </p>
             
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;











