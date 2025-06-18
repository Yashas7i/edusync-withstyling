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

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};

    // Name: only alphabets and spaces, min 3 chars
    if (!/^[a-zA-Z ]{3,30}$/.test(form.name.trim())) {
      newErrors.name = 'Name must be 3–30 letters with spaces only.';
    }

    // Email: Professional pattern and only trusted domains
    const email = form.email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|in|co|gov|io|me|dev)$/i;
    const allowedDomains = [
      'gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com',
      'icloud.com', 'protonmail.com', 'edusync.com',
      'edu.in', 'mail.com', 'aol.com', 'zoho.com',
      'gmx.com', 'live.com', 'student.edu', 'college.edu'
    ];

    if (!emailRegex.test(email)) {
      newErrors.email = 'Enter a valid professional email address.';
    } else {
      const domain = email.split('@')[1]?.toLowerCase();
      if (!allowedDomains.includes(domain)) {
        newErrors.email = 'Only trusted domains are allowed.';
      }
    }

    // Password: min 8 chars, upper, lower, number, symbol
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=-])[A-Za-z\d@$!%*?&#^+=-]{8,}$/.test(
        form.password
      )
    ) {
      newErrors.password =
        'Password must be 8+ characters with uppercase, lowercase, number & special symbol.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      await api.post('/Auth/register', {
        Name: form.name.trim(),
        Email: form.email.trim(),
        Password: form.password,
        Role: form.role
      });
      navigate('/login');
    } catch (error) {
      setServerError('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-800 px-3.5 py-5.5 transition-colors duration-300">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-700 shadow-lg rounded-2xl overflow-hidden">
        
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
        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Create your account</h2>
          {serverError && <p className="text-red-500 mb-3 text-sm">{serverError}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                className={`w-full px-3 py-2 border rounded ${
                  errors.name ? 'border-red-500' : 'border-slate-300'
                } bg-white dark:bg-slate-600 dark:text-white focus:ring-2 focus:ring-indigo-500`}
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className={`w-full px-3 py-2 border rounded ${
                  errors.email ? 'border-red-500' : 'border-slate-300'
                } bg-white dark:bg-slate-600 dark:text-white focus:ring-2 focus:ring-indigo-500`}
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className={`w-full px-3 py-2 border rounded ${
                  errors.password ? 'border-red-500' : 'border-slate-300'
                } bg-white dark:bg-slate-600 dark:text-white focus:ring-2 focus:ring-indigo-500`}
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-600 dark:text-white border-slate-300 dark:border-slate-500 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm mt-4 text-center text-slate-600 dark:text-slate-300">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
