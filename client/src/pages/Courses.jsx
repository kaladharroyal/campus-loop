import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/pages.css';

// Import assets
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

  // Mock data to match screenshot "All courses" list
  const allCourses = [
    { title: 'NLP', sub: 'NLP Using python', img: nlp, health: { score: 92, completion: '95%', feedback: '4.8', dropoff: '2%' } },
    { title: 'Programming for AI', sub: 'python', img: ai, health: { score: 85, completion: '88%', feedback: '4.5', dropoff: '5%' } },
    { title: 'Artificial intelligence', sub: 'fundamentals of ai', img: ai2, health: { score: 78, completion: '80%', feedback: '4.2', dropoff: '8%' } },
    { title: 'Deep Learning', sub: 'DL using python', img: dl, health: { score: 88, completion: '90%', feedback: '4.6', dropoff: '3%' } },
    { title: 'Computer Netwoks', sub: 'CN', img: cn, health: { score: 65, completion: '70%', feedback: '3.5', dropoff: '15%' } }
  ];

  // Favorites Logic
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.sub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCourseClick = (title) => {
    navigate(`/course/${encodeURIComponent(title)}`);
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <h2>Browse courses</h2>
        <p className="section-sub">Search for your favourite courses</p>
      </div>

      <div style={{ marginBottom: '40px', position: 'relative', width: '300px' }}>
        <input
          type="text"
          placeholder="Search for the course"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px 12px 40px',
            borderRadius: '25px',
            border: 'none',
            background: '#f0eef5',
            fontSize: '0.95rem'
          }}
        />
        <span style={{ position: 'absolute', left: '15px', top: '12px', fontSize: '1.1rem', color: '#666' }}>🔍</span>
      </div>

      <section>
        <h2 className="section-header">All courses</h2>
        <p className="section-sub">Enroll new courses</p>

        <div className="course-grid-5">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, i) => (
              <div
                key={i}
                className="campus-card"
                onClick={() => handleCourseClick(course.title)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-image-placeholder small" style={{ background: '#0e1b2a', position: 'relative' }}>
                  <img src={course.img} alt={course.title} width="100%" height="100%" style={{ objectFit: 'cover' }} />
                  {/* Health Indicator Badge */}
                  <div className="health-badge" style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    cursor: 'help'
                  }}>
                    <div style={{
                      background: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: course.health.score > 80 ? '#22c55e' : course.health.score > 50 ? '#eab308' : '#ef4444'
                      }}></span>
                      Health: {course.health.score}%
                    </div>
                    {/* Tooltip Content */}
                    <div className="health-tooltip" style={{
                      display: 'none',
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      marginTop: '5px',
                      background: 'white',
                      color: '#333',
                      padding: '10px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      width: '180px',
                      zIndex: 10,
                      fontSize: '0.8rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Completion:</span> <strong>{course.health.completion}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Feedback:</span> <strong>{course.health.feedback}/5</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Drop-offs:</span> <strong>{course.health.dropoff}</strong></div>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{course.title}</h3>
                  <p>{course.sub}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#666', gridColumn: '1 / -1', textAlign: 'center' }}>No courses found matching "{searchQuery}"</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
