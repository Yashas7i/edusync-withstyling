import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ Title: '', Description: '' });
  const [file, setFile] = useState(null);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/Courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('Title', form.Title);
      formData.append('Description', form.Description);
      if (file) {
        formData.append('mediaFile', file);
      }

      if (editingCourseId) {
        // For update, still send to normal endpoint
        await api.put(`/Courses/${editingCourseId}`, {
          ...form,
          MediaUrl: file ? 'UPDATED_THROUGH_BLOB' : '' // optional
        });
      } else {
        await api.post('/Courses/AddCourse', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setForm({ Title: '', Description: '' });
      setFile(null);
      setEditingCourseId(null);
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course) => {
    setForm({
      Title: course.Title || '',
      Description: course.Description || ''
    });
    setEditingCourseId(course.CourseId);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/Courses/${id}`);
        setCourses(courses.filter((c) => c.CourseId !== id));
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>

      {role === 'Instructor' && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">{editingCourseId ? 'Edit Course' : 'Create New Course'}</h4>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="Title"
              placeholder="Title"
              className="form-control"
              value={form.Title}
              onChange={handleChange}
              required
            />
            <textarea
              name="Description"
              placeholder="Description"
              className="form-control"
              value={form.Description}
              onChange={handleChange}
            />
            <input
              type="file"
              name="mediaFile"
              className="form-control"
              onChange={handleFileChange}
            />
            <button type="submit" className="btn btn-primary">
              {editingCourseId ? 'Update' : 'Create'}
            </button>
            {editingCourseId && (
              <button type="button" className="btn btn-secondary ml-2" onClick={() => {
                setEditingCourseId(null);
                setForm({ Title: '', Description: '' });
                setFile(null);
              }}>
                Cancel
              </button>
            )}
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.CourseId} className="border p-4 rounded shadow-sm">
              <h3 className="text-xl font-semibold">{course.Title}</h3>
              <p className="text-gray-700">{course.Description || 'No description provided.'}</p>

              {course.MediaUrl && (
                <a
                  href={course.MediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  📥 Download Material
                </a>
              )}

              {course.InstructorName && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Instructor:</strong> {course.InstructorName}
                </p>
              )}

              {role === 'Instructor' && (
                <div className="mt-2 space-x-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(course)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(course.CourseId)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
