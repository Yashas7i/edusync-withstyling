import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const TakeAssessmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await api.get(`/Assessments/${id}`);
        const parsedQuestions = JSON.parse(res.data.Questions);
        setAssessment({ ...res.data, Questions: parsedQuestions });
      } catch (err) {
        console.error('Failed to load assessment', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [id]);

  const handleChange = (qIndex, selectedOption) => {
    setAnswers({ ...answers, [qIndex]: selectedOption });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalQuestions = assessment.Questions.length;
    const scorePerQuestion = assessment.MaxScore / totalQuestions;
    const rawScore = assessment.Questions.reduce((total, q, index) => {
      return total + (answers[index] === q.answer ? scorePerQuestion : 0);
    }, 0);
    const finalScore = Math.round(rawScore);

    try {
      await api.post('/Results', {
        AssessmentId: assessment.AssessmentId,
        Score: finalScore
      });
      setSubmitted(true);
      setTimeout(() => {
        navigate('/student/results');
      }, 3000);
    } catch (err) {
      console.error('Error submitting result', err);
    }
  };

  if (loading || !assessment) return <p>Loading assessment...</p>;

  if (submitted) {
    return (
      <div className="bg-white p-6 rounded shadow max-w-xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-semibold text-green-700">
          ✅ Thank you for submitting your assessment!
        </h2>
        <p className="mt-2 text-gray-600">
          Your result will be available once it is published by your instructor.
        </p>
        <p className="text-sm text-gray-400 mt-4">Redirecting to results page...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{assessment.Title}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {assessment.Questions.map((q, index) => (
          <div key={index} className="border p-4 rounded bg-gray-50">
            <p className="font-semibold mb-2">Q{index + 1}: {q.question}</p>
            <div className="space-y-1">
              {q.options.map((opt, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={opt}
                    checked={answers[index] === opt}
                    onChange={() => handleChange(index, opt)}
                    className="mr-2"
                    required
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-success">Submit Assessment</button>
      </form>
    </div>
  );
};

export default TakeAssessmentPage;