import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateAssessmentPage = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    Title: '',
    MaxScore: '',
    CourseId: ''
  });

  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], answer: '' }
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/Courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Failed to load courses', err));
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === 'question' || field === 'answer') {
      updated[index][field] = value;
    } else {
      updated[index].options[field] = value;
    }
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/Assessments', {
        ...form,
        MaxScore: Number(form.MaxScore), // ensure number
        Questions: JSON.stringify(questions)
      });
      alert('Assessment created successfully!');
      navigate('/assessments');
    } catch (err) {
      alert('Failed to create assessment. Check console.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Assessment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="Title"
            value={form.Title}
            onChange={handleFormChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Max Score</label>
          <input
            type="number"
            name="MaxScore"
            value={form.MaxScore}
            onChange={handleFormChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Course</label>
          <select
            name="CourseId"
            value={form.CourseId}
            onChange={handleFormChange}
            required
            className="form-select"
          >
            <option value="">Select Course</option>
            {courses.map(c => (
              <option key={c.CourseId} value={c.CourseId}>{c.Title}</option>
            ))}
          </select>
        </div>

        <h4>Questions</h4>
        {questions.map((q, idx) => (
          <div key={idx} className="border p-3 mb-3">
            <label>Question {idx + 1}</label>
            <input
              type="text"
              value={q.question}
              onChange={e => handleQuestionChange(idx, 'question', e.target.value)}
              required
              className="form-control mb-2"
            />

            <div className="row">
              {q.options.map((opt, i) => (
                <div key={i} className="col-6 mb-2">
                  <input
                    type="text"
                    value={opt}
                    onChange={e => handleQuestionChange(idx, i, e.target.value)}
                    required
                    placeholder={`Option ${i + 1}`}
                    className="form-control"
                  />
                </div>
              ))}
            </div>

            <label>Correct Answer</label>
            <input
              type="text"
              value={q.answer}
              onChange={e => handleQuestionChange(idx, 'answer', e.target.value)}
              required
              className="form-control mb-2"
            />

            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuestion(idx)}
                className="btn btn-danger btn-sm"
              >
                Remove Question
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addQuestion} className="btn btn-secondary mb-3">
          + Add Question
        </button>

        <button type="submit" className="btn btn-primary">
          Create Assessment
        </button>
      </form>
    </div>
  );
};

export default CreateAssessmentPage;
