// src/components/Auth/PasswordResetConfirm.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Ajouté ici

const PasswordResetConfirm = () => {
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
  });

  const navigate = useNavigate(); // ✅ Hook ajouté ici

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.verificationCode || !formData.newPassword) {
        toast.error('Veuillez remplir tous les champs.');
        return;
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/password-reset-confirm/',
        {
          email: formData.email,
          verification_code: formData.verificationCode,
          new_password: formData.newPassword,
        }
      );

      // ✅ Afficher un message de succès
      toast.success("Mot de passe modifié avec succès !");
      
      // ✅ Rediriger vers la page de login après 1 seconde (ou directement)
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erreur lors de la modification.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="form-box register">
      <h2 className="title animation" style={{ "--i": 17 }}>Modifier Mot de Passe</h2>
      <form onSubmit={handleSubmit}>
        {/* Champ Email */}
        <div className="input-box animation" style={{ "--i": 19 }}>
          <input
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <i className='bx bxs-envelope'></i>
        </div>

        {/* Champ Code de vérification */}
        <div className="input-box animation" style={{ "--i": 18 }}>
          <input
            type="text"
            required
            name="verificationCode"
            value={formData.verificationCode}
            onChange={handleChange}
          />
          <label htmlFor="verificationCode">Code de vérification</label>
          <i className='bx bxs-user'></i>
        </div>

        {/* Champ Nouveau Mot de Passe */}
        <div className="input-box animation" style={{ "--i": 20 }}>
          <input
            type="password"
            required
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <label htmlFor="newPassword">Nouveau Mot de Passe</label>
          <i className='bx bxs-lock-alt'></i>
        </div>

        {/* Bouton Modifier */}
        <button type="submit" className="btn animation" style={{ "--i": 21 }}>
          Modifier
        </button>
      </form>
    </div>
  );
};

export default PasswordResetConfirm;