import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

// Importing assets (or using placeholders/strings as requested)
// Note: Images are referenced as strings below to match the user's intent of adding them later.

const About = () => {
  return (
    <div className="about-page-container">
      <section className="about-section">
        <h2>About Us</h2>
      </section>

      <div className="team-container">
        <div className="team-card">
          <img src="../images/Kaladhar.jpeg" alt="Event Coordinator" />
          <h3>Kaladhar Royal Darmisetty</h3>
          <p>Event Coordinator</p>
          <p>Plans and oversees the entire event.</p>
          <p style={{ fontSize: '11px' }}><a href="mailto:kaladharroyal@gmail.com">kaladharroyal@gmail.com</a></p>
        </div>
        <div className="team-card">
          <img src="../images/devaraj.jpeg" alt="Logistics Manager" />
          <h3>Devaraj Vemuluru</h3>
          <p>Logistics Manager</p>
          <p>Handles resources, setup, and transport.</p>
          <p style={{ fontSize: '11px' }}><a href="mailto:vemulurudevaraj@gmail.com">vemulurudevaraj@gmail.com</a></p>
        </div>
        <div className="team-card">
          <img src="../images/raju.jpeg" alt="Marketing Lead" />
          <h3>Raju Jada</h3>
          <p>Marketing Lead</p>
          <p>Promotes the event across various platforms.</p>
          <p style={{ fontSize: '11px' }}><a href="mailto:jadaraju817@gmail.com">jadaraju817@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}

export default About;