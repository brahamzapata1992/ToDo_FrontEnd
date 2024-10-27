import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import av1 from '../assets/avatars/Av1.png'
import av2 from '../assets/avatars/Av2.png'
import av3 from '../assets/avatars/Av3.png'
import av4 from '../assets/avatars/Av4.png'
import av5 from '../assets/avatars/Av5.png'
import av6 from '../assets/avatars/Av6.png'
import av7 from '../assets/avatars/Av7.png'
import av8 from '../assets/avatars/Av8.png'
import av9 from '../assets/avatars/Av9.png'
import './UserRegistration.css';

const UserRegistration = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
 
  const images = [
    av1,
    av2,
    av3,
    av4,
    av5,
    av6,
    av7,
    av8,
    av9,
  ];

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append('name', name);

    try {
      await axios.post('http://localhost:8080/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/select-user');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div className='Container_principal'>
      <h1 className='titulo_app'>TaskFlow</h1>
      <div className='Container_formulario'>
        <h2 className='title_form'>Register Your Name</h2>
        <input
          className='input_form'
          type="text"
          placeholder="David Mathew"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="gallery-container">
          {images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className='botton_form' onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default UserRegistration;
