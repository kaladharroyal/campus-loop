import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [streak, setStreak] = React.useState(0);

  const handleCourseClick = (title) => {
    navigate(`/course/${encodeURIComponent(title)}`);
  };

  React.useEffect(() => {
    // Streak Logic
    const storedStreak = localStorage.getItem('learningStreak');
    const lastVisit = localStorage.getItem('lastVisitDate');
    const today = new Date().toDateString();

    let currentStreak = storedStreak ? parseInt(storedStreak) : 0;

    if (lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastVisit === yesterday.toDateString()) {
        currentStreak += 1;
      } else {
        // Reset if broken (allow initial start)
        if (lastVisit) currentStreak = 1;
        else currentStreak = 1; // First visit
      }

      localStorage.setItem('learningStreak', currentStreak);
      localStorage.setItem('lastVisitDate', today);
    }
    setStreak(currentStreak);
  }, []);

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h2>Dashboard app</h2>
        <div className="dashboard-actions">
          {/* Placeholder icons */}
          <button className="icon-btn">...</button>
          <button className="share-btn">Share</button>
          <div className="mini-profile"></div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <div>
            <h3>No.of courses enrolled</h3>
            <div className="stat-value">5</div>
            <p className="stat-sub">Enroll more courses</p>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <h3>Time spent</h3>
            <div className="stat-value">10.2 Hours</div>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <h3>Streak</h3>
            <div className="stat-value">{streak} 🔥</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid-main">
        {/* Progress Chart */}
        <div className="chart-card progress-chart">
          <h3>Progress</h3>
          <p className="chart-sub">12 Hours</p>
          <div className="chart-placeholder line-chart">
            {/* SVG or Canvas placeholder for Line Chart */}
            <svg viewBox="0 0 500 150" className="simple-chart">
              <polyline fill="none" stroke="black" strokeWidth="3" points="0,140 50,135 100,120 150,100 200,110 250,90 300,80 350,95 400,60 450,40" />
              <circle cx="450" cy="40" r="6" fill="black" />
            </svg>
          </div>
          <div className="chart-labels">
            <span>23 Nov</span> <span>24</span> <span>25</span> <span>26</span> <span>27</span> <span>28</span> <span>29</span> <span>30</span>
          </div>
        </div>

        {/* Courses Title List */}
        <div className="list-card">
          <h3>Courses Title</h3>
          <div className="course-list-item" onClick={() => handleCourseClick('DBMS')} style={{ cursor: 'pointer' }}>
            <div className="circle-icon dbms"></div>
            <div><h4>DBMS</h4><p>Data base management system</p></div>
          </div>
          <div className="course-list-item" onClick={() => handleCourseClick('JAVA')} style={{ cursor: 'pointer' }}>
            <div className="circle-icon java"></div>
            <div><h4>JAVA</h4><p>programming with java</p></div>
          </div>
          <div className="course-list-item" onClick={() => handleCourseClick('MERN')} style={{ cursor: 'pointer' }}>
            <div className="circle-icon mern"></div>
            <div><h4>MERN</h4><p>MERN stack development</p></div>
          </div>
          <div className="course-list-item" onClick={() => handleCourseClick('Machine Learning')} style={{ cursor: 'pointer' }}>
            <div className="circle-icon ml"></div>
            <div><h4>Machine Learning</h4><p>introduction to machine learning</p></div>
          </div>
          <div className="course-list-item" onClick={() => handleCourseClick('NLP')} style={{ cursor: 'pointer' }}>
            <div className="circle-icon nlp"></div>
            <div><h4>Natural Language Processing</h4><p>NLP using python</p></div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid-bottom">
        {/* Assignment Score */}
        <div className="table-card">
          <h3>Enrolled Courses Assignment Score</h3>
          <table className="simple-table">
            <thead><tr><th>Course Name</th><th className="text-right">Score</th></tr></thead>
            <tbody>
              <tr><td>JAVA</td><td className="text-right">84%</td></tr>
              <tr><td>MERN Stack dev</td><td className="text-right">75%</td></tr>
              <tr><td>Machine Learning</td><td className="text-right">69%</td></tr>
              <tr><td>DBMS</td><td className="text-right">90%</td></tr>
              <tr><td>NLP</td><td className="text-right">30%</td></tr>
              <tr><td>Deep Learning</td><td className="text-right">86%</td></tr>
              <tr><td>Computer Networks</td><td className="text-right">58%</td></tr>
            </tbody>
          </table>
        </div>

        {/* Results Trend */}
        <div className="chart-card">
          <h3>Course Results Trend</h3>
          <div className="chart-placeholder bar-chart">
            <div className="bar" style={{ height: '60%' }}></div>
            <div className="bar" style={{ height: '80%' }}></div>
            <div className="bar" style={{ height: '65%' }}></div>
            <div className="bar" style={{ height: '60%' }}></div>
            <div className="bar" style={{ height: '90%' }}></div>
            <div className="bar" style={{ height: '100%' }}></div>
            <div className="bar" style={{ height: '85%' }}></div>
            <div className="bar" style={{ height: '80%' }}></div>
            <div className="bar" style={{ height: '65%' }}></div>
            <div className="bar" style={{ height: '50%' }}></div>
            <div className="bar" style={{ height: '10%' }}></div>
          </div>
          <div className="chart-labels-bar">
            <span>Java</span> <span>DBMS</span> <span>MERN</span> <span>NLP</span> <span>Py</span> <span>C</span> <span>C#</span> <span>DL</span> <span>CN</span> <span>ML</span> <span>R</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
