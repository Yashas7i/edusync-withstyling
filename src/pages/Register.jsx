import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/Auth/register', {
        Name: form.name,
        Email: form.email,
        Password: form.password,
        Role: form.role
      });
      navigate('/login');
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-800 px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-700 shadow-lg rounded-2xl overflow-hidden">
        
        {/* Illustration */}
        <div className="hidden md:flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-300">Join EduSync</h2>
            <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-200">Shape your learning journey.</p>
            <img
              src="/education2.svg"
              alt="Learning Illustration"
              className="mt-4 max-h-64 w-auto mx-auto object-contain"
            />
          </div>
        </div>

        {/* Form */}
        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Create your account</h2>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-600 dark:text-white border-slate-300 dark:border-slate-500"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-600 dark:text-white border-slate-300 dark:border-slate-500"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-600 dark:text-white border-slate-300 dark:border-slate-500"
              value={form.password}
              onChange={handleChange}
              required
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-600 dark:text-white border-slate-300 dark:border-slate-500"
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
            >
              Register
            </button>
          </form>
          <p className="text-sm mt-6 text-center text-slate-600 dark:text-slate-300">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
