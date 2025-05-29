import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const StudentCourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/Courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAssessments = (courseId) => {
    navigate(`/student/courses/${courseId}/assessments`);
  };

  const formatMediaUrl = (url) => {
    if (!url) return null;
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Available Courses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.CourseId}
              className="bg-white dark:bg-slate-800 shadow rounded-lg p-5 border dark:border-slate-700"
            >
              <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                {course.Title || 'Untitled Course'}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                {course.Description || 'No description available.'}
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Instructor: {course.InstructorName || 'N/A'}
              </p>

              {course.MediaUrl && (
                <a
                  href={formatMediaUrl(course.MediaUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-indigo-600 dark:text-indigo-400 underline mt-2"
                >
                  📺 View Media Content
                </a>
              )}

              <button
                onClick={() => handleViewAssessments(course.CourseId)}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-sm"
              >
                View Assessments
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCourseListPage;
