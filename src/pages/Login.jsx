import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/Auth/login', { Email: email, Password: password });

      localStorage.setItem('token', res.data.Token);
      localStorage.setItem('userId', res.data.UserId);
      localStorage.setItem('name', res.data.Name);
      localStorage.setItem('email', res.data.Email);
      localStorage.setItem('role', res.data.Role);

      navigate('/dashboard');
    } catch {
      setError('Invalid email or password.');
    }
  };

  return (
    // This container uses padding to center the form
    <div className="bg-slate-100 dark:bg-slate-800 px-4 py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-700 shadow-lg rounded-2xl overflow-hidden">
        
        {/* Left - Illustration */}
        <div className="hidden md:flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-300">Welcome Back!</h2>
            <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-200">Learn. Grow. Succeed.</p>
            <img
               src="/education1.svg"
               alt="Education Illustration"
               className="mt-4 w-full max-w-xs mx-auto"
            />
          </div>
        </div>

        {/* Right - Form */}
        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Login to EduSync</h2>
          {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-600 dark:text-white border-slate-300 dark:border-slate-500 focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-600 dark:text-white border-slate-300 dark:border-slate-500 focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm mt-4 text-center text-slate-600 dark:text-slate-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-500 hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;