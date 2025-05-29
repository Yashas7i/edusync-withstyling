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
    hour12: true,
  }).format(new Date(dateString + 'Z'));
};

const ResultsPage = () => {
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState('');
  const [results, setResults] = useState([]);
  const [maxScore, setMaxScore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const res = await api.get('/Assessments');
      setAssessments(res.data);
    } catch (err) {
      console.error('Failed to load assessments', err);
    }
  };

  const fetchResults = async (assessmentId) => {
    try {
      setLoading(true);
      const res = await api.get(`/Results/Assessment/${assessmentId}`);
      setResults(res.data);
      const assessment = assessments.find(a => a.AssessmentId === assessmentId);
      setMaxScore(assessment ? assessment.MaxScore : null);
    } catch (err) {
      console.error('Failed to load results', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssessmentChange = (e) => {
    const id = e.target.value;
    setSelectedAssessmentId(id);
    if (id) {
      fetchResults(id);
    } else {
      setResults([]);
      setMaxScore(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Assessment Results</h2>

      <div className="mb-4">
        <label className="block font-medium mb-2">Select an assessment:</label>
        <select
          className="form-select w-full p-2 border rounded"
          value={selectedAssessmentId}
          onChange={handleAssessmentChange}
        >
          <option value="">-- Select Assessment --</option>
          {assessments.map((a) => (
            <option key={a.AssessmentId} value={a.AssessmentId}>
              {a.Title}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading results...</p>
      ) : selectedAssessmentId && results.length === 0 ? (
        <p className="text-gray-600">No results found for this assessment.</p>
      ) : results.length > 0 ? (
        <table className="table-auto w-full mt-4 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r.ResultId || i}>
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border">{r.UserName || 'N/A'}</td>
                <td className="p-2 border">{r.Score}{maxScore !== null ? ` / ${maxScore}` : ''}</td>
                <td className="p-2 border">{r.AttemptDate ? formatDateToIST(r.AttemptDate) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default ResultsPage;
