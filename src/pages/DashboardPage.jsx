// src/pages/DashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Welcome, {name}!</h2>
      <p className="text-gray-600 dark:text-slate-300 mb-4">
        You are logged in as a <strong>{role}</strong>.
      </p>

      {role === 'Instructor' && (
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/courses" className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded shadow hover:bg-indigo-200 dark:hover:bg-indigo-800">
            Manage Courses
          </Link>
          <Link to="/assessments" className="bg-pink-100 dark:bg-pink-900 p-4 rounded shadow hover:bg-pink-200 dark:hover:bg-pink-800">
            Manage Assessments
          </Link>
          <Link to="/results" className="bg-green-100 dark:bg-green-900 p-4 rounded shadow hover:bg-green-200 dark:hover:bg-green-800">
            View Results
          </Link>
          <Link to="/students" className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded shadow hover:bg-yellow-200 dark:hover:bg-yellow-800">
            View Students
          </Link>
        </div>
      )}

      {role === 'Student' && (
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/student/courses" className="bg-blue-100 dark:bg-blue-900 p-4 rounded shadow hover:bg-blue-200 dark:hover:bg-blue-800">
            📚 Browse Courses
          </Link>
          <Link to="/student/results" className="bg-green-100 dark:bg-green-900 p-4 rounded shadow hover:bg-green-200 dark:hover:bg-green-800">
            📊 View My Results
          </Link>
          <Link to="/profile" className="bg-purple-100 dark:bg-purple-900 p-4 rounded shadow hover:bg-purple-200 dark:hover:bg-purple-800">
            👤 Update Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
