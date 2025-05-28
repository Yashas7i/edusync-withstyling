// src/pages/StudentsListPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const StudentsListPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get('/Users/Students')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Failed to fetch students', err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Students</h2>
      <table className="table w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600">
        <thead className="bg-slate-100 dark:bg-slate-700">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, index) => (
            <tr key={s.Id}>
              <td>{index + 1}</td>
              <td>{s.Name}</td>
              <td>{s.Email}</td>
              <td>{s.Role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsListPage;
