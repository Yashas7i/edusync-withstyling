import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const formatDateToIST = (dateString) => {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  }).format(new Date(dateString + 'Z'));
};

const StudentResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assessmentMap, setAssessmentMap] = useState({});

  useEffect(() => {
    fetchResults();
    fetchAssessments();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await api.get('/Results/User');
      setResults(res.data);
    } catch (err) {
      console.error('Failed to load results', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssessments = async () => {
    try {
      const res = await api.get('/Assessments');
      const map = {};
      res.data.forEach(a => {
        map[a.AssessmentId] = a.MaxScore;
      });
      setAssessmentMap(map);
    } catch (err) {
      console.error('Failed to load assessments', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-6">My Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Assessment</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r.ResultId}>
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border">{r.AssessmentTitle || 'Untitled'}</td>
                <td className="p-2 border">
                  {r.Score}
                  {assessmentMap[r.AssessmentId] != null ? ` / ${assessmentMap[r.AssessmentId]}` : ''}
                </td>
                <td className="p-2 border">{formatDateToIST(r.AttemptDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentResultsPage;
