import React, { useState } from 'react';
import '../styles/support.css';
import { FiSearch, FiBook, FiUser, FiHelpCircle, FiMail, FiMessageSquare, FiChevronDown } from 'react-icons/fi';

const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can click on the 'Forgot Password' link on the login page. An email with reset instructions will be sent to your registered email address."
    },
    {
      question: "How can I enroll in a new course?",
      answer: "Go to the 'Courses' page, browse the available catalog, and click the 'Enroll Now' button on the course you wish to join."
    },
    {
      question: "Where can I find my assignment grades?",
      answer: "Navigate to the 'Assignments' section. You can view the status and grades of all your submitted tasks in the list view."
    },
    {
      question: "Can I download course materials?",
      answer: "Yes, most courses allow you to download PDFs and supplementary materials directly from the course player interface."
    }
  ];

  return (
    <div className="support-container">
      {/* Hero Section */}
      <div className="support-hero">
        <h1>How can we help you?</h1>
        <p>Search our knowledge base or browse frequently asked questions.</p>
        <div className="support-search-wrapper">
          <input type="text" placeholder="Search for answers..." />
          <FiSearch className="search-icon" size={20} />
        </div>
      </div>

      <div className="support-content">
        {/* Categories */}
        <div className="support-categories">
          <div className="category-card">
            <div className="category-icon">
              <FiBook size={24} />
            </div>
            <h3>Getting Started</h3>
            <p>Learn the basics of navigating the LMS and setting up your profile.</p>
          </div>
          <div className="category-card">
            <div className="category-icon">
              <FiUser size={24} />
            </div>
            <h3>Account & Billing</h3>
            <p>Manage your subscription, password, and account details.</p>
          </div>
          <div className="category-card">
            <div className="category-icon">
              <FiHelpCircle size={24} />
            </div>
            <h3>Technical Support</h3>
            <p>Troubleshooting playback issues, login errors, and bugs.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  {faq.question}
                  <FiChevronDown className="toggle-icon" />
                </div>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="support-contact">
          <h2>Still need help?</h2>
          <div className="contact-options">
            <a href="mailto:support@campusloop.com" className="contact-btn btn-primary">
              <FiMail /> Email Support
            </a>
            <button className="contact-btn btn-secondary">
              <FiMessageSquare /> Start Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;