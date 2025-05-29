import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const StudentAssessmentListPage = () => {
  const { courseId } = useParams();
  const [assessments, setAssessments] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssessments();
    fetchCourseTitle();
  }, [courseId]);

  const fetchAssessments = async () => {
    try {
      const res = await api.get(`/Assessments/ByCourse/${courseId}`);
      setAssessments(res.data);
    } catch (err) {
      console.error('Failed to fetch assessments', err);
    }
  };

  const fetchCourseTitle = async () => {
    try {
      const res = await api.get(`/Courses/${courseId}`);
      setCourseTitle(res.data.Title);
    } catch (err) {
      console.error('Course title fetch failed', err);
    }
  };

  const handleTake = (id) => navigate(`/student/assessments/${id}/take`);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">
        Assessments for: {courseTitle}
      </h2>

      {assessments.length === 0 ? (
        <p>No assessments found.</p>
      ) : (
        <div className="space-y-4">
          {assessments.map((a) => (
            <div
              key={a.AssessmentId}
              className="bg-white dark:bg-slate-800 shadow rounded p-4 border dark:border-slate-700"
            >
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
                {a.Title}
              </h3>

              <button
                onClick={() => handleTake(a.AssessmentId)}
                className="mt-3 btn btn-outline-success"
              >
                Take Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentAssessmentListPage;
