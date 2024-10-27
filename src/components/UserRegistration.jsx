import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserRegistration.css'

const UserRegistration = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

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
    <div>
        <div className='Container_principal'>
            <h2>Registro de Usuario</h2>
             <input
                type="text"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleRegister}>Registrar</button>
        </div>      
    </div>
  );
};

export default UserRegistration;
