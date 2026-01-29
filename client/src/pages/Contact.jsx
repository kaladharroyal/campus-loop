import React from 'react'
import '../styles/contact.css'

const Contact = () => {
  return (
    <div className='form-container'>
      <div className='form-content'>
        <div className='form-header'>
          <h2>Contact Us</h2>
          <p>Get in touch with us for any inquiries or support.</p>
          <form action="submit">
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input type='text' id='name' name='name' />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' name='email' />
            </div>
            <div className='form-group'>
              <label htmlFor='message'>Message</label>
              <textarea id='message' name='message'></textarea>
            </div>
            <button type='submit'>Send Message</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Contact