// Login.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'; // Si tu utilises Axios
import { useNavigate } from 'react-router-dom'; // Pour la redirection

const Login = ({ onSwitchToRegister }) => {
  const navigate = useNavigate(); // Hook pour la navigation

  // Gestion des états pour les champs du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Fonction pour mettre à jour les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      // Envoie les données à l'API
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
        email: formData.email,
        password: formData.password,
      });

      // Affiche une notification de succès
      toast.success(`Connexion réussie, bienvenue ${response.data.user.username} !`);

      // Redirige vers la page principale après succès
      console.log('Utilisateur connecté avec succès');
      // Ici, tu peux ajouter la logique pour stocker les tokens (access/refresh) si nécessaire
    } catch (err) {
      // Affiche une notification d'échec
      const errorMessage =
        err.response?.data?.message || 'Erreur lors de la connexion.';
      toast.error(errorMessage);
    }
  };

  // Fonction pour gérer le clic sur "Forgot Password"
  const handleForgotPassword = async () => {
    try {
      // Vérifie que l'email est rempli
      if (!formData.email) {
        toast.error('Veuillez entrer votre email.');
        return;
      }

      // Envoie une requête à l'API pour réinitialiser le mot de passe
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/password-reset/',
        {
          email: formData.email,
        }
      );

      // Affiche une notification de succès
      toast.success(response.data.message);

      // Redirige vers la page de confirmation de réinitialisation
      navigate('/password-reset-confirm'); // Redirection vers PasswordResetConfirm.jsx
    } catch (error) {
      // Affiche une notification d'échec
      const errorMessage =
        error.response?.data?.message || 'Erreur lors de l’envoi du code de vérification.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="form-box login">
      <h2 className="title animation" style={{ "--i": 0 }}>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Champ Email */}
        <div className="input-box animation" style={{ "--i": 1 }}>
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

        {/* Champ Password */}
        <div className="input-box animation" style={{ "--i": 2 }}>
          <input
            type="password"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <i className='bx bxs-lock-alt'></i>
        </div>

        {/* Lien Forgot Password */}
        <div className="linkTxt animation" style={{ "--i": 3 }}>
          <p>
            <a href="#" onClick={(e) => { e.preventDefault(); handleForgotPassword(); }}>
              Forgot Password?
            </a>
          </p>
        </div>

        {/* Bouton Submit */}
        <button type="submit" className="btn animation" style={{ "--i": 4 }}>
          Login
        </button>

        {/* Lien Register */}
        <div className="linkTxt animation" style={{ "--i": 5 }}>
          <p>
            Don't have an account?{' '}
            <a href="#" onClick={onSwitchToRegister}>Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;