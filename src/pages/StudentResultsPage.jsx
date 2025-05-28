import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const StudentResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await api.get('/Results/User');
      setResults(res.data);
    } catch (err) {
      console.error('Failed to fetch student results', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter results that are older than 30 minutes (hide recent ones)
  const now = new Date();
  const delayMinutes = 30;
  const visibleResults = results.filter((r) => {
    const attemptDate = new Date(r.AttemptDate);
    const diff = (now - attemptDate) / (1000 * 60); // in minutes
    return diff >= delayMinutes;
  });

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-4">Your Assessment Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : visibleResults.length === 0 ? (
        <p>No results available yet. Please check back later.</p>
      ) : (
        <table className="table table-bordered w-full mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Assessment</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {visibleResults.map((r, index) => (
              <tr key={r.ResultId || index}>
                <td>{index + 1}</td>
                <td>{r.AssessmentTitle || 'Untitled'}</td>
                <td>{r.Score}</td>
                <td>
                  {new Date(r.AttemptDate).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentResultsPage;
