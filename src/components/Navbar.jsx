// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
        <Link to="/dashboard">EduSync</Link>
      </div>
      <div className="space-x-4 flex items-center">
        {role === 'Instructor' && (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/courses" className="hover:underline">Courses</Link>
            <Link to="/assessments" className="hover:underline">Assessments</Link>
            <Link to="/results" className="hover:underline">Results</Link>
            <Link to="/students" className="hover:underline">Students</Link>
          </>
        )}
        {role === 'Student' && (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/student/courses" className="hover:underline">Courses</Link>
            <Link to="/student/results" className="hover:underline">My Results</Link>
          </>
        )}
        <Link to="/profile" className="hover:underline">Profile</Link>
        {name && (
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
