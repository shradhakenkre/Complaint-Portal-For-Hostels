// src/pages/Dashboard.js

import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>User Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/complaints">My Complaints</Link></li>
          <li><Link to="/create-complaint">Create Complaint</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
