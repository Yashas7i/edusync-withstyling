// src/components/MinimalNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MinimalNavbar = () => (
  <nav className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 py-4 shadow-sm">
    <div className="container mx-auto px-4">
      <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-white">
        EduSync
      </Link>
    </div>
  </nav>
);

export default MinimalNavbar;
