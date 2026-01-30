import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { value: "5000+", label: "Students Enrolled" },
    { value: "150+", label: "Courses Available" },
    { value: "95%", label: "Placement Rate" },
    { value: "200+", label: "Partner Companies" },
  ];

  const courses = [
    {
      title: "MERN Stack Development",
      desc: "Full-stack web development with MongoDB, Express, React & Node.js",
      duration: "6 Months",
      level: "Intermediate",
      students: "2,450",
      icon: "⚛️",
      color: "#61DAFB",
    },
    {
      title: "Java Full Stack",
      desc: "Enterprise Java with Spring Boot, Hibernate & Microservices",
      duration: "7 Months",
      level: "Advanced",
      students: "1,890",
      icon: "☕",
      color: "#007396",
    },
    {
      title: "AI & Machine Learning",
      desc: "Python, TensorFlow, Deep Learning & Neural Networks",
      duration: "8 Months",
      level: "Advanced",
      students: "3,120",
      icon: "🤖",
      color: "#FF6F00",
    },
    {
      title: "Data Science & Analytics",
      desc: "Statistics, Python, Data Visualization & Big Data",
      duration: "6 Months",
      level: "Intermediate",
      students: "2,680",
      icon: "📊",
      color: "#00BFA5",
    },
    {
      title: "DevOps Engineering",
      desc: "CI/CD, Docker, Kubernetes, AWS & Cloud Infrastructure",
      duration: "5 Months",
      level: "Advanced",
      students: "1,540",
      icon: "🚀",
      color: "#326CE5",
    },
    {
      title: "Cybersecurity",
      desc: "Network Security, Ethical Hacking & Information Security",
      duration: "7 Months",
      level: "Advanced",
      students: "980",
      icon: "🔒",
      color: "#D32F2F",
    },
  ];

  const features = [
    {
      icon: "📚",
      title: "Interactive Learning",
      desc: "Hands-on projects, live coding sessions, and real-world scenarios",
    },
    {
      icon: "👨‍🏫",
      title: "Expert Mentorship",
      desc: "Learn from industry professionals with 10+ years of experience",
    },
    {
      icon: "💼",
      title: "Placement Assistance",
      desc: "Resume building, mock interviews, and direct company referrals",
    },
    {
      icon: "📈",
      title: "Progress Tracking",
      desc: "Real-time analytics, performance reports, and skill assessments",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at TCS",
      course: "MERN Stack",
      text: "The curriculum was comprehensive and the placement support was exceptional. Got placed in TCS with a great package!",
      avatar: "PS",
    },
    {
      name: "Rahul Verma",
      role: "Data Scientist at Infosys",
      course: "AI & ML",
      text: "Amazing learning experience with real-world projects. The mentors were always available to help.",
      avatar: "RV",
    },
    {
      name: "Ananya Desai",
      role: "Full Stack Developer at Wipro",
      course: "Java Full Stack",
      text: "Best decision of my career. The hands-on approach made complex concepts easy to understand.",
      avatar: "AD",
    },
  ];

  const companies = [
    "TCS", "Infosys", "Wipro", "Cognizant", "Accenture",
    "HCL", "Tech Mahindra", "IBM", "Amazon", "Microsoft",
    "Google", "Capgemini"
  ];

  return (
    <div className="landing-wrapper">
      {/* Modern Navbar */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <div className="logo-icon"></div>
            <span className="logo-text">CampusLoop</span>
          </div>

          <div className="nav-menu">
            <a href="#features" className="nav-link">Features</a>
            <a href="#courses" className="nav-link">Courses</a>
            <a href="#placements" className="nav-link">Placements</a>
            <a href="#testimonials" className="nav-link">Reviews</a>
          </div>

          <div className="nav-actions">
            <Link to="/login" className="nav-btn btn-ghost">Login</Link>
            <Link to="/register" className="nav-btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">🔥 Trusted by 5000+ Students</div>
            <h1 className="hero-title">
              Master Skills That
              <span className="gradient-text"> Transform Careers</span>
            </h1>
            <p className="hero-subtitle">
              Industry-leading LMS platform with placement-focused courses,
              expert mentorship, and hands-on projects that prepare you for
              real-world challenges.
            </p>

            <div className="hero-cta">
              <Link to="/register" className="cta-primary">
                Start Learning Free
                <span className="arrow">→</span>
              </Link>
              <a href="#courses" className="cta-secondary">
                Explore Courses
              </a>
            </div>

            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card card-1">
              <div className="card-icon">✅</div>
              <div className="card-text">
                <div className="card-title">Assignment Completed</div>
                <div className="card-subtitle">React Components</div>
              </div>
            </div>

            <div className="visual-card card-2">
              <div className="progress-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" />
                  <circle cx="50" cy="50" r="45" className="progress" />
                </svg>
                <div className="progress-value">85%</div>
              </div>
              <div className="card-text">Course Progress</div>
            </div>

            <div className="visual-card card-3">
              <div className="achievement-badge">🏆</div>
              <div className="card-text">
                <div className="card-title">New Achievement</div>
                <div className="card-subtitle">Top Performer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose CampusLoop?</h2>
            <p className="section-subtitle">
              Everything you need to succeed in your tech career
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="courses-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Trending Courses</h2>
            <p className="section-subtitle">
              Industry-vetted curriculum designed for placement success
            </p>
          </div>

          <div className="courses-grid">
            {courses.map((course, index) => (
              <div key={index} className="course-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="course-header">
                  <div className="course-icon" style={{ backgroundColor: `${course.color}20`, color: course.color }}>
                    {course.icon}
                  </div>
                  <span className="course-level">{course.level}</span>
                </div>

                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.desc}</p>

                <div className="course-meta">
                  <div className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    <span className="meta-text">{course.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">👥</span>
                    <span className="meta-text">{course.students}</span>
                  </div>
                </div>

                <Link to="/register" className="course-btn">
                  Enroll Now
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section id="placements" className="companies-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Our Placement Partners</h2>
            <p className="section-subtitle">
              Students placed in top companies across India
            </p>
          </div>

          <div className="companies-marquee">
            <div className="marquee-content">
              {[...companies, ...companies].map((company, index) => (
                <div key={index} className="company-badge">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Success Stories</h2>
            <p className="section-subtitle">
              Hear from students who transformed their careers
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="quote-icon">"</div>
                <p className="testimonial-text">{testimonial.text}</p>

                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                    <div className="author-course">{testimonial.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Journey?</h2>
            <p className="cta-subtitle">
              Join thousands of students who are already learning and growing with us
            </p>
            <Link to="/register" className="cta-button">
              Get Started for Free
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon"></div>
                <span className="logo-text">CampusLoop</span>
              </div>
              <p className="footer-tagline">
                Empowering students with industry-ready skills and guaranteed placement support
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-heading">Platform</h4>
                <a href="#" className="footer-link">Courses</a>
                <a href="#" className="footer-link">Features</a>
                <a href="#" className="footer-link">Pricing</a>
                <a href="#" className="footer-link">Resources</a>
              </div>

              <div className="footer-column">
                <h4 className="footer-heading">Company</h4>
                <a href="#" className="footer-link">About Us</a>
                <a href="#" className="footer-link">Careers</a>
                <a href="#" className="footer-link">Contact</a>
                <a href="#" className="footer-link">Blog</a>
              </div>

              <div className="footer-column">
                <h4 className="footer-heading">Support</h4>
                <a href="#" className="footer-link">Help Center</a>
                <a href="#" className="footer-link">Terms of Service</a>
                <a href="#" className="footer-link">Privacy Policy</a>
                <a href="#" className="footer-link">Cookie Policy</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">© 2026 CampusLoop. All rights reserved.</p>
            <div className="social-links">
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;