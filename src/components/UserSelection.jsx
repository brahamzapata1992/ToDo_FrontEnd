import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const UserSelection = () => {
  const [users, setUsers] = useState([]);
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleSelectUser = (user) => {
    setUser(user);
    navigate('/tasks');
  };

  return (
    <div>
      <h2>Selecciona un Usuario</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleSelectUser(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSelection;
