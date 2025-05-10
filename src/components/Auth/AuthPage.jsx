import React, { useState } from 'react';
import Login from './login';
import Register from './register';
import '../../styles/auth.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={`wrapper ${!isLogin ? 'active' : ''}`}>
      {/* Rotating backgrounds */}
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>{/* Info Texts */}
      <div className="info-text login">
        <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>Welcome Back!</h2>
        <p className="animation" style={{ "--i": 1, "--j": 21 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, rem?</p>
      </div>

      <div className="info-text register">
        <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>Welcome Back!</h2>
        <p className="animation" style={{ "--i": 18, "--j": 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, rem?</p>
      </div>

      {/* Conditional rendering dof forms */}
      {isLogin ? (
        <Login  onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default AuthPage;