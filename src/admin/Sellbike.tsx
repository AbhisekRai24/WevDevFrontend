import React, { useState, useEffect } from 'react';
import '../assets/cssFolder/sellbike.css';
import '../assets/cssFolder/navbar.css'
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const SellBike: React.FC = () => {

    const [products, setProducts] = useState<any[]>([]);
    const [newProduct, setNewProduct] = useState({
        model: '',
        brand:'',

        description: '',
        imageUrl: '',
        price: ''
      

      
      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };
  

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8080/bikes/bikecreate', newProduct);
            toast.success('Your product has been listed!');
            
            setNewProduct({
                model: '',
                brand:'',
                description: '',
                imageUrl: '',
                price: ''
              
            });
        } catch (error) {
            console.error('Error creating bike:', error);
            toast.error('Failed to list bike.');
        }

    
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
                        <li><a href="#" >Logout</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="sell-bike-container">
                <h2>Sell Your Bike</h2>
                <div className="form-container">
                    <div className="image-upload">
                        <div className="upload-placeholder">
                            <label>Image</label>
                            <input type= {"file"}/>
                        </div>
                    </div>
                    <div className="form-fields">
                        <input        type="text"
                            name="model"
                            placeholder="Model"
                            value={newProduct.model}
                            onChange={handleChange}/>
                        <input  type="text"
                            name="brand"
                            placeholder="Brand"
                            value={newProduct.brand}
                            onChange={handleChange} />
                       
                        <textarea name="description"
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={handleChange}></textarea>
                        <input  type="text"
                            name="price"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={handleChange}/>
                       <button type="button" onClick={handleSubmit}>Sale</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
        
    );
};

export default SellBike;
