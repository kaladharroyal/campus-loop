import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import fallback images for courses without thumbnails
import dbms from '../assets/dbms.png';
import java from '../assets/java.png';
import mern from '../assets/mern-stack.png';
import ml from '../assets/machine-learning.png';
import nlp from '../assets/nlp.png';
import ai from '../assets/programming-for-ai.png';
import ai2 from '../assets/ai.png';
import dl from '../assets/deep-learning.png';
import cn from '../assets/computer-networks.png';

const Courses = () => {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback images mapping
  const fallbackImages = [nlp, ai, ai2, dl, cn, dbms, java, mern, ml];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      const data = await response.json();

      if (data.success) {
        // Map courses and add fallback images if thumbnail is missing
        const coursesWithImages = data.data.map((course, index) => ({
          ...course,
          img: course.thumbnail || fallbackImages[index % fallbackImages.length],
          // Add health data if not present (for UI compatibility)
          health: course.health || {
            score: Math.floor(Math.random() * 30) + 70,
            completion: '85%',
            feedback: '4.5',
            dropoff: '5%'
          }
        }));
        setAllCourses(coursesWithImages);
      } else {
        setError(data.message || 'Failed to load courses');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };


  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (course.category && course.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCourseClick = (course) => {
    navigate(`/course-overview/${course._id}`);
  };

  if (loading) {
    return (
      <div className="courses-page">
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <style>{`
        .courses-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 30px;
          background: #f8fafc;
          min-height: 100vh;
        }

        .courses-header {
          margin-bottom: 40px;
        }

        .courses-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .courses-header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .search-container {
          margin-bottom: 40px;
          width: 100%;
        }

        .search-wrapper {
          position: relative;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 14px 18px 14px 45px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          font-size: 0.95rem;
          color: #1e293b;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .search-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          background: #ffffff;
        }

        .search-input::placeholder {
          color: #94a3b8;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.1rem;
          color: #94a3b8;
          pointer-events: none;
        }

        .courses-section {
          margin-bottom: 60px;
        }

        .section-header {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .section-sub {
          color: #64748b;
          font-size: 0.95rem;
          margin-bottom: 25px;
        }

        .course-grid-5 {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }

        .campus-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .campus-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .card-image-placeholder {
          width: 100%;
          aspect-ratio: 1/1;
          background: #0e1b2a;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .card-image-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-image-placeholder::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .campus-card:hover .card-image-placeholder::after {
          opacity: 1;
        }

        .health-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 10;
        }

        .health-badge > div {
          background: rgba(0, 0, 0, 0.85);
          color: #fff;
          padding: 8px 12px;
          border-radius: 14px;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 700;
          backdrop-filter: blur(8px);
        }

        .health-badge .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .health-tooltip {
          display: none !important;
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 10px;
          background: white;
          color: #333;
          padding: 14px;
          border-radius: 10px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          width: 200px;
          z-index: 100;
          font-size: 0.8rem;
        }

        .health-tooltip > div {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          font-weight: 500;
        }

        .health-badge:hover .health-tooltip {
          display: block !important;
        }

        .card-content {
          padding: 20px;
          background: #ffffff;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .card-content h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 6px 0;
          line-height: 1.3;
        }

        .card-content p {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0;
          text-transform: capitalize;
        }

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px 20px;
          color: #94a3b8;
          font-size: 0.95rem;
        }

        @media (max-width: 1200px) {
          .course-grid-5 {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .courses-page {
            padding: 20px;
          }

          .course-grid-5 {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
          }

          .section-header {
            font-size: 1.3rem;
          }

          .search-input {
            padding: 12px 16px 12px 40px;
            font-size: 0.9rem;
          }

          .card-content {
            padding: 16px;
          }

          .card-content h3 {
            font-size: 0.95rem;
          }

          .card-content p {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .courses-page {
            padding: 16px;
          }

          .course-grid-5 {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 12px;
          }

          .card-content {
            padding: 12px;
          }

          .card-content h3 {
            font-size: 0.85rem;
          }

          .card-content p {
            font-size: 0.8rem;
          }
        }
      `}</style>

      <div className="courses-header">
        <h2>Browse courses</h2>
        <p>Search for your favourite courses</p>
      </div>

      <div className="search-container">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search for the course"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div style={{
          background: '#fee2e2',
          color: '#991b1b',
          padding: '12px 20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <div className="courses-section">
        <h2 className="section-header">All courses</h2>
        <p className="section-sub">Enroll new courses</p>

        <div className="course-grid-5">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, i) => (
              <div
                key={course._id || i}
                className="campus-card"
                onClick={() => handleCourseClick(course)}
              >
                <div className="card-image-placeholder">
                  <img src={course.img} alt={course.title} />
                  <div className="health-badge">
                    <div>
                      <span className="dot" style={{
                        background: course.health.score > 80 ? '#22c55e' : course.health.score > 50 ? '#eab308' : '#ef4444'
                      }}></span>
                      Health: {course.health.score}%
                    </div>
                    <div className="health-tooltip">
                      <div><span>Completion:</span> <strong>{course.health.completion}</strong></div>
                      <div><span>Feedback:</span> <strong>{course.health.feedback}/5</strong></div>
                      <div><span>Drop-offs:</span> <strong>{course.health.dropoff}</strong></div>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{course.title}</h3>
                  <p>{course.description ? course.description.substring(0, 50) + '...' : course.category || ''}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No courses found matching "{searchQuery}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;