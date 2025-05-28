import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const AssessmentsPage = () => {
  const [assessments, setAssessments] = useState([]);
  const role = localStorage.getItem('role');

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

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Assessments</h2>

      {assessments.length === 0 ? (
        <p>No assessments available.</p>
      ) : (
        <div className="space-y-6">
          {assessments.map((a) => (
            <div key={a.AssessmentId} className="border border-gray-300 rounded-lg shadow-md p-5">
              <h3 className="text-xl font-bold mb-1">{a.Title}</h3>
              <p className="text-gray-600 mb-1">
                <strong>Max Score:</strong> {a.MaxScore}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Course:</strong> {a.CourseName || a.CourseId}
              </p>

              <div className="bg-gray-100 p-4 rounded">
                <h4 className="font-semibold text-lg mb-2">Questions:</h4>
                {parseQuestions(a.Questions).map((q, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">Q{index + 1}: {q.question}</p>
                    <ul className="list-disc ml-5 mt-1">
                      {q.options.map((opt, i) => (
                        <li
                          key={i}
                          className={opt === q.answer ? 'text-green-600 font-semibold' : ''}
                        >
                          {opt}
                          {opt === q.answer && ' ✅'}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ✅ Helper to parse JSON questions safely
const parseQuestions = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default AssessmentsPage;
