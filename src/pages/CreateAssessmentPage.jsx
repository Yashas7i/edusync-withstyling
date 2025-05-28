import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateAssessmentPage = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    Title: '',
    Questions: '',
    MaxScore: '',
    CourseId: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/Courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Failed to load courses', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/Assessments', form);
      navigate('/assessments');
    } catch (err) {
      console.error('Failed to create assessment', err);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Assessment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input name="Title" className="form-control" required value={form.Title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Questions (as JSON string)</label>
          <textarea name="Questions" className="form-control" required value={form.Questions} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Max Score</label>
          <input type="number" name="MaxScore" className="form-control" required value={form.MaxScore} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Course</label>
          <select name="CourseId" className="form-select" required value={form.CourseId} onChange={handleChange}>
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c.CourseId} value={c.CourseId}>{c.Title}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success">Create</button>
      </form>
    </div>
  );
};

export default CreateAssessmentPage;
