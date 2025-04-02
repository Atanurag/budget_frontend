import { app, database } from './firebaseconfig.js';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
const Lo = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let signupCol = collection(database, 'users');
      // Add a new document with a generated ID
      await addDoc(signupCol, {
        name,
        email,
        password,
      });
      // Clear the form
      setName('');
      setEmail('');
      setPassword('');
      setError('');
      alert('User  registered successfully!');
    } catch (err) {
      setError('Error adding document: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Lo;
