import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const AssessmentsPage = () => {
  const [assessments, setAssessments] = useState([]);
  const role = localStorage.getItem('role'); // 'Instructor' or 'Student'

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const res = await api.get('/Assessments');
      setAssessments(res.data);
    } catch (err) {
      console.error('Error loading assessments', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this assessment?')) return;

    try {
      await api.delete(`/Assessments/${id}`);
      fetchAssessments(); // refresh after delete
    } catch (err) {
      console.error('Failed to delete assessment', err);
      alert('Failed to delete assessment. Please try again.');
    }
  };

  const parseQuestions = (questionsString) => {
    try {
      const parsed = JSON.parse(questionsString);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Assessments</h2>

      {role === 'Instructor' && (
        <div className="mb-6">
          <button
            className="btn btn-primary"
            onClick={() => window.location.href = '/assessments/create'}
          >
            + Create New Assessment
          </button>
        </div>
      )}

      {assessments.length === 0 ? (
        <p>No assessments available.</p>
      ) : (
        <div className="space-y-6">
          {assessments.map((a) => (
            <div key={a.AssessmentId} className="border border-gray-300 rounded-lg shadow-md p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold">{a.Title}</h3>
                {role === 'Instructor' && (
                  <button
                    onClick={() => handleDelete(a.AssessmentId)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                )}
              </div>

              <p className="text-gray-600 mb-1">
                <strong>Max Score:</strong> {a.MaxScore}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Course:</strong> {a.CourseName || a.CourseId}
              </p>

              <div className="bg-gray-100 p-4 rounded">
                <h4 className="font-semibold text-lg mb-2">Questions:</h4>
                {parseQuestions(a.Questions).length === 0 ? (
                  <p>No questions available.</p>
                ) : (
                  parseQuestions(a.Questions).map((q, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-semibold">
                        Q{index + 1}: {q.question}
                      </p>
                      <ul className="list-disc ml-5 mt-1">
                        {q.options.map((opt, i) => (
                          <li
                            key={i}
                            className={opt === q.answer ? 'text-green-600 font-semibold' : ''}
                          >
                            {opt}
                            {opt === q.answer && ' '}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssessmentsPage;
