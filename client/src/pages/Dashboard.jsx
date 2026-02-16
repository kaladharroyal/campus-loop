import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend } from 'recharts';
import '../styles/pages.css';
import API_BASE_URL from '../config/api';

const dataProgress = [
  { name: '23 Nov', hours: 2 },
  { name: '24', hours: 4 },
  { name: '25', hours: 1 },
  { name: '26', hours: 5 },
  { name: '27', hours: 2 },
  { name: '28', hours: 8 },
  { name: '29', hours: 3 },
  { name: '30', hours: 6 },
];

const dataTrends = [
  { name: 'Java', score: 80 },
  { name: 'DBMS', score: 65 },
  { name: 'MERN', score: 90 },
  { name: 'NLP', score: 40 },
  { name: 'Py', score: 75 },
  { name: 'C', score: 55 },
  { name: 'DL', score: 85 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [streak, setStreak] = React.useState(0);
  const [enrolledCourses, setEnrolledCourses] = React.useState([]);
  const [allCourses, setAllCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [userProgress, setUserProgress] = React.useState({});

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
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
        if (lastVisit) currentStreak = 1;
        else currentStreak = 1;
      }

      localStorage.setItem('learningStreak', currentStreak);
      localStorage.setItem('lastVisitDate', today);
    }
    setStreak(currentStreak);

    // Fetch Data
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;

        // Fetch Enrolled Courses
        const enrolledRes = await fetch(`${API_BASE_URL}/api/courses/mycourses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const enrolledData = await enrolledRes.json();

        // Fetch All Courses
        const allRes = await fetch(`${API_BASE_URL}/api/courses`);
        const allData = await allRes.json();

        // Fetch User Progress
        let progressMap = {};
        if (token) {
          try {
            const progressRes = await fetch(`${API_BASE_URL}/api/courses/my-progress`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const progressData = await progressRes.json();
            if (progressData.success) {
              const progressMap = {};
              progressData.data.forEach(p => {
                // Ensure we use the string version of the course ID
                const courseId = typeof p.course === 'object' ? p.course._id : p.course;
                progressMap[courseId] = p;
              });
              console.log("Progress Map:", progressMap);
              setUserProgress(progressMap);
            }
          } catch (err) {
            console.error("Failed to load progress", err);
          }
        }

        if (Array.isArray(enrolledData)) {
          console.log("Enrolled Courses:", enrolledData);
          setEnrolledCourses(enrolledData);
        }

        if (allData.success) {
          setAllCourses(allData.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="page-container">Loading Dashboard...</div>;

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="dashboard-actions">
          <button className="icon-btn">...</button>
          <button className="share-btn">Share</button>
          <div className="mini-profile"></div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <div>
            <h3>Enrolled Courses</h3>
            <div className="stat-value">{enrolledCourses.length}</div>
            <p className="stat-sub">{enrolledCourses.length > 0 ? "Keep learning!" : "Enroll in a course today"}</p>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <h3>Time spent</h3>
            <div className="stat-value">10.2 Hours</div>
            <p className="stat-sub">This week</p>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <h3>Streak</h3>
            <div className="stat-value">{streak} 🔥</div>
            <p className="stat-sub">Day streak</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid-main">
        {/* Progress Chart */}
        <div className="chart-card progress-chart">
          <h3>Activity</h3>
          <p className="chart-sub">Check your daily activity</p>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <LineChart data={dataProgress}>
                <XAxis dataKey="name" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderRadius: '8px', border: '1px solid var(--border)' }} />
                <Line type="monotone" dataKey="hours" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enrolled Courses List */}
        <div className="list-card">
          <h3>Your Enrolled Courses</h3>
          <div className="course-list-container">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map(course => {
                const progressInfo = userProgress[course._id];
                let progressPercent = 0;
                if (progressInfo) {
                  if (progressInfo.isCompleted) progressPercent = 100;
                  else if (progressInfo.completedLessons) {
                    let totalLessons = 0;
                    if (course.curriculum) {
                      course.curriculum.forEach(m => {
                        if (m.topics) totalLessons += m.topics.length;
                      });
                    }
                    if (totalLessons === 0) totalLessons = 1;
                    progressPercent = Math.round((progressInfo.completedLessons.length / totalLessons) * 100);
                  }
                }

                return (
                  <div key={course._id} className="course-list-item" onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
                    <div
                      className="course-icon-placeholder"
                      style={{
                        width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e0e7ff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px',
                        overflow: 'hidden'
                      }}
                    >
                      {course.thumbnail ? <img src={course.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📚'}
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <h4>{course.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{progressPercent}%</span>
                      </div>
                      <p className="text-sm sub-text" style={{ marginBottom: '6px' }}>{course.category}</p>
                      <div style={{ width: '100%', height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${progressPercent}%`, height: '100%', background: '#22c55e', transition: 'width 0.3s ease' }}></div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ padding: '10px', color: 'var(--text-secondary)' }}>You haven't enrolled in any courses yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-grid-bottom">
        {/* All Available Courses */}
        <div className="table-card">
          <h3>Suggested Courses</h3>
          <table className="simple-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Category</th>
                <th>Level</th>
                <th>Teacher</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allCourses.length > 0 ? (
                allCourses.slice(0, 5).map(course => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.category}</td>
                    <td>{course.level}</td>
                    <td>{course.teacher?.firstName || 'Local Instructor'}</td>
                    <td>
                      <button className="btn-small btn-primary" onClick={() => navigate(`/course/${course.title}`)}>View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5">No courses available.</td></tr>
              )}
            </tbody>
          </table>
          {allCourses.length > 5 && (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <button className="btn-text" onClick={() => navigate('/courses')}>View All Courses</button>
            </div>
          )}
        </div>

        {/* Results Trend */}
        <div className="chart-card">
          <h3>Performance Trend</h3>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <BarChart data={dataTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)' }} />
                <Tooltip cursor={{ fill: 'var(--bg-tertiary)' }} contentStyle={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderRadius: '8px', border: '1px solid var(--border)' }} />
                <Bar dataKey="score" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
