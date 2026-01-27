// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>MyApp</h2>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/login" style={styles.link}>Login</Link>
        </li>
        <li>
          <Link to="/register" style={styles.link}>Register</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    margin: 0,
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Navbar;
