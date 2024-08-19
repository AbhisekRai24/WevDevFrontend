import React from 'react';
import '../assets/cssFolder/footer.css';

export const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-content">
                    <p>&copy; 2024 BikeSell. All rights reserved.</p>
                    <p>
                        Your trusted platform to buy and sell bikes. We connect buyers and sellers to ensure a smooth, safe, and enjoyable transaction experience. Whether you're looking for a new ride or selling your old one, We are here to help.
                    </p>
                    <nav className="footer-nav">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Contact Us</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
