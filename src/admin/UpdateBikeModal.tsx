import React, { useState } from 'react';
import axios from 'axios';
import '../assets/cssFolder/UpdateBike.css'; 

interface Bike {
  id: number;
  model: string;
  brand: string;
  status: string;
  description: string;
  imageUrl: string;
  price: string;
}

interface UpdateBikeModalProps {
  bike: Bike;
  onClose: () => void;
  onUpdate: (updatedBike: Bike) => void;
}

const UpdateBikeModal: React.FC<UpdateBikeModalProps> = ({ bike, onClose, onUpdate }) => {
  const [updatedBike, setUpdatedBike] = useState<Bike>({ ...bike });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedBike(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/bikes/update/${bike.id}`, updatedBike);
      onUpdate(updatedBike);
      onClose();
    } catch (error) {
      console.error('Error updating bike:', error);
    }
  };

  


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Bike</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Model:
            <input type="text" name="model" value={updatedBike.model} onChange={handleInputChange} />
          </label>
          <label>
            Brand:
            <input type="text" name="brand" value={updatedBike.brand} onChange={handleInputChange} />
          </label>
          <label>
            Status:
            <input type="text" name="status" value={updatedBike.status} onChange={handleInputChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={updatedBike.description} onChange={handleInputChange} />
          </label>
          <label>
            Price:
            <input type="text" name="price" value={updatedBike.price} onChange={handleInputChange} />
          </label>
          <label>
            Image URL:
            <input type="text" name="imageUrl" value={updatedBike.imageUrl} onChange={handleInputChange} />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBikeModal;
