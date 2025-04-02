import React, { useState } from 'react'; 
import { app, database } from './firebaseconfig.js';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './lo.css';

const auth = getAuth(app);

const AuthScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        alert('Login successful! Token: ' + token);
      } catch (err) {
        setError('Error logging in: ' + err.message);
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const signupCol = collection(database, 'users');
        await addDoc(signupCol, { name, email, password });
        setName('');
        setEmail('');
        setPassword('');
        setError('');
        alert('User registered successfully! User ID: ' + user.uid);
      } catch (err) {
        setError('Error adding document: ' + err.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="left-side">
        <img src="path/to/logo.png" alt="Logo" className="logo" />
        <h1>HIGHBRIDGE</h1>
        <p className="description">Your description goes here. This is a brief overview of what HIGHBRIDGE is about.</p>
      </div>
      <div className="right-side">
        <h2>{isLogin ? 'Welcome Back' : 'Signup'}</h2>
        <p className="sub-text">{isLogin ? 'Login to your account' : 'Signup to your account'}</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="bold-label">Name:</label>
              <input type="text" placeholder="Type here..." value={name} onChange={(e) => setName(e.target.value)} required={!isLogin} />
            </div>
          )}
          <div>
            <label className="bold-label">Email:</label>
            <input type="email" placeholder="Type here..." value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="bold-label">Password:</label>
            <input type="password" placeholder="Type here..." value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="orange-button" type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        
        <div className="or-section">
          <hr /><span>OR</span><hr />
        </div>
        
        <div className="social-login">
        <button class="social-btn">
    <img src="path-to-google-icon.png" alt="Google" />
    Login with Google
</button>

<button class="social-btn">
    <img src="path-to-google-icon.png" alt="Google" />
    Login with FB
</button>

        </div>
        
        <p className="switch-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'New User? Signup Way' : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
