import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserRegistration.css';

const UserRegistration = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Mover la declaración de images fuera de handleRegister
  const images = [
    '/src/assets/avatars/Av1.png',
    '/src/assets/avatars/Av2.png',
    '/src/assets/avatars/Av3.png',
    '/src/assets/avatars/Av4.png',
    '/src/assets/avatars/Av5.png',
    '/src/assets/avatars/Av6.png',
    '/src/assets/avatars/Av7.png',
    '/src/assets/avatars/Av8.png',
    '/src/assets/avatars/Av9.png',
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
        <button className='botton_form' onClick={handleRegister}>Registrar</button>
      </div>
    </div>
  );
};

export default UserRegistration;
