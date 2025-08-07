import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { FiMail } from 'react-icons/fi'; // Import mail icon

const Newsletter = () => {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const styles = {
    newsletterSection: {
      width: '100%',
      padding: '60px 20px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'white', // Pure white background
      backgroundImage: 'linear-gradient(to bottom, #e0f2fe 0%, white 100%)', // Sky color gradient
      backgroundSize: '100% 150px',
      backgroundRepeat: 'no-repeat',
    },
    newsletterContainer: {
      maxWidth: '800px',
      width: '100%',
      textAlign: 'center',
    },
    newsletterTitle: {
      fontSize: '28px',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#333',
    },
    newsletterText: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#666',
      marginBottom: '30px',
    },
    newsletterInputContainer: {
      display: 'flex',
      justifyContent: 'center',
      maxWidth: '500px',
      margin: '0 auto',
      flexDirection: isMobile ? 'column' : 'row',
      position: 'relative',
    },
    newsletterInput: {
      flex: '1',
      padding: '12px 20px 12px 40px', // Extra padding for icon
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: isMobile ? '4px' : '4px 0 0 4px',
      outline: 'none',
      marginBottom: isMobile ? '10px' : '0',
    },
    newsletterButton: {
      padding: '12px 25px',
      backgroundColor: '#3b82f6', // Sky blue button
      color: 'white',
      border: 'none',
      borderRadius: isMobile ? '4px' : '0 4px 4px 0',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      width: isMobile ? '100%' : 'auto',
    },
    mailIcon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#999',
    },
  };

  return (
    <div style={styles.newsletterSection}>
      <div style={styles.newsletterContainer}>
        <h2 style={styles.newsletterTitle}>Subscribe to Our Newsletter</h2>
        <p style={styles.newsletterText}>
          Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit amet,
          <br />
          consectetur.Elit adipiscing enim pharetra hac.
        </p>
        <div style={styles.newsletterInputContainer}>
          <FiMail style={styles.mailIcon} />
          <input
            type="email"
            placeholder="brain.station23@gmail.com"
            style={styles.newsletterInput}
          />
          <button 
            style={styles.newsletterButton}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;