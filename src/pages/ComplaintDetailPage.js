import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComplaintById } from '../services/api';
import ComplaintDetail from '../components/ComplaintDetail';

const ComplaintDetailPage = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getComplaintById(id, token);
        setComplaint(data);
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to fetch complaint');
      }
    };
    fetchComplaint();
  }, [id]);

  return complaint ? <ComplaintDetail complaint={complaint} /> : <div>Loading...</div>;
};

export default ComplaintDetailPage;
