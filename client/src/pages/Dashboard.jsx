import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend } from 'recharts';
import '../styles/pages.css';

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
          <p className="chart-sub">12 Hours this week</p>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <LineChart data={dataProgress}>
                <XAxis dataKey="name" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="hours" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
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
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <BarChart data={dataTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f0f0f0' }} />
                <Bar dataKey="score" fill="#4d7bf3" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
