// Register.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'; // Si tu utilises Axios

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/register/',
        formData
      );

      // ✅ Succès
      console.log('Inscription réussie', response.data);
      toast.success(`Bienvenue, ${formData.username} !`);
      onSwitchToLogin(); // Redirige vers Login

    } catch (error) {
      // ❌ Échec
      const errorMessage =
        error.response?.data?.message || "Erreur lors de l'inscription.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="form-box register">
      <h2 className="title animation" style={{ "--i": 17 }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Champs du formulaire */}
        <div className="input-box animation" style={{ "--i": 18 }}>
          <input
            type="text"
            required
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="">Username</label>
          <i className='bx bxs-user'></i>
        </div>

        <div className="input-box animation" style={{ "--i": 19 }}>
          <input
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <i className='bx bxs-envelope'></i>
        </div>

        <div className="input-box animation" style={{ "--i": 20 }}>
          <input
            type="password"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <i className='bx bxs-lock-alt'></i>
        </div>

        <div className="input-box animation" style={{ "--i": 21 }}>
          <input
            type="password"
            required
            name="password2"
            value={formData.password2}
            onChange={handleChange}
          />
          <label htmlFor="">Confirm Password</label>
          <i className='bx bxs-lock-alt'></i>
        </div>

        <button type="submit" className="btn animation" style={{ "--i": 22 }}>
          Sign Up
        </button>

        <div className="linkTxt animation" style={{ "--i": 23 }}>
          <p>Already have an account?{' '}
            <a href="#" onClick={onSwitchToLogin}>Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;