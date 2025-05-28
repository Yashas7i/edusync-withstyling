// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/Users/Profile')
      .then(res => {
        setName(res.data.Name);
        setEmail(res.data.Email);
      })
      .catch(err => console.error('Failed to load profile', err));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/Users/Profile', {
        Name: name,
        Email: email,
        Password: password
      });
      setMsg('Profile updated successfully.');
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } catch (err) {
      console.error('Update failed', err);
      setMsg('Failed to update profile.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      {msg && <p className="mb-3 text-sm text-green-600">{msg}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label>Name</label>
          <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>New Password (optional)</label>
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfilePage;
