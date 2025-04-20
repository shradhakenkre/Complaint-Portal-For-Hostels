import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getComplaints, deleteComplaint } from '../services/api'; // Updated import
import '../styles/style.css';

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await getComplaints(token);
      setComplaints(data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to load complaints');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this complaint?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await deleteComplaint(id, token);
      setComplaints(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const filteredComplaints = complaints.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="complaint-list-container">
      <h2>All Complaints</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search complaints by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />

      <ul className="complaint-list">
        {filteredComplaints.map((complaint) => (
          <li className="complaint-list-item" key={complaint._id}>
            <Link to={`/complaints/${complaint._id}`}>{complaint.title}</Link>
            <div style={{ marginTop: '0.5rem' }}>
              <button onClick={() => handleDelete(complaint._id)} style={{ background: '#dc3545' }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComplaintList;
