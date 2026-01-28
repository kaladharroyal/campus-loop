import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const slidesData = [
  {
    title: "Smart Learning Platform",
    desc: "Access courses, assignments, and progress in one place.",
  },
  {
    title: "Industry-Ready Courses",
    desc: "Learn MERN, AI/ML, Java Full Stack & more.",
  },
  {
    title: "Placement Support",
    desc: "Get trained for top IT companies.",
  },
  {
    title: "Career Growth",
    desc: "Boost your skills with real-world projects.",
  },
];

const LandingPage = () => {
  // clone last & first slide for infinite loop
  const slides = [
    slidesData[slidesData.length - 1],
    ...slidesData,
    slidesData[0],
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    stopAutoPlay(); // Safety clear
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3500);
  };

  const stopAutoPlay = () => clearInterval(intervalRef.current);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  // infinite loop correction
  useEffect(() => {
    if (currentIndex === slides.length - 1) {
      setTimeout(() => {
        setAnimate(false);
        setCurrentIndex(1);
      }, 400);
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        setAnimate(false);
        setCurrentIndex(slides.length - 2);
      }, 400);
    }
  }, [currentIndex, slides.length]);

  useEffect(() => {
    if (!animate) {
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [animate]);

  return (
    <div className="container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">College LMS</div>
        <div className="auth-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </header>

      {/* Slider */}
      <section
        className="banner-section"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <div className="slider-wrapper">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: animate ? "transform 0.4s ease" : "none",
              color: "white", 
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${
                  index === currentIndex ? "active" : "blurred"
                }`}
              >
                <div className="slide-bg" />
                <div id="slidedata" className="slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section>
        <h2 className="section-title">Popular Courses</h2>
        <div className="courses-grid">
          <div className="course-card">
            <h3>MERN Stack</h3>
            <p>MongoDB, Express, React, Node.js</p>
          </div>
          <div className="course-card">
            <h3>Java Full Stack</h3>
            <p>Spring Boot, Hibernate, MySQL</p>
          </div>
          <div className="course-card">
            <h3>AI & ML</h3>
            <p>Python, ML Algorithms, Projects</p>
          </div>
          <div className="course-card">
            <h3>Data Science</h3>
            <p>Statistics, Python, Visualization</p>
          </div>
        </div>
      </section>
      {/* Companies */}
      <section>
        <h2 className="section-title">Our Placement Partners</h2>
        <div className="companies">
          <div className="company-box">TCS</div>
          <div className="company-box">Infosys</div>
          <div className="company-box">Wipro</div>
          <div className="company-box">Cognizant</div>
          <div className="company-box">Accenture</div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="section-title">Student Feedback</h2>
        <div className="testimonial">
          "This LMS helped me track my learning and placements easily."
          <br />
          <strong>- CSE Student</strong>
        </div>
        <div className="testimonial">
          "Clean interface and very useful for assignments and quizzes."
          <br />
          <strong>- AI & ML Student</strong>
        </div>
      </section>


      {/* Footer */}
      <footer>© 2026 College LMS Portal</footer>
    </div>
  );
};

export default LandingPage;
