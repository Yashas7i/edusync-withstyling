import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchCourses();
  }, []);

  const userRole = localStorage.getItem('role');

  return (
    <div className="bg-white shadow p-6 rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Available Courses</h2>

        {userRole === 'Instructor' && (
          <a href="/courses/create" className="btn btn-primary">
            + Add New Course
          </a>
        )}
      </div>

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
              {course.InstructorName && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Instructor:</strong> {course.InstructorName}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
