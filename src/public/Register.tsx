import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/cssFolder/register.css'

const Register: React.FC = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

         // Simple validation
         if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            setError('');
            setSuccessMessage('');

            // Simulate sending data to the backend
            const response = await fetch('https://your-backend-api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to register. Please try again.');
            }

            // Assuming registration is successful
            setSuccessMessage('Registered successfully! Redirecting to login');

            // Clear the form
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            // Wait for a moment to let the user see the success message
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect to the login page after 2 seconds
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (


        
        <div className="bgRegister">
            <div className="registerContainer">
                <h1>Register</h1>
                <form>
                    <input type="text" placeholder="Username" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="Confirm Password" required />
                    <button type="submit" className="registerbtn">Register</button>
                </form>
                <p>If you are new to our website, please register by filling information in the above fields.<br />
                    Gain access to our features and browse the motor bikes and scooters to your liking.</p>
            </div>
        </div>
    );
};

export default Register;
