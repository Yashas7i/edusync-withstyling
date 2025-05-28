import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const EditCoursePage = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    Title: '',
    Description: '',
    MediaUrl: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/Courses/${id}`)
      .then(res => {
        const { Title, Description, MediaUrl } = res.data;
        setForm({ Title, Description, MediaUrl });
      })
      .catch(err => console.error('Failed to load course', err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/Courses/${id}`, form);
      navigate('/courses');
    } catch (err) {
      console.error('Failed to update course', err);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input name="Title" className="form-control" required value={form.Title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="Description" className="form-control" value={form.Description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Media URL</label>
          <input name="MediaUrl" className="form-control" value={form.MediaUrl} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCoursePage;
