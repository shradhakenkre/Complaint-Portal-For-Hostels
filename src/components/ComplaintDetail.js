import React from 'react';
import '../styles/style.css';

function ComplaintDetail({ complaint }) {
  return (
    <div className="complaint-detail-container">
      {complaint ? (
        <div className="complaint-card">
          <h2>{complaint.title}</h2>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Status:</strong> {complaint.status}</p>
          <p><strong>Created At:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(complaint.updatedAt).toLocaleString()}</p>

          {complaint.image && (
            <div className="complaint-image">
              <img
                src={complaint.image}
                alt="Complaint"
                className="complaint-thumbnail"
              />
            </div>
          )}

          {complaint.student && (
            <p><strong>Filed By:</strong> {complaint.student.email} ({complaint.student.role})</p>
          )}

          {complaint.chat?.length > 0 && (
            <div className="chat-section">
              <h4>Chat History</h4>
              <ul>
                {complaint.chat.map((msg, index) => (
                  <li key={index}>
                    <strong>{msg.user?.email || 'Unknown'}:</strong> {msg.message}
                    <br />
                    <small>{new Date(msg.date).toLocaleString()}</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Loading complaint...</p>
      )}
    </div>
  );
}

export default ComplaintDetail;
