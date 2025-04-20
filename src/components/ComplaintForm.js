import React, { useState } from 'react';
import { createComplaint } from '../services/api';
import '../styles/style.css';

function ComplaintForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // Convert uploaded file to base64 string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // returns base64
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImage(base64);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await createComplaint({ title, description, image }, token);
      alert('Complaint submitted successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit complaint');
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Complaint</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ComplaintForm;
