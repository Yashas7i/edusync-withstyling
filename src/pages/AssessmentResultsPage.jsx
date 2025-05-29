import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const AssessmentResultsPage = () => {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState('');
  const [maxScore, setMaxScore] = useState(null);

  useEffect(() => {
    fetchAssessmentTitle();
    fetchResults();
  }, [id]);

  const fetchAssessmentTitle = async () => {
    try {
      const res = await api.get(`/Assessments/${id}`);
      setTitle(res.data.Title);
      setMaxScore(res.data.MaxScore);
    } catch (err) {
      console.error('Error fetching assessment title', err);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await api.get(`/Results/Assessment/${id}`);
      setResults(res.data);
    } catch (err) {
      console.error('Error fetching results', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Results for: {title}</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <table className="table w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600">
          <thead className="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Score</th>
              <th>Attempt Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, index) => (
              <tr key={r.ResultId}>
                <td>{index + 1}</td>
                <td>{r.UserName}</td>
                <td>{r.Score}{maxScore !== null ? ` / ${maxScore}` : ''}</td>
                <td>{formatDateToIST(r.AttemptDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssessmentResultsPage;
