import React, { useRef, useState, useEffect, useCallback } from "react";

const GRID_WIDTH = 8;
const GRID_HEIGHT = 12; 
const CELL_SIZE = 50;
const GAP = 2;
const PENALTY_PER_CELL = 1; // Used in KPI_1
const ALPHA = 0.7; // Used in KPI_2
const GAME_DURATION_SECONDS = 15 * 60; // 15 minutesconst GAME_DURATION_SECONDS = 15 * 60; // 15 minutes

// Welcome Page Component
const WelcomePage = ({ onStart }) => {
  return (
    <div style={{
      backgroundColor: '#fdf6e3',
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: '40px',
      color: '#000',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <div style={{
        maxWidth: '800px',
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        textAlign: 'left',
        lineHeight: '1.6'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <span role="img" aria-label="tetris">🧱</span> Tetris for Managers
        </h1>
        
        <div style={{ fontSize: '16px', color: '#2c3e50', marginBottom: '30px' }}>
          <p style={{ marginBottom: '25px', fontSize: '18px', fontWeight: '500' }}>
            Welcome to <strong>Tetris for Managers</strong>, a strategic twist on the classic game.
          </p>
          
          <p style={{ marginBottom: '20px' }}>
            In this version, you will drag and drop bricks of different shapes into a frame. Each brick has a <strong>dollar value</strong>, representing its potential contribution to your portfolio.
          </p>
          
          <p style={{ marginBottom: '20px' }}>
            Your challenge is to <strong>build smart</strong>: bricks must fit entirely <strong>within the frame</strong> and <strong>cannot overlap</strong>. Here's the strategic element: <strong>every empty cell</strong> left in the frame comes with a <strong>$1 penalty</strong>. Please stay focused and avoid talking to others during play. If you have a question at any point, just raise your hand and I will be happy to help.
          </p>
          
          <p style={{ marginBottom: '20px' }}>
            This game includes three phases: the <strong>training phase</strong>, <strong>registration phase</strong>, and the <strong>game phase</strong>.
          </p>
          
          <ol style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '10px' }}>
              In the <strong>training phase</strong>, you will be given the opportunity to become familiar with the interface by solving a simpler version of the game.
            </li>
            <li style={{ marginBottom: '10px' }}>
              In the <strong>registration phase</strong>, you will provide some basic information about yourself.
            </li>
            <li style={{ marginBottom: '10px' }}>
              In the <strong>game phase</strong>, you will have <strong>15 minutes</strong> to achieve the highest net value possible of the game. You will also fill out a short survey after the game is over.
            </li>
          </ol>
          
          <p style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px', borderLeft: '4px solid #28a745' }}>
            <strong>💰 Incentives:</strong> The participant with the highest net value will receive a $100 cash prize. In the event of a tie, the prize will go to the participant who completed the game in less time.
          </p>
          
          
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onStart}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '10px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
              fontSize: '18px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Start Training Phase
          </button>
        </div>
      </div>
    </div>
  );
}; // End of WelcomePage component

// Registration Page Component
const RegistrationPage = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    participantId: '',
    email: '',
    age: '',
    gender: '',
    education: '',
    workExperience: '',
    managementExperience: '',
    gamingExperience: '',
    tetrisExperience: '',
    mentalCalculations: '',
    mathsLiked: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.participantId.trim()) {
      newErrors.participantId = 'Participant ID is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Personal E-mail is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.age || formData.age < 18 || formData.age > 100) {
      newErrors.age = 'Please enter a valid age (18-100)';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!formData.education) {
      newErrors.education = 'Please select your education level';
    }
    
    if (!formData.workExperience) {
      newErrors.workExperience = 'Please select your work experience';
    }
    
    if (!formData.managementExperience) {
      newErrors.managementExperience = 'Please select your management experience';
    }
    
    if (!formData.gamingExperience) {
      newErrors.gamingExperience = 'Please select your gaming experience';
    }
    
    if (!formData.tetrisExperience) {
      newErrors.tetrisExperience = 'Please select your Tetris experience';
    }
    
    if (!formData.mentalCalculations) {
      newErrors.mentalCalculations = 'Please rate your mental calculation skills';
    }
    
    if (!formData.mathsLiked) {
      newErrors.mathsLiked = 'Please indicate if maths was among your favorite subjects';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Log registration data
      fetch('https://tetris-proxy.vercel.app/api/submit', {
        method: 'POST',
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          browser: navigator.userAgent,
          device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
          type: "registration",
          participantId: formData.participantId,
          email: formData.email,
          age: formData.age,
          gender: formData.gender,
          education: formData.education,
          workExperience: formData.workExperience,
          managementExperience: formData.managementExperience,
          gamingExperience: formData.gamingExperience,
          tetrisExperience: formData.tetrisExperience,
          mentalCalculations: formData.mentalCalculations,
          mathsLiked: formData.mathsLiked,
          id: null,
          anchor: null,
          frameMatrix: '',
          duration: 0,
          totalValue: 0,
          kpi1: 0,
          kpi2: 0,
          coverage: 0,
          valuePerCell: 0,
          fitness: 0,
          allNotes: '',
          noteCount: 0,
          allCalculations: '',
          calculationCount: 0
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch(error => {
        console.error('Error logging registration:', error);
      }).finally(() => {
        onComplete(formData.participantId);
      });
    }
  };

  // Updated styles with consistent color scheme
  const baseInputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
    backgroundColor: '#fff',
    color: '#2c3e50',
    outline: 'none'
  };

  const inputStyle = {
    ...baseInputStyle
  };

  const inputFocusStyle = {
    borderColor: '#007bff',
    boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.1)'
  };

  const errorInputStyle = {
    ...baseInputStyle,
    borderColor: '#dc3545',
    boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.1)'
  };

  const selectStyle = {
    ...baseInputStyle,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232c3e50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '20px',
    paddingRight: '45px'
  };

  const errorSelectStyle = {
    ...selectStyle,
    borderColor: '#dc3545',
    boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.1)'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '16px'
  };

  const fieldContainerStyle = {
    marginBottom: '24px'
  };

  const errorTextStyle = {
    color: '#dc3545',
    fontSize: '14px',
    marginTop: '6px',
    fontWeight: '500'
  };

  return (
    <div style={{
      backgroundColor: '#fdf6e3',
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: '40px',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        textAlign: 'left',
        lineHeight: '1.6'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <span role="img" aria-label="clipboard">📋</span> Registration
        </h1>
        
        <p style={{ 
          marginBottom: '30px', 
          fontSize: '16px', 
          color: '#2c3e50',
          textAlign: 'center'
        }}>
          Please provide some basic information about yourself.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Participant ID *
            </label>
            <input
              type="text"
              value={formData.participantId}
              onChange={(e) => handleInputChange('participantId', e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.participantId ? '#dc3545' : '#ddd';
                e.target.style.boxShadow = 'none';
              }}
              style={errors.participantId ? errorInputStyle : inputStyle}
              placeholder="Enter your participant ID"
            />
            {errors.participantId && (
              <div style={errorTextStyle}>
                {errors.participantId}
				</div>
                )}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Personal E-mail *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email ? '#dc3545' : '#ddd';
                e.target.style.boxShadow = 'none';
              }}
              style={errors.email ? errorInputStyle : inputStyle}
              placeholder="Enter your personal email address"
            />
            {errors.email && (
              <div style={errorTextStyle}>
                {errors.email}
              </div>
            )}
			</div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Mental Calculations *
            </label>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
              On a scale from 1 to 10, how good are you at mental calculations compared to the general population of this country? (1 very poor, 5 average, 10 very strong)
            </div>
            <select
              value={formData.mentalCalculations}
              onChange={(e) => handleInputChange('mentalCalculations', e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.mentalCalculations ? '#dc3545' : '#ddd';
                e.target.style.boxShadow = 'none';
              }}
              style={errors.mentalCalculations ? errorSelectStyle : selectStyle}
            >
              <option value="">Please select...</option>
              <option value="1">1 (very poor)</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 (average)</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10 (very strong)</option>
            </select>
            {errors.mentalCalculations && (
              <div style={errorTextStyle}>
                {errors.mentalCalculations}
              </div>
            )}
          </div>
		  
<div style={fieldContainerStyle}>
  <label style={labelStyle}>
    Mathematics at School *
  </label>
  <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
    Was maths among the five subjects you liked most at school?
  </div>
  <div style={{ 
    display: 'flex', 
            gap: '16px', 
    alignItems: 'center'
  }}>
    <label 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'normal',
        padding: '10px 16px',
        borderRadius: '10px',
        border: '2px solid',
        borderColor: formData.mathsLiked === 'yes' ? '#007bff' : '#e1e8ed',
        backgroundColor: formData.mathsLiked === 'yes' ? '#f0f8ff' : '#fff',
        transition: 'all 0.2s ease',
        minWidth: '100px',
        justifyContent: 'center',
        boxShadow: formData.mathsLiked === 'yes' ? '0 2px 8px rgba(0, 123, 255, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        if (formData.mathsLiked !== 'yes') {
          e.currentTarget.style.borderColor = '#007bff';
          e.currentTarget.style.backgroundColor = '#f8f9fa';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (formData.mathsLiked !== 'yes') {
          e.currentTarget.style.borderColor = '#e1e8ed';
          e.currentTarget.style.backgroundColor = '#fff';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: '2px solid',
        borderColor: formData.mathsLiked === 'yes' ? '#007bff' : '#ddd',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        position: 'relative'
      }}>
        {formData.mathsLiked === 'yes' && (
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#007bff',
            transform: 'scale(1)',
            transition: 'transform 0.2s ease'
          }} />
        )}
      </div>
      <input
        type="radio"
        name="mathsLiked"
        value="yes"
        checked={formData.mathsLiked === 'yes'}
        onChange={(e) => handleInputChange('mathsLiked', e.target.value)}
        style={{ 
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none'
        }}
      />
      <span style={{ fontWeight: '500', color: '#2c3e50' }}>Yes</span>
    </label>
    
    <label 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'normal',
        padding: '10px 16px',
        borderRadius: '10px',
        border: '2px solid',
        borderColor: formData.mathsLiked === 'no' ? '#007bff' : '#e1e8ed',
        backgroundColor: formData.mathsLiked === 'no' ? '#f0f8ff' : '#fff',
        transition: 'all 0.2s ease',
        minWidth: '100px',
        justifyContent: 'center',
        boxShadow: formData.mathsLiked === 'no' ? '0 2px 8px rgba(0, 123, 255, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        if (formData.mathsLiked !== 'no') {
          e.currentTarget.style.borderColor = '#007bff';
          e.currentTarget.style.backgroundColor = '#f8f9fa';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (formData.mathsLiked !== 'no') {
          e.currentTarget.style.borderColor = '#e1e8ed';
          e.currentTarget.style.backgroundColor = '#fff';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: '2px solid',
        borderColor: formData.mathsLiked === 'no' ? '#007bff' : '#ddd',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
      }}>
        {formData.mathsLiked === 'no' && (
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#007bff',
            transform: 'scale(1)',
            transition: 'transform 0.2s ease'
          }} />
        )}
      </div>
      <input
        type="radio"
        name="mathsLiked"
        value="no"
        checked={formData.mathsLiked === 'no'}
        onChange={(e) => handleInputChange('mathsLiked', e.target.value)}
        style={{ 
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none'
        }}
      />
      <span style={{ fontWeight: '500', color: '#2c3e50' }}>No</span>
    </label>
  </div>
  {errors.mathsLiked && (
    <div style={errorTextStyle}>
      {errors.mathsLiked}
    </div>
  )}
</div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Age *
            </label>
            <input
              type="number"
              min="18"
              max="100"
              value={formData.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value) || '')}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.age ? '#dc3545' : '#ddd';
                e.target.style.boxShadow = 'none';
              }}
              style={errors.age ? errorInputStyle : inputStyle}
              placeholder="Enter your age"
            />
            {errors.age && (
              <div style={errorTextStyle}>
                {errors.age}
              </div>
            )}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Gender *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.gender ? '#dc3545' : '#ddd';
                e.target.style.boxShadow = 'none';
              }}
              style={errors.gender ? errorSelectStyle : selectStyle}
            >
              <option value="">Please select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <div style={errorTextStyle}>
                {errors.gender}
              </div>
            )}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Education Level *
            </label>
            <select
              value={formData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.education ? '#dc3545' : '#ddd';
                e.target.style.boxShadow = 'none';
              }}
              style={errors.education ? errorSelectStyle : selectStyle}
            >
              <option value="">Please select...</option>
              <option value="high-school">High School</option>
              <option value="some-college">Some College</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD/Doctoral</option>
              <option value="other">Other</option>
            </select>
            {errors.education && (
              <div style={errorTextStyle}>
                {errors.education}
              </div>
            )}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Years of Work Experience *
            </label>
            <select
              value={formData.workExperience}
              onChange={(e) => handleInputChange('workExperience', e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.workExperience ? '#dc3545' : '#ddd';
                e.target.style.boxShadow = 'none';
              }}
              style={errors.workExperience ? errorSelectStyle : selectStyle}
            >
              <option value="">Please select...</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="11-15">11-15 years</option>
              <option value="16-20">16-20 years</option>
              <option value="20+">20+ years</option>
            </select>
            {errors.workExperience && (
              <div style={errorTextStyle}>
                {errors.workExperience}
              </div>
            )}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Years of Management Experience *
            </label>
            <select
              value={formData.managementExperience}
              onChange={(e) => handleInputChange('managementExperience', e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.managementExperience ? '#dc3545' : '#ddd';
                e.target.style.boxShadow = 'none';
              }}
              style={errors.managementExperience ? errorSelectStyle : selectStyle}
            >
              <option value="">Please select...</option>
              <option value="none">No management experience</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="11-15">11-15 years</option>
              <option value="15+">15+ years</option>
            </select>
            {errors.managementExperience && (
              <div style={errorTextStyle}>
                {errors.managementExperience}
              </div>
            )}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Gaming Experience *
            </label>
            <select
              value={formData.gamingExperience}
              onChange={(e) => handleInputChange('gamingExperience', e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.gamingExperience ? '#dc3545' : '#ddd';
                e.target.style.boxShadow = 'none';
              }}
              style={errors.gamingExperience ? errorSelectStyle : selectStyle}
            >
              <option value="">Please select...</option>
              <option value="none">No gaming experience</option>
              <option value="casual">Casual gamer (occasionally)</option>
              <option value="moderate">Moderate gamer (few times a week)</option>
              <option value="frequent">Frequent gamer (daily)</option>
              <option value="professional">Professional/competitive gamer</option>
            </select>
            {errors.gamingExperience && (
              <div style={errorTextStyle}>
                {errors.gamingExperience}
              </div>
            )}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Tetris Experience *
            </label>
            <select
              value={formData.tetrisExperience}
              onChange={(e) => handleInputChange('tetrisExperience', e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.tetrisExperience ? '#dc3545' : '#ddd';
                e.target.style.boxShadow = 'none';
              }}
              style={errors.tetrisExperience ? errorSelectStyle : selectStyle}
            >
              <option value="">Please select...</option>
              <option value="none">Never played Tetris</option>
              <option value="minimal">Played a few times</option>
              <option value="some">Played occasionally</option>
              <option value="moderate">Play Tetris regularly</option>
              <option value="expert">Expert Tetris player</option>
            </select>
            {errors.tetrisExperience && (
              <div style={errorTextStyle}>
                {errors.tetrisExperience}
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
                fontSize: '18px',
                transition: 'all 0.2s ease',
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0056b3';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(0,123,255,0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#007bff';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,123,255,0.3)';
              }}
            >
              Continue to Game Phase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Survey Page Component
const SurveyPage = ({ 
  surveyTimeLeft, 
  allChatMessages, 
  allCalculations, 
  formatDateToUKTime, 
  getBrowserInfo, 
  getDeviceType, 
  formatMatrixForLogging, 
  frameMatrix, 
  GAME_DURATION_SECONDS, 
  timeLeft, 
  totalValue, 
  kpi1, 
  kpi2, 
  coverage, 
  valuePerCell, 
  fitness,
  participantId 
}) => {
  const [surveyData, setSurveyData] = useState({
    satisfaction: '',
    difficulty: '',
    clarity: '',
    timeAdequacy: '',
    strategyUsed: '',
    mostChallenging: '',
    improvements: '',
    overallExperience: '',
    additionalComments: ''
  });

  const [errors, setErrors] = useState({});

  const formatSurveyTime = (seconds) => {
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleInputChange = (field, value) => {
    setSurveyData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts interacting
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!surveyData.satisfaction) {
      newErrors.satisfaction = 'Please rate your satisfaction';
    }
    
    if (!surveyData.difficulty) {
      newErrors.difficulty = 'Please rate the difficulty';
    }
    
    if (!surveyData.clarity) {
      newErrors.clarity = 'Please rate the clarity';
    }
    
    if (!surveyData.timeAdequacy) {
      newErrors.timeAdequacy = 'Please indicate if time was adequate';
    }
    
    if (!surveyData.overallExperience) {
      newErrors.overallExperience = 'Please rate your overall experience';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aggregate all game data with survey responses
      const aggregatedNotes = allChatMessages.map(message => 
        `[${message.date} ${message.timestamp}] ${message.text}`
      ).join(' | ');

      const aggregatedCalculations = allCalculations.map(calculation => 
        `[${calculation.date} ${calculation.timestamp}] ${calculation.expression}`
      ).join(' | ');

      // Log complete survey data with all game information
      fetch('https://tetris-proxy.vercel.app/api/submit', {
  method: 'POST',
  body: JSON.stringify({
    timestamp: formatDateToUKTime(new Date().toISOString()),
    browser: getBrowserInfo(),
    device: getDeviceType(),
    type: "survey_completed",
    participantId: participantId, // Use actual participant ID instead of empty string
    email: '',
    age: '',
    gender: '',
    education: '',
    workExperience: '',
    managementExperience: '',
    gamingExperience: '',
    tetrisExperience: '',
    mentalCalculations: '',
    mathsLiked: '',
    id: null,
    anchor: null,
    frameMatrix: formatMatrixForLogging(frameMatrix),
    duration: GAME_DURATION_SECONDS - timeLeft,
    totalValue,
    kpi1,
    kpi2,
    coverage,
    valuePerCell,
    fitness,
    allNotes: aggregatedNotes,
    noteCount: allChatMessages.length,
    allCalculations: aggregatedCalculations,
    calculationCount: allCalculations.length,
    satisfaction: surveyData.satisfaction,
    difficulty: surveyData.difficulty,
    clarity: surveyData.clarity,
    timeAdequacy: surveyData.timeAdequacy,
    strategyUsed: surveyData.strategyUsed,
    mostChallenging: surveyData.mostChallenging,
    improvements: surveyData.improvements,
    overallExperience: surveyData.overallExperience,
    additionalComments: surveyData.additionalComments
  }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch(error => {
        console.error('Error logging survey:', error);
      }).finally(() => {
        alert('Thank you for completing the survey! You may now close this window.');
      });
    }
  };

  const baseInputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
    backgroundColor: '#fff',
    color: '#2c3e50',
    outline: 'none'
  };

  const selectStyle = {
    ...baseInputStyle,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232c3e50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '20px',
    paddingRight: '45px'
  };

  const textareaStyle = {
    ...baseInputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '16px'
  };

  const fieldContainerStyle = {
    marginBottom: '24px'
  };

  const errorTextStyle = {
    color: '#dc3545',
    fontSize: '14px',
    marginTop: '6px',
    fontWeight: '500'
  };

  return (
    <div style={{
      backgroundColor: '#fdf6e3',
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: '40px',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <div style={{
        maxWidth: '700px',
        width: '100%',
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        textAlign: 'left',
        lineHeight: '1.6'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#2c3e50',
            margin: 0
          }}>
            <span role="img" aria-label="survey">📝</span> Post-Game Survey
          </h1>
          <div style={{ 
            fontSize: '14px', 
            color: '#666', 
            fontWeight: 'normal',
            textAlign: 'right'
          }}>
            ⏱️ {formatSurveyTime(surveyTimeLeft)}
          </div>
        </div>
        
        <p style={{ 
          marginBottom: '30px', 
          fontSize: '16px', 
          color: '#2c3e50',
          textAlign: 'center'
        }}>
          Please share your thoughts about the Tetris for Managers experience.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              How satisfied are you with your performance in the game? *
            </label>
            <select
              value={surveyData.satisfaction}
              onChange={(e) => handleInputChange('satisfaction', e.target.value)}
              style={errors.satisfaction ? {...selectStyle, borderColor: '#dc3545'} : selectStyle}
            >
              <option value="">Please select...</option>
              <option value="very-dissatisfied">Very Dissatisfied</option>
              <option value="dissatisfied">Dissatisfied</option>
              <option value="neutral">Neutral</option>
              <option value="satisfied">Satisfied</option>
              <option value="very-satisfied">Very Satisfied</option>
            </select>
            {errors.satisfaction && (
              <div style={errorTextStyle}>
                {errors.satisfaction}
              </div>
            )}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              How would you rate the difficulty of the game? *
            </label>
            <select
              value={surveyData.difficulty}
              onChange={(e) => handleInputChange('difficulty', e.target.value)}
              style={errors.difficulty ? {...selectStyle, borderColor: '#dc3545'} : selectStyle}
            >
              <option value="">Please select...</option>
              <option value="very-easy">Very Easy</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
              <option value="very-difficult">Very Difficult</option>
            </select>
            {errors.difficulty && (
              <div style={errorTextStyle}>
                {errors.difficulty}
              </div>
            )}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              How clear were the game instructions and objectives? *
            </label>
            <select
              value={surveyData.clarity}
              onChange={(e) => handleInputChange('clarity', e.target.value)}
              style={errors.clarity ? {...selectStyle, borderColor: '#dc3545'} : selectStyle}
            >
              <option value="">Please select...</option>
              <option value="very-unclear">Very Unclear</option>
              <option value="unclear">Unclear</option>
              <option value="neutral">Neutral</option>
              <option value="clear">Clear</option>
              <option value="very-clear">Very Clear</option>
            </select>
            {errors.clarity && (
              <div style={errorTextStyle}>
                {errors.clarity}
              </div>
            )}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Was the 15-minute time limit adequate for completing the game? *
            </label>
            <select
              value={surveyData.timeAdequacy}
              onChange={(e) => handleInputChange('timeAdequacy', e.target.value)}
              style={errors.timeAdequacy ? {...selectStyle, borderColor: '#dc3545'} : selectStyle}
            >
              <option value="">Please select...</option>
              <option value="too-short">Too Short</option>
              <option value="adequate">Adequate</option>
              <option value="too-long">Too Long</option>
            </select>
            {errors.timeAdequacy && (
              <div style={errorTextStyle}>
                {errors.timeAdequacy}
              </div>
            )}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              What strategy did you use to maximize your net value?
            </label>
            <textarea
              value={surveyData.strategyUsed}
              onChange={(e) => handleInputChange('strategyUsed', e.target.value)}
              placeholder="Describe your approach to placing bricks and maximizing net value..."
              style={textareaStyle}
            />
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              What was the most challenging aspect of the game?
            </label>
            <textarea
              value={surveyData.mostChallenging}
              onChange={(e) => handleInputChange('mostChallenging', e.target.value)}
              placeholder="What did you find most difficult or frustrating?"
              style={textareaStyle}
            />
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              What improvements would you suggest for this game?
            </label>
            <textarea
              value={surveyData.improvements}
              onChange={(e) => handleInputChange('improvements', e.target.value)}
              placeholder="Any suggestions for making the game better?"
              style={textareaStyle}
            />
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Overall, how would you rate your experience with Tetris for Managers? *
            </label>
            <select
              value={surveyData.overallExperience}
              onChange={(e) => handleInputChange('overallExperience', e.target.value)}
              style={errors.overallExperience ? {...selectStyle, borderColor: '#dc3545'} : selectStyle}
            >
              <option value="">Please select...</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
            {errors.overallExperience && (
              <div style={errorTextStyle}>
                {errors.overallExperience}
              </div>
            )}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>
              Any additional comments or feedback?
            </label>
            <textarea
              value={surveyData.additionalComments}
              onChange={(e) => handleInputChange('additionalComments', e.target.value)}
              placeholder="Share any other thoughts about your experience..."
              style={textareaStyle}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
                fontSize: '18px',
                transition: 'all 0.2s ease',
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0056b3';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(0,123,255,0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#007bff';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,123,255,0.3)';
              }}
            >
              Submit Survey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Training Page Component

// Helper functions (moved before TrainingPage to fix scope issue)
const getRotatedShape = (shape, rotations) => {
  const rotateClockwise = (shape) => shape.map(([x, y]) => [y, -x]);
  let rotatedShape = [...shape];
  for (let i = 0; i < rotations; i++) {
    rotatedShape = rotateClockwise(rotatedShape);
  }
  return rotatedShape;
};

// Helper function to get the bounding box of a shape
const getShapeBounds = (shape) => {
  if (shape.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0, width: 1, height: 1 };
  
  const xs = shape.map(([x, y]) => x);
  const ys = shape.map(([x, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  
  return {
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX + 1,
    height: maxY - minY + 1
  };
};

// Helper function to center a shape within the palette container
const getCenteredShapeOffset = (shape, containerSize) => {
  const bounds = getShapeBounds(shape);
  const offsetX = (containerSize - bounds.width * (CELL_SIZE + GAP)) / 2 - bounds.minX * (CELL_SIZE + GAP);
  const offsetY = (containerSize - bounds.height * (CELL_SIZE + GAP)) / 2 - bounds.minY * (CELL_SIZE + GAP);
  return { offsetX, offsetY };
};

const rotateClockwise = (shape) => shape.map(([x, y]) => [y, -x]);
const rotateCounterClockwise = (shape) => shape.map(([x, y]) => [-y, x]);

// Training Page Component
const TrainingPage = ({ onComplete }) => {
  // Training-specific brick definitions (only 4 bricks)
  const TRAINING_BRICK_DEFINITIONS = [
    { type: 'tshape', color: 'limegreen', count: 1, value: 14, shape: [[0, 0], [1, 0], [2, 0], [1, 1]] },
    { type: 'lshape', color: 'orange', count: 1, value: 9, shape: [[0, 0], [1, 0], [0, 1]] },
    { type: 'line', color: 'yellow', count: 1, value: 12, shape: [[0, 0], [1, 0], [2, 0]] },
    { type: 'zshape', color: 'violet', count: 1, value: 18, shape: [[0, 0], [1, 0], [1, 1], [2, 1]] }
  ];

  // Training state (similar to main game but simplified)
  const [trainingBricks, setTrainingBricks] = useState([]);
  const [trainingBrickCounts, setTrainingBrickCounts] = useState(
    Object.fromEntries(TRAINING_BRICK_DEFINITIONS.map(b => [b.type, b.count]))
  );
  const [trainingSelected, setTrainingSelected] = useState(null);
  const [trainingDragging, setTrainingDragging] = useState(null);
  const [trainingOffset, setTrainingOffset] = useState({ x: 0, y: 0 });
  const [trainingDragStart, setTrainingDragStart] = useState({ x: 0, y: 0 });
  const [trainingTotalValue, setTrainingTotalValue] = useState(0);
  const [trainingCoverage, setTrainingCoverage] = useState(0);
  const [trainingKpi1, setTrainingKpi1] = useState(0);
  const [trainingKpi2, setTrainingKpi2] = useState(0);
  const [trainingValuePerCell, setTrainingValuePerCell] = useState(0);
  const [trainingFitness, setTrainingFitness] = useState(0);
  const [trainingPaletteRotations, setTrainingPaletteRotations] = useState(
    Object.fromEntries(TRAINING_BRICK_DEFINITIONS.map(b => [b.type, 0]))
  );
  
  const [trainingTimeLeft, setTrainingTimeLeft] = useState(5 * 60); // 5 minutes for training  
  const trainingPageRef = useRef(null);
  const trainingBoardRef = useRef(null);
  const trainingClickTimers = useRef({});

  // Training-specific helper functions (simplified versions of main game functions)
  const getTrainingAbsoluteCells = (brick, baseX, baseY) => {
    if (!trainingBoardRef.current || !trainingPageRef.current) return [];
    
    const boardRect = trainingBoardRef.current.getBoundingClientRect();
    const pageRect = trainingPageRef.current.getBoundingClientRect();
    
    const offsetX = boardRect.left - pageRect.left + GAP;
    const offsetY = boardRect.top - pageRect.top + GAP;

    return brick.shape.map(([dx, dy]) => {
      const col = Math.floor((baseX - offsetX) / (CELL_SIZE + GAP)) + dx;
      const row = Math.floor((baseY - offsetY) / (CELL_SIZE + GAP)) + dy;
      return [col, row];
    });
  };

  const isTrainingWithinBounds = (cells) => {
    return cells.every(([col, row]) => {
      return col >= 0 && col < GRID_WIDTH && row >= 0 && row < GRID_HEIGHT;
    });
  };

  const isTrainingOverlapping = (cells, excludeId) => {
    const occupied = new Set();
    for (let b of trainingBricks) {
      if (b.id === excludeId) continue;
      const otherCells = getTrainingAbsoluteCells(b, b.x, b.y);
      for (let [col, row] of otherCells) {
        occupied.add(`${col},${row}`);
      }
    }
    return cells.some(([col, row]) => occupied.has(`${col},${row}`));
  };

  const isTrainingFromPalette = (brick) => {
    return !brick.hasOwnProperty('wasPlaced') || !brick.wasPlaced;
  };

  // Training mouse handlers (simplified)
  const handleTrainingMouseDown = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (trainingSelected && trainingSelected !== id) setTrainingSelected(null);
    
    const rect = e.target.getBoundingClientRect();
    setTrainingOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTrainingDragStart({ x: e.clientX, y: e.clientY });
    setTrainingDragging(id);

    if (trainingClickTimers.current[id]) {
      clearTimeout(trainingClickTimers.current[id]);
      delete trainingClickTimers.current[id];
      setTrainingSelected(prev => prev === id ? null : id);
    } else {
      trainingClickTimers.current[id] = setTimeout(() => {
        delete trainingClickTimers.current[id];
      }, 300);
    }
  };

  const handleTrainingMouseMove = (e) => {
    if (!trainingDragging || !trainingPageRef.current) return;
    
    const pageRect = trainingPageRef.current.getBoundingClientRect();
    const newX = e.clientX - trainingOffset.x - pageRect.left;
    const newY = e.clientY - trainingOffset.y - pageRect.top;
    
    setTrainingBricks(prev => prev.map(b => 
      b.id === trainingDragging ? { ...b, x: newX, y: newY } : b
    ));
  };

  const handleTrainingMouseUp = (e) => {
    if (!trainingDragging || !trainingBoardRef.current || !trainingPageRef.current) {
      setTrainingDragging(null);
      return;
    }

    const boardRect = trainingBoardRef.current.getBoundingClientRect();
    const pageRect = trainingPageRef.current.getBoundingClientRect();
    const rawX = e.clientX - boardRect.left;
    const rawY = e.clientY - boardRect.top;

    const brick = trainingBricks.find(b => b.id === trainingDragging);
    if (!brick) {
      setTrainingDragging(null);
      return;
    }

    const dragDistance = Math.sqrt(
      Math.pow(e.clientX - trainingDragStart.x, 2) + Math.pow(e.clientY - trainingDragStart.y, 2)
    );

    if (dragDistance < 5) {
      setTrainingBricks(prev => prev.map(b => 
        b.id === trainingDragging 
          ? { ...b, x: b.lastValidX || b.x, y: b.lastValidY || b.y } 
          : b
      ));
      setTrainingDragging(null);
      return;
    }

    const col = Math.floor((rawX - GAP) / (CELL_SIZE + GAP));
    const row = Math.floor((rawY - GAP) / (CELL_SIZE + GAP));

    const snappedX = boardRect.left - pageRect.left + GAP + col * (CELL_SIZE + GAP);
    const snappedY = boardRect.top - pageRect.top + GAP + row * (CELL_SIZE + GAP);

    const proposedCells = getTrainingAbsoluteCells(brick, snappedX, snappedY);
    const droppedOutsideBoard = rawX < 0 || rawY < 0 || rawX > boardRect.width || rawY > boardRect.height;

    const isOutOfBounds = !isTrainingWithinBounds(proposedCells);
    const hasOverlap = isTrainingOverlapping(proposedCells, trainingDragging);

    if (droppedOutsideBoard || isOutOfBounds || hasOverlap) {
      if (isTrainingFromPalette(brick)) {
        setTrainingBricks(prev => prev.filter(b => b.id !== trainingDragging));
      } else {
        setTrainingBricks(prev => prev.map(b => 
          b.id === trainingDragging 
            ? { ...b, x: b.lastValidX, y: b.lastValidY } 
            : b
        ));
      }
    } else {
      // Valid placement
      setTrainingBricks(prev => prev.map(b => 
        b.id === trainingDragging 
          ? { ...b, x: snappedX, y: snappedY, lastValidX: snappedX, lastValidY: snappedY, wasPlaced: true }
          : b
      ));

      if (isTrainingFromPalette(brick)) {
        const baseType = brick.id.split('-')[0];
        setTrainingBrickCounts(prev => ({
          ...prev,
          [baseType]: prev[baseType] - 1
        }));
      }
    }
    setTrainingDragging(null);
  };

  const handleTrainingPaletteClick = (brickType, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (trainingClickTimers.current[`palette-${brickType}`]) {
      clearTimeout(trainingClickTimers.current[`palette-${brickType}`]);
      delete trainingClickTimers.current[`palette-${brickType}`];
      setTrainingSelected(prev => prev === `palette-${brickType}` ? null : `palette-${brickType}`);
      return;
    } else {
      trainingClickTimers.current[`palette-${brickType}`] = setTimeout(() => {
        delete trainingClickTimers.current[`palette-${brickType}`];
        createTrainingBrickFromPalette(brickType, e);
      }, 300);
    }
  };

  const createTrainingBrickFromPalette = (brickType, e) => {
    const rect = e.target.getBoundingClientRect();
    const pageRect = trainingPageRef.current.getBoundingClientRect();
    const x = e.clientX - pageRect.left - rect.width / 2;
    const y = e.clientY - pageRect.top - rect.height / 2;

    const brickDef = TRAINING_BRICK_DEFINITIONS.find(b => b.type === brickType);
    const rotatedShape = getRotatedShape(brickDef.shape, trainingPaletteRotations[brickType]);
    
    const newId = `${brickType}-${Date.now()}`;
    const newBrick = {
      id: newId,
      color: brickDef.color,
      shape: rotatedShape,
      x,
      y,
      wasPlaced: false
    };

    setTrainingBricks(prev => prev.filter(b => 
      !(b.id.startsWith(`${brickType}-`) && !b.wasPlaced)
    ).concat(newBrick));

    setTrainingDragging(newId);
    setTrainingSelected(newId);
    setTrainingOffset({ x: rect.width / 2, y: rect.height / 2 });
  };
  
  
  const handleTrainingGlobalClick = (e) => {
    if (trainingSelected && !e.target.closest('[data-brick]') && !e.target.closest('[data-palette]')) {
      setTrainingSelected(null);
    }
  };
  
  // Training keyboard handler for rotation and ESC
const handleTrainingKeyDown = (e) => {
  if (e.key === 'Escape') {
    if (trainingSelected) {
      const selectedBrick = trainingBricks.find(b => b.id === trainingSelected);
      if (selectedBrick && selectedBrick.wasPlaced) {
        // Remove brick and update count
        setTrainingBricks(prev => prev.filter(b => b.id !== trainingSelected));
        const baseType = selectedBrick.id.split('-')[0];
        setTrainingBrickCounts(prev => ({
          ...prev,
          [baseType]: prev[baseType] + 1
        }));
        setTrainingSelected(null);
      }
    }
    return;
  }
  
  if (!trainingSelected || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
  
  if (trainingSelected.startsWith('palette-')) {
    const brickType = trainingSelected.replace('palette-', '');
    setTrainingPaletteRotations(prev => ({
      ...prev,
      [brickType]: e.key === 'ArrowLeft'
        ? (prev[brickType] + 1) % 4
        : (prev[brickType] + 3) % 4
    }));
    return;
  }
  
  setTrainingBricks(prev => {
    const updatedBricks = prev.map(b => {
      if (b.id !== trainingSelected) return b;
      
      const rotatedShape = e.key === 'ArrowLeft'
        ? rotateClockwise(b.shape)
        : rotateCounterClockwise(b.shape);

      const proposedCells = getTrainingAbsoluteCells({ ...b, shape: rotatedShape }, b.x, b.y);

      if (!isTrainingWithinBounds(proposedCells) || isTrainingOverlapping(proposedCells, trainingSelected)) {
        return b;
      }

      return { 
        ...b, 
        shape: rotatedShape
      };
    });

    return updatedBricks;
  });
};

const formatTrainingTime = (seconds) => {
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  // Calculate KPIs for training
  useEffect(() => {
    const value = trainingBricks.reduce((sum, brick) => {
      const baseType = brick.id.split('-')[0];
      const brickDef = TRAINING_BRICK_DEFINITIONS.find(b => b.type === baseType);
      return sum + (brickDef ? brickDef.value : 0);
    }, 0);
    setTrainingTotalValue(value);

    const filledCells = new Set();
    trainingBricks.forEach(brick => {
      const absoluteCells = getTrainingAbsoluteCells(brick, brick.x, brick.y);
      absoluteCells.forEach(([col, row]) => {
        if (col >= 0 && col < GRID_WIDTH && row >= 0 && row < GRID_HEIGHT) {
          filledCells.add(`${col},${row}`);
        }
      });
    });
    
    const usedCells = filledCells.size;
    const totalCells = GRID_WIDTH * GRID_HEIGHT;
    const emptyCells = totalCells - usedCells;

    setTrainingCoverage(Math.round((usedCells / totalCells) * 100));
    setTrainingKpi1(value - PENALTY_PER_CELL * emptyCells);
    setTrainingKpi2(PENALTY_PER_CELL * emptyCells);
    setTrainingValuePerCell(usedCells > 0 ? value / usedCells : 0);
    setTrainingFitness(usedCells > 0 ? 75 : null); // Simplified fitness for training
  }, [trainingBricks]);
  
  // Training timer effect
  useEffect(() => {
    if (trainingTimeLeft > 0) {
      const interval = setInterval(() => setTrainingTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (trainingTimeLeft <= 0) {
      // Auto-advance to game phase when training time expires
      onComplete();
    }
  }, [trainingTimeLeft, onComplete]);

// Event listeners for training
useEffect(() => {
  const handleMouseMove = handleTrainingMouseMove;
  const handleMouseUp = handleTrainingMouseUp;
  const handleKeyDown = handleTrainingKeyDown;
  const handleClick = handleTrainingGlobalClick;
  
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("click", handleClick);
  
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("click", handleClick);
  };
});

  return (
    <div ref={trainingPageRef} style={{...styles.page, paddingBottom: '100px'}}>
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '10px', color: '#000' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ width: '100px' }}></div>
          <div>
            <h2 style={{ fontWeight: 'bold', color: '#000', fontSize: '36px', margin: 0 }}>
              <span role="img" aria-label="tetris">🎓</span> Training Phase
            </h2>
          </div>
          <div style={{ 
            fontSize: '14px', 
            color: '#666', 
            fontWeight: 'normal',
            textAlign: 'right',
            width: '100px'
          }}>
            ⏱️ {formatTrainingTime(trainingTimeLeft)}
          </div>
        </div>
        <p style={{ color: '#000' }}>Practice with a simplified version of the game!</p>
      </div>

      {/* Goal and Tips */}
      <p style={{ color: '#000', marginTop: '5px'  }}>Drag and drop the bricks into the frame to maximize <strong>net value</strong>, i.e. the total value of placed bricks <i>minus</i> the penalty from unused space.</p>
		<p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
			💡 Double-click a brick (palette or placed) and use keyboard arrow keys to rotate it<br />
			Press ESC to return a snapped brick back to the palette
		</p>

      {/* Brick Palette */}
      <div style={styles.bucketArea}>
        {TRAINING_BRICK_DEFINITIONS.filter(brick => trainingBrickCounts[brick.type] > 0).map(brick => {
          const rotatedShape = getRotatedShape(brick.shape, trainingPaletteRotations[brick.type]);
          const { offsetX, offsetY } = getCenteredShapeOffset(rotatedShape, CELL_SIZE * 3.5);
          
          return (
            <div key={brick.type} style={styles.bucket}>
              <div style={styles.paletteContainer}>
                <div style={{
                  position: 'absolute',
                  left: `${offsetX}px`,
                  top: `${offsetY - 18}px`,
                  fontWeight: 'bold',
                  fontSize: '12px',
                  color: '#000',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  zIndex: 9999,
                  pointerEvents: 'none'
                }}>
                  ${brick.value}
                </div>

                {rotatedShape.map(([dx, dy], i) => (
                  <div
                    key={i}
                    data-palette="true"
                    onMouseDown={(e) => handleTrainingPaletteClick(brick.type, e)}
                    style={{
                      ...styles.brickCell,
                      backgroundColor: brick.color,
                      position: 'absolute',
                      left: `${offsetX + dx * (CELL_SIZE + GAP)}px`,
                      top: `${offsetY + dy * (CELL_SIZE + GAP)}px`,
                      cursor: 'pointer',
                      ...(trainingSelected === `palette-${brick.type}` ? styles.selected : {})
                    }}
                  />
                ))}
              </div>
              <div style={styles.countText}>{trainingBrickCounts[brick.type]} left</div>
            </div>
          );
        })}
      </div>

      {/* Game Board and KPIs */}
      <div style={styles.boardRow}>
        <div ref={trainingBoardRef} style={styles.boardArea}>
          <div style={styles.grid}>
            {[...Array(GRID_WIDTH * GRID_HEIGHT)].map((_, idx) => (
              <div key={idx} style={styles.cell} />
            ))}
          </div>
        </div>

        {/* KPIs Panel */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center',
            borderLeft: '5px solid #007bff',
            minWidth: '200px',
            boxShadow: '0 0 6px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#007bff',
              marginBottom: '8px',
              fontWeight: '600'
            }}>
              Net Value
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              margin: '0',
              color: trainingKpi1 > 0 ? '#28a745' : trainingKpi1 < 0 ? '#dc3545' : '#2c3e50'
            }}>
              {trainingKpi1 < 0 ? `-$${formatKPI(Math.abs(trainingKpi1))}` : `$${formatKPI(trainingKpi1)}`}
            </div>
          </div>

          <div style={styles.kpiPanel}>
            <h3 style={{ marginTop: 0 }}>📈 KPIs</h3>
            <p><strong>Total Value:</strong> ${trainingTotalValue}</p>
            <p><strong>Resource Cost:</strong> ${formatKPI(trainingKpi2)}</p>
            <p><strong>Coverage:</strong> {trainingCoverage}%</p>
            <p><strong>Value/Resource:</strong> ${formatKPI(trainingValuePerCell)}</p>
            <p><strong>Portfolio Fitness:</strong> {trainingFitness !== null ? `${trainingFitness}%` : 'N/A'}</p>
          </div>

          <button
            onClick={onComplete}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              fontWeight: 'bold',
              border: '1px solid #1c7c31',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              fontSize: '16px',
              minWidth: '200px'
            }}
          >
            Continue to Registration (or wait {formatTrainingTime(trainingTimeLeft)})
          </button>
        </div>
      </div>

      {/* Notes and Calculator below the training frame */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        marginTop: '30px',
        marginBottom: '30px',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: '1000px'
      }}>
        <NoteTracker 
          onMessageAdd={() => {}} 
          gameState={{
            formatDateToUKTime: () => new Date().toLocaleString(),
            getBrowserInfo: () => "Training Browser",
            getDeviceType: () => "Training Device",
            frameMatrix: [],
            GAME_DURATION_SECONDS: 0,
            timeLeft: 0,
            totalValue: 0,
            kpi1: 0,
            kpi2: 0,
            coverage: 0,
            valuePerCell: 0,
            fitness: 0,
            isTraining: true
          }}
        />
        <Calculator 
          onCalculationAdd={() => {}} 
          gameState={{
            formatDateToUKTime: () => new Date().toLocaleString(),
            getBrowserInfo: () => "Training Browser",
            getDeviceType: () => "Training Device",
            frameMatrix: [],
            GAME_DURATION_SECONDS: 0,
            timeLeft: 0,
            totalValue: 0,
            kpi1: 0,
            kpi2: 0,
            coverage: 0,
            valuePerCell: 0,
            fitness: 0,
            isTraining: true
          }}
        />
      </div>

      {/* Render Training Bricks */}
      {trainingBricks.map(brick => {
        const baseType = brick.id.split('-')[0];
        const brickDef = TRAINING_BRICK_DEFINITIONS.find(b => b.type === baseType);
        return (
          <React.Fragment key={brick.id}>
            <div style={{
              position: 'absolute',
              left: `${Math.round(brick.x)}px`,
              top: `${Math.round(brick.y) - 18}px`,
              zIndex: 9999,
              fontWeight: 'bold',
              fontSize: '12px',
              color: '#000',
              backgroundColor: 'rgba(255,255,255,0.9)',
              padding: '1px 6px',
              borderRadius: '4px',
              pointerEvents: 'none'
            }}>
              ${brickDef?.value ?? ''}
            </div>

            {brick.shape.map(([dx, dy], i) => (
              <div
                key={`${brick.id}-${i}`}
                data-brick="true"
                onMouseDown={(e) => handleTrainingMouseDown(e, brick.id)}
                style={{
                  ...styles.brickCell,
                  ...(brick.id === trainingSelected ? styles.selected : {}),
                  backgroundColor: brick.color,
                  left: `${Math.round(brick.x + dx * (CELL_SIZE + GAP))}px`,
                  top: `${Math.round(brick.y + dy * (CELL_SIZE + GAP))}px`
                }}
              />
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Add helper function for KPI display
const formatKPI = (value) => Number.isInteger(value) ? value : value.toFixed(2);

// Custom matrix formatter without quotes "", helper function. Otherwise when JSON.stringify is applied to the matrix, it automatically adds quotes around string values.
const formatMatrixForLogging = (matrix) => {
  return '[' + matrix.map(row => 
    '[' + row.map(cell => cell === 0 ? '0' : cell).join(',') + ']'
  ).join(',') + ']';
};

// Note Tracking Component with Chat-like Functionality
const NoteTracker = ({ onMessageAdd, gameState }) => {
  const [notes, setNotes] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const chatContainerRef = useRef(null);

  const handleKeyPress = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (notes.trim()) {
      const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      const newMessage = {
        id: Date.now(),
        text: notes.trim(),
        timestamp: currentTime,
        date: new Date().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit'
        })
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      // Call the parent callback to update the main app state
      if (onMessageAdd) {
        onMessageAdd(newMessage);
      }
      setNotes('');
      setShowChat(true);

// Log individual note with game state (only if gameState.isTraining is false)
if (!gameState.isTraining) {
  fetch('https://tetris-proxy.vercel.app/api/submit', {
  method: 'POST',
  body: JSON.stringify({
    timestamp: gameState.formatDateToUKTime(new Date().toISOString()),
    browser: gameState.getBrowserInfo(),
    device: gameState.getDeviceType(),
    type: "note",
    participantId: gameState.participantId, // Add participant ID
    id: null,
    anchor: null,
    frameMatrix: formatMatrixForLogging(gameState.frameMatrix),
    duration: gameState.GAME_DURATION_SECONDS - gameState.timeLeft,
    totalValue: gameState.totalValue,
    kpi1: gameState.kpi1,
    kpi2: gameState.kpi2,
    coverage: gameState.coverage,
    valuePerCell: gameState.valuePerCell,
    fitness: gameState.fitness,
    allNotes: `[${newMessage.date} ${newMessage.timestamp}] ${newMessage.text}`,
    noteCount: 1,
    allCalculations: '',
    calculationCount: 0
  }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch(error => {
    console.error('Error logging individual note:', error);
  });
}
  }
  }
};

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const clearChat = () => {
    setChatMessages([]);
    setShowChat(false);
  };

  const formatTimestamp = (message) => {
    return `${message.timestamp}`;
  };

  if (showChat) {
    return (
      <div style={{
        width: '450px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        color: '#000',
        fontSize: '14px',
		height: 'fit-content',        
        display: 'flex',              
        flexDirection: 'column' 
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px',
          gap: '8px'
        }}>
          <span style={{ fontSize: '18px' }}>💬</span>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>My Notes</h3>
        </div>

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          style={{
            height: '80px',
            overflowY: 'auto',
            marginBottom: '16px',
            padding: '8px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            scrollBehavior: 'smooth'
          }}
        >
          {chatMessages.map((message, index) => (
            <div 
              key={message.id} 
              style={{ 
                marginBottom: index === chatMessages.length - 1 ? '4px' : '12px',
                paddingBottom: '8px',
                borderBottom: index === chatMessages.length - 1 ? 'none' : '1px solid #e9ecef'
              }}
            >
              <div style={{
                fontSize: '12px',
                color: '#6c757d',
                marginBottom: '4px',
                fontWeight: '500'
              }}>
                {formatTimestamp(message)} {message.date}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#000',
                lineHeight: '1.4',
                wordBreak: 'break-word'
              }}>
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area - Keep same size as initial state */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your notes here and press enter..."
          style={{
            width: '100%',
            height: '180px',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'inherit',
            resize: 'vertical',
            boxSizing: 'border-box',
            backgroundColor: '#2a2a2a',
            color: '#fff',
            lineHeight: '1.5'
          }}
        />
      </div>
    );
  }

  // Initial state - same as before
  return (
    <div style={{
      width: '450px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      color: '#000',
      fontSize: '14px',
	  height: 'fit-content',       
	  display: 'flex',             
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
        gap: '8px'
      }}>
        <span style={{ fontSize: '18px' }}>💬</span>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>My Notes</h3>
      </div>
      
      <div style={{
        marginBottom: '12px',
        padding: '12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        borderLeft: '4px solid #007bff'
      }}>
        <p style={{ 
          margin: 0, 
          fontSize: '14px', 
          fontWeight: '500',
          marginBottom: '4px' 
        }}>
          Start your notes and strategy log
        </p>
        <p style={{ 
          margin: 0, 
          fontSize: '13px', 
          color: '#666',
          lineHeight: '1.4'
        }}>
          Type your thoughts below and press Enter<br />
          Track your gameplay decisions in real-time
        </p>
      </div>
      
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your notes here and press enter..."
        style={{
          width: '100%',
          height: '180px',
          padding: '12px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'inherit',
          resize: 'vertical',
          boxSizing: 'border-box',
          backgroundColor: '#2a2a2a',
          color: '#fff',
          lineHeight: '1.5'
        }}
      />
    </div>
  );
};

const Calculator = ({ onCalculationAdd, gameState }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [showTwoLines, setShowTwoLines] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Constants
  const OPERATORS = ['+', '-', '×', '/'];
  const MAX_DIGITS = 15;

  // Reset to single line mode
  const resetToSingleLine = useCallback(() => {
    if (showTwoLines) {
      setShowTwoLines(false);
      setResult('');
      setHasError(false);
    }
  }, [showTwoLines]);

  // Validate and format number input
  const formatNumber = useCallback((num) => {
    const str = String(num);
    if (str.length > MAX_DIGITS) {
      return parseFloat(num).toPrecision(MAX_DIGITS);
    }
    return str;
  }, []);

  // Enhanced expression evaluator
  const evaluateExpression = useCallback((expression, showErrors = false) => {
    if (!expression?.trim()) return null;
    
    try {
      // Validate parentheses balance
      const openCount = (expression.match(/\(/g) || []).length;
      const closeCount = (expression.match(/\)/g) || []).length;
      
      if (openCount !== closeCount) {
        return showErrors ? "Unmatched parentheses" : null;
      }

      // Check for invalid patterns
      const invalidPatterns = [
        /\+{2,}/, /\-{3,}/, /×{2,}/, /\/{2,}/, // Multiple consecutive operators
        /[\+×\/]\)/, /\([\+×\/]/, // Invalid operator positions
        /\.\d*\./ // Multiple decimals in one number
      ];

      if (invalidPatterns.some(pattern => pattern.test(expression))) {
        return showErrors ? "Invalid expression" : null;
      }

      // Replace operators and evaluate
      let jsExpression = expression
        .replace(/×/g, '*')
        .replace(/\//g, '/')
        .replace(/\b0+(\d)/g, '$1'); // Remove leading zeros

      // Check for division by zero
      if (/\/\s*0(?!\.)/.test(jsExpression)) {
        return showErrors ? "Cannot divide by zero" : null;
      }

      const result = Function('"use strict"; return (' + jsExpression + ')')();
      
      if (!isFinite(result)) {
        return showErrors ? "Math error" : null;
      }

      // Handle very large or very small numbers
      if (Math.abs(result) > 1e15) {
        return showErrors ? result.toExponential(6) : result;
      }
      
      if (Math.abs(result) < 1e-10 && result !== 0) {
        return showErrors ? result.toExponential(6) : result;
      }

      return result;
    } catch (error) {
      return showErrors ? "Error" : null;
    }
  }, []);

  // Handle number input
  const inputNumber = useCallback((num) => {
    resetToSingleLine();

    // Prevent input if error state
    if (hasError) return;

    // Limit number length
    if (display.replace(/[^0-9]/g, '').length >= MAX_DIGITS) return;

    let newDisplay, newEquation;
    
    if (lastInput === 'equals') {
      // Start fresh after equals
      newDisplay = String(num);
      newEquation = String(num);
    } else if (display === '0' || lastInput === 'operator' || lastInput === 'openParen') {
      // Start new number
      newDisplay = String(num);
      newEquation = equation + num;
    } else {
      // Continue current number
      newDisplay = display + num;
      newEquation = equation + num;
    }
    
    setDisplay(newDisplay);
    setEquation(newEquation);
    setLastInput('number');
  }, [display, equation, lastInput, hasError, resetToSingleLine]);

  // Handle decimal input
  const inputDecimal = useCallback(() => {
    resetToSingleLine();
    
    if (hasError) return;
    if (display.includes('.')) return;

    let newDisplay, newEquation;
    
    if (lastInput === 'equals') {
      newDisplay = '0.';
      newEquation = '0.';
    } else if (lastInput === 'operator' || lastInput === 'openParen' || display === '0') {
      newDisplay = '0.';
      newEquation = equation + '0.';
    } else {
      newDisplay = display + '.';
      newEquation = equation + '.';
    }
    
    setDisplay(newDisplay);
    setEquation(newEquation);
    setLastInput('decimal');
  }, [display, equation, lastInput, hasError, resetToSingleLine]);

  // Handle operator input
  const inputOperator = useCallback((op) => {
    resetToSingleLine();
    
    if (hasError) return;

    // Special handling for negative sign
    if (op === '-' && (equation === '' || lastInput === 'operator' || lastInput === 'openParen')) {
      setEquation(prev => prev + op);
      setDisplay('0');
      setLastInput('operator');
      return;
    }

    // Validate operator placement
    if (equation === '' && op !== '-') return;
    if (lastInput === 'operator') return;
    if (lastInput === 'openParen' && op !== '-') return;
    if (!['number', 'closeParen', 'decimal', 'equals'].includes(lastInput)) return;

    setEquation(prev => prev + op);
    setDisplay('0');
    setLastInput('operator');
  }, [equation, lastInput, hasError, resetToSingleLine]);

  // Handle parentheses
  const inputParenthesis = useCallback((paren) => {
    resetToSingleLine();
    
    if (hasError) return;

    if (paren === '(') {
      if (['', 'operator', 'openParen'].includes(lastInput) || equation === '') {
        setEquation(prev => prev + paren);
        setLastInput('openParen');
        setDisplay('0');
      }
    } else {
      if (['number', 'closeParen', 'decimal'].includes(lastInput)) {
        setEquation(prev => prev + paren);
        setLastInput('closeParen');
        setDisplay('0');
      }
    }
  }, [equation, lastInput, hasError, resetToSingleLine]);

  // Perform calculation
  const calculate = useCallback(() => {
    if (!equation || hasError) return;
    
    const calculatedResult = evaluateExpression(equation, true);
    
    if (typeof calculatedResult === 'string' && calculatedResult.includes('Error')) {
      setHasError(true);
      setResult(calculatedResult);
      setDisplay(calculatedResult);
    } else {
      const formattedResult = formatNumber(calculatedResult);
      setResult(formattedResult);
      setDisplay(formattedResult);
      
      // Create calculation entry
      const calculationEntry = {
        id: Date.now(),
        expression: `${equation}=${formattedResult}`,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        date: new Date().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit'
        })
      };
      
      // Log the calculation when = is pressed
      if (onCalculationAdd) {
        onCalculationAdd(calculationEntry);
      }

// Log individual calculation immediately (only if not training)
      if (!gameState.isTraining) {
        fetch('https://tetris-proxy.vercel.app/api/submit', {
  method: 'POST',
  body: JSON.stringify({
    timestamp: gameState.formatDateToUKTime(new Date().toISOString()),
    browser: gameState.getBrowserInfo(),
    device: gameState.getDeviceType(),
    type: "calculation",
    participantId: gameState.participantId,
    id: null,
    anchor: null,
    frameMatrix: formatMatrixForLogging(gameState.frameMatrix),
    duration: gameState.GAME_DURATION_SECONDS - gameState.timeLeft,
    totalValue: gameState.totalValue,
    kpi1: gameState.kpi1,
    kpi2: gameState.kpi2,
    coverage: gameState.coverage,
    valuePerCell: gameState.valuePerCell,
    fitness: gameState.fitness,
    allNotes: '',
    noteCount: 0,
    allCalculations: `[${calculationEntry.date} ${calculationEntry.timestamp}] ${calculationEntry.expression}`,
    calculationCount: 1
  }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).catch(error => {
          console.error('Error logging individual calculation:', error);
        });
      }
    }
    
    setShowTwoLines(true);
    setLastInput('equals');
  }, [equation, hasError, evaluateExpression, formatNumber, onCalculationAdd, gameState]);

  // Clear all
  const clearAll = useCallback(() => {
    setDisplay('0');
    setEquation('');
    setResult('');
    setLastInput('');
    setShowTwoLines(false);
    setHasError(false);
  }, []);

  // Backspace
  const backspace = useCallback(() => {
    resetToSingleLine();
    
    if (hasError) {
      clearAll();
      return;
    }

    if (equation.length === 0) return;
    
    const newEquation = equation.slice(0, -1);
    setEquation(newEquation);
    
    if (newEquation === '') {
      setDisplay('0');
      setLastInput('');
      return;
    }
    
    // Update display and last input based on remaining equation
    const lastChar = newEquation.slice(-1);
    
    if (/\d/.test(lastChar)) {
      setLastInput('number');
      const match = newEquation.match(/\d+\.?\d*$/);
      setDisplay(match ? match[0] : '0');
    } else if (lastChar === '.') {
      setLastInput('decimal');
      const match = newEquation.match(/\d*\.$/);
      setDisplay(match ? match[0] : '0.');
    } else if (lastChar === '(') {
      setLastInput('openParen');
      setDisplay('0');
    } else if (lastChar === ')') {
      setLastInput('closeParen');
      setDisplay('0');
    } else if (OPERATORS.includes(lastChar)) {
      setLastInput('operator');
      setDisplay('0');
    }
  }, [equation, hasError, resetToSingleLine, clearAll]);

  // Button styles
  const baseButtonStyle = {
    width: '70px',
    height: '50px',
    margin: '3px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    userSelect: 'none',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const numberButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#ffffff',
    color: '#2c3e50',
    border: '1px solid #e1e8ed',
  };

  const operatorButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#3498db',
    color: 'white',
  };

  const specialButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#e74c3c',
    color: 'white',
  };

  const equalsButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#f39c12',
    color: 'white',
  };

  return (
    <div style={{
      width: '450px',
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      color: '#2c3e50',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
	  height: 'fit-content',        
      display: 'flex',              
      flexDirection: 'column' 
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '12px'
      }}>
        <span style={{ fontSize: '24px' }}>🧮</span>
        <h3 style={{ 
          margin: 0, 
          fontSize: '22px', 
          fontWeight: '700',
          color: '#2c3e50'
        }}>
          Calculator
        </h3>
      </div>
      
      {/* Display */}
      <div style={{
        width: '100%',
        minHeight: '100px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        boxSizing: 'border-box',
        fontFamily: "'SF Mono', Consolas, monospace",
        border: hasError ? '2px solid #e74c3c' : '2px solid #e1e8ed',
      }}>
        {showTwoLines ? (
          <>
            <div style={{
              fontSize: '16px',
              color: '#7f8c8d',
              marginBottom: '8px',
              textAlign: 'right',
              width: '100%',
              wordBreak: 'break-all',
            }}>
              {equation}
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: hasError ? '#e74c3c' : '#2c3e50',
              textAlign: 'right',
              width: '100%',
              wordBreak: 'break-all',
            }}>
              {result}
            </div>
          </>
        ) : (
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: hasError ? '#e74c3c' : '#2c3e50',
            textAlign: 'right',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            minHeight: '60px',
            wordBreak: 'break-all',
          }}>
            {equation || display}
          </div>
        )}
      </div>

      {/* Button Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '8px',
        justifyItems: 'center'
      }}>
        <button 
          style={specialButtonStyle} 
          onClick={clearAll}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          C
        </button>
        <button 
          style={numberButtonStyle} 
          onClick={backspace}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#ecf0f1'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          ⌫
        </button>
        <button 
          style={operatorButtonStyle} 
          onClick={() => inputParenthesis('(')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          (
        </button>
        <button 
          style={operatorButtonStyle} 
          onClick={() => inputParenthesis(')')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          )
        </button>
        
        {[7, 8, 9].map(num => (
          <button 
            key={num}
            style={numberButtonStyle} 
            onClick={() => inputNumber(num)}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#ecf0f1'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
          >
            {num}
          </button>
        ))}
        <button 
          style={operatorButtonStyle} 
          onClick={() => inputOperator('/')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          ÷
        </button>
        
        {[4, 5, 6].map(num => (
          <button 
            key={num}
            style={numberButtonStyle} 
            onClick={() => inputNumber(num)}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#ecf0f1'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
          >
            {num}
          </button>
        ))}
        <button 
          style={operatorButtonStyle} 
          onClick={() => inputOperator('×')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          ×
        </button>
        
        {[1, 2, 3].map(num => (
          <button 
            key={num}
            style={numberButtonStyle} 
            onClick={() => inputNumber(num)}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#ecf0f1'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
          >
            {num}
          </button>
        ))}
        <button 
          style={operatorButtonStyle} 
          onClick={() => inputOperator('-')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          −
        </button>
        
        <button 
          style={numberButtonStyle} 
          onClick={() => inputNumber(0)}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#ecf0f1'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          0
        </button>
        <button 
          style={numberButtonStyle} 
          onClick={inputDecimal}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#ecf0f1'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          .
        </button>
        <button 
          style={equalsButtonStyle} 
          onClick={calculate}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#e67e22'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#f39c12'}
        >
          =
        </button>
        <button 
          style={operatorButtonStyle} 
          onClick={() => inputOperator('+')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          +
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#fdf6e3',
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    overflow: 'auto',
    position: 'relative',
    color: '#000'
  },
  boardRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
    alignItems: 'flex-start',
    marginTop: '20px'
  },
  boardArea: {
    position: 'relative',
    width: `${GRID_WIDTH * (CELL_SIZE + GAP) + GAP}px`,
    height: `${GRID_HEIGHT * (CELL_SIZE + GAP) + GAP}px`,
    backgroundColor: '#d2b48c',
    borderRadius: '12px',
    boxShadow: '0 0 10px #000',
    zIndex: 0
  },
  kpiPanel: {
    minWidth: '200px',
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 0 6px rgba(0,0,0,0.2)',
    color: '#000',
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(${GRID_WIDTH}, ${CELL_SIZE}px)`,
    gridTemplateRows: `repeat(${GRID_HEIGHT}, ${CELL_SIZE}px)`,
    gap: `${GAP}px`,
    backgroundColor: '#000',
    padding: `${GAP}px`
  },
  cell: {
    width: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
    backgroundColor: '#111',
    border: '1px solid #333',
    boxSizing: 'border-box'
  },
  brickCell: {
    width: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
    position: 'absolute',
    cursor: 'grab',
    border: '2px solid #000',
    zIndex: 2,
    transition: 'box-shadow 0.2s ease, transform 0.2s ease'
  },
  selected: {
    boxShadow: '0 0 10px 3px yellow'
  },
  bucketArea: {
    marginTop: '20px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    padding: '16px',
    border: '2px dashed #aaa',
    borderRadius: '12px',
    backgroundColor: '#f9f5ec'
  },
  bucket: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    position: 'relative'
  },
  paletteContainer: {
    position: 'relative',
    width: `${CELL_SIZE * 3.5}px`,
    height: `${CELL_SIZE * 3.5}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  countText: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '4px',
    marginBottom: '4px',
    textAlign: 'center',
    width: '100%',
    color: '#222',
    alignSelf: 'center',
    display: 'block'
  }
};

const BRICK_DEFINITIONS = [
  { type: 'tshape', color: 'limegreen', count: 12, value: 14, shape: [[0, 0], [1, 0], [2, 0], [1, 1]] },
  { type: 'zshape', color: 'violet', count: 10, value: 18, shape: [[0, 0], [1, 0], [1, 1], [2, 1]] },
  { type: 'lshape', color: 'orange', count: 18, value: 9, shape: [[0, 0], [1, 0], [0, 1]] },
  { type: 'line', color: 'yellow', count: 15, value: 12, shape: [[0, 0], [1, 0], [2, 0]] }
];


// Helper function to calculate fitness based on spread of empty cells (0-100% scale)
/**
 * STRUCTURAL FITNESS CALCULATOR
 * =============================
 * 
 * This function measures how well placed Tetris pieces form a unified, cohesive structure.
 * Higher scores indicate pieces that work together as one structure; lower scores indicate
 * scattered, disconnected pieces.
 * 
 * The fitness is calculated using 5 weighted components:
 * 
 * 1. CONNECTIVITY (35%): Do pieces connect to form one unified structure?
 * 2. COMPACTNESS (25%): How efficiently do pieces fill their bounding box?
 * 3. ADJACENCY (15%): Do individual cells have many occupied neighbors?
 * 4. CENTER OF MASS (15%): Are pieces clustered around a central point?
 * 5. STRUCTURAL INTEGRITY (10%): Do pieces form recognizable patterns?
 * 
 * EXAMPLES:
 * - Two L-shapes touching: ~85-95% (high connectivity, good clustering)
 * - Two separate clusters: ~45-65% (broken connectivity, scattered)
 * - Pieces in opposite corners: ~15-35% (no connectivity, poor center of mass)
 */
const calculateStructuralFitness = (frameMatrix) => {
  const GRID_WIDTH = 8;
  const GRID_HEIGHT = 12;
  
  /**
   * HELPER: Find Connected Components
   * =================================
   * Uses depth-first search to find groups of adjacent occupied cells.
   * Each group represents a separate "structure" on the board.
   * 
   * GOAL: Ideally we want only 1 connected component (all pieces touching)
   */
  const findConnectedComponents = (occupiedCells) => {
    const cellSet = new Set(occupiedCells.map(([r, c]) => `${r},${c}`));
    const visited = new Set();
    const clusters = [];
    
    // Depth-first search to explore connected cells
    const dfs = (row, col, currentCluster) => {
      const key = `${row},${col}`;
      if (visited.has(key) || !cellSet.has(key)) return;
      
      visited.add(key);
      currentCluster.push([row, col]);
      
      // Check 4 adjacent cells (up, down, left, right)
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      directions.forEach(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < GRID_HEIGHT && newCol >= 0 && newCol < GRID_WIDTH) {
          dfs(newRow, newCol, currentCluster);
        }
      });
    };
    
    // Find all separate connected components
    occupiedCells.forEach(([row, col]) => {
      const key = `${row},${col}`;
      if (!visited.has(key)) {
        const cluster = [];
        dfs(row, col, cluster);
        if (cluster.length > 0) {
          clusters.push(cluster);
        }
      }
    });
    
    return clusters;
  };

  /**
   * HELPER: Calculate Center of Mass
   * ================================
   * Finds the geometric center point of all occupied cells.
   * This represents the "balance point" of the structure.
   * 
   * GOAL: Pieces should cluster around this center point for high fitness
   */
  const calculateCenterOfMass = (cells) => {
    if (cells.length === 0) return { row: 0, col: 0 };
    
    // Average position of all cells
    const sumRow = cells.reduce((sum, [r, c]) => sum + r, 0);
    const sumCol = cells.reduce((sum, [r, c]) => sum + c, 0);
    
    return {
      row: sumRow / cells.length,
      col: sumCol / cells.length
    };
  };

  /**
   * HELPER: Detect Rectangular Patterns
   * ====================================
   * Searches for organized rectangular formations within the placed pieces.
   * Rectangles indicate good structural organization and planning.
   * 
   * GOAL: Reward organized, geometric patterns over random placement
   */
  const detectRectangularPatterns = (cells) => {
    if (cells.length < 4) return 0; // Need at least 4 cells for smallest rectangle
    
    // Create lookup set for fast cell existence checks
    const cellSet = new Set(cells.map(([r, c]) => `${r},${c}`));
    
    let rectangularScore = 0;
    
    // Check for rectangles of various sizes (2x2 up to 4x4)
    for (let height = 2; height <= 4; height++) {
      for (let width = 2; width <= 4; width++) {
        // Try each occupied cell as a potential top-left corner
        cells.forEach(([startRow, startCol]) => {
          let rectangleFound = true;
          
          // Check if all cells in this rectangle are occupied
          for (let r = startRow; r < startRow + height; r++) {
            for (let c = startCol; c < startCol + width; c++) {
              if (!cellSet.has(`${r},${c}`)) {
                rectangleFound = false;
                break;
              }
            }
            if (!rectangleFound) break;
          }
          
          if (rectangleFound) {
            // Award points proportional to rectangle size
            rectangularScore += height * width;
          }
        });
      }
    }
    
    // Normalize score relative to total number of cells
    return Math.min(100, (rectangularScore / Math.max(1, cells.length)) * 25);
  };

  // ==========================================
  // MAIN CALCULATION STARTS HERE
  // ==========================================
  
  // Extract all occupied cells from the game board
  const occupiedCells = [];
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      if (frameMatrix[row][col] !== 0) {
        occupiedCells.push([row, col]);
      }
    }
  }
  
  // Edge case: single piece or empty board gets perfect score
  if (occupiedCells.length <= 1) return 100;
  
  /**
   * COMPONENT 1: CONNECTIVITY SCORE (35% weight)
   * ============================================
   * Measures what percentage of pieces belong to the largest connected structure.
   * 
   * PERFECT (100%): All pieces form one connected structure
   * POOR (0%): Each piece is isolated from all others
   */
  const clusters = findConnectedComponents(occupiedCells);
  const largestCluster = Math.max(...clusters.map(c => c.length));
  const connectivityScore = (largestCluster / occupiedCells.length) * 100;
  
  /**
   * COMPONENT 2: COMPACTNESS SCORE (25% weight)  
   * ===========================================
   * Measures how efficiently pieces fill their bounding rectangle.
   * 
   * PERFECT (100%): Pieces completely fill a rectangular area with no gaps
   * POOR (0%): Pieces are spread out with many empty spaces in between
   */
  const minRow = Math.min(...occupiedCells.map(([r, c]) => r));
  const maxRow = Math.max(...occupiedCells.map(([r, c]) => r));
  const minCol = Math.min(...occupiedCells.map(([r, c]) => c));
  const maxCol = Math.max(...occupiedCells.map(([r, c]) => c));
  
  const boundingBoxArea = (maxRow - minRow + 1) * (maxCol - minCol + 1);
  const compactnessScore = (occupiedCells.length / boundingBoxArea) * 100;
  
  /**
   * COMPONENT 3: ADJACENCY SCORE (15% weight)
   * ==========================================
   * Measures how many neighbors each cell has on average.
   * Cells with more occupied neighbors indicate better integration.
   * 
   * PERFECT (100%): Every cell has 4 occupied neighbors (impossible but theoretical max)
   * POOR (0%): No cell has any occupied neighbors (all isolated)
   */
  let totalAdjacencies = 0;
  let maxPossibleAdjacencies = 0;
  
  occupiedCells.forEach(([row, col]) => {
    // Check the 4 adjacent positions (up, down, left, right)
    const neighbors = [
      [row-1, col], [row+1, col], [row, col-1], [row, col+1]
    ];
    
    neighbors.forEach(([r, c]) => {
      // Only count neighbors that are within the grid bounds
      if (r >= 0 && r < GRID_HEIGHT && c >= 0 && c < GRID_WIDTH) {
        maxPossibleAdjacencies++;
        if (frameMatrix[r][c] !== 0) {
          totalAdjacencies++;
        }
      }
    });
  });
  
  const adjacencyScore = maxPossibleAdjacencies > 0 ? 
    (totalAdjacencies / maxPossibleAdjacencies) * 100 : 100;
  
  /**
   * COMPONENT 4: CENTER OF MASS SCORE (15% weight)
   * ==============================================
   * Measures how clustered pieces are around their geometric center.
   * Pieces close to the center indicate unified, cohesive placement.
   * 
   * PERFECT (100%): All pieces are very close to the center point
   * POOR (0%): Pieces are scattered far from the center (e.g., opposite corners)
   */
  const centerOfMass = calculateCenterOfMass(occupiedCells);
  let centerOfMassScore = 0;
  
  if (occupiedCells.length > 1) {
    // Calculate average distance of all pieces from the center of mass
    const avgDistance = occupiedCells.reduce((sum, [r, c]) => {
      const distance = Math.sqrt(
        Math.pow(r - centerOfMass.row, 2) + Math.pow(c - centerOfMass.col, 2)
      );
      return sum + distance;
    }, 0) / occupiedCells.length;
    
    // Convert distance to score: lower distance = higher score
    // Normalize based on maximum possible distance across the grid
    const maxPossibleDistance = Math.sqrt(GRID_HEIGHT * GRID_HEIGHT + GRID_WIDTH * GRID_WIDTH) / 2;
    centerOfMassScore = Math.max(0, 100 - (avgDistance / maxPossibleDistance) * 100);
  } else {
    centerOfMassScore = 100; // Single piece gets perfect center score
  }
  
  /**
   * COMPONENT 5: STRUCTURAL INTEGRITY BONUS (10% weight)
   * ====================================================
   * Rewards organized, recognizable patterns like rectangles.
   * This indicates deliberate, thoughtful placement rather than random dropping.
   * 
   * PERFECT (100%): Many overlapping rectangular patterns found
   * POOR (0%): No organized geometric patterns detected
   */
  const structuralScore = detectRectangularPatterns(occupiedCells);
  
  /**
   * FINAL CALCULATION
   * =================
   * Combine all 5 components using weighted average.
   * Each component contributes to the overall "structural unity" assessment.
   */
  const fitness = (
    connectivityScore * 0.35 +    // Most important: are pieces connected?
    compactnessScore * 0.25 +     // Second: do they fill space efficiently?
    adjacencyScore * 0.15 +       // Third: good local neighbor relationships?
    centerOfMassScore * 0.15 +    // Fourth: clustered around center point?
    structuralScore * 0.10        // Fifth: organized geometric patterns?
  );
  
  // Return score between 0-100
  return Math.round(Math.min(100, Math.max(0, fitness)));
};

// Advanced pattern detection for more complex shapes
const detectAdvancedPatterns = (cells) => {
  if (cells.length < 4) return 0;
  
  const cellSet = new Set(cells.map(([r, c]) => `${r},${c}`));
  let patternScore = 0;
  
  // 1. Rectangle detection (already implemented in main function)
  
  // 2. L-Shape detection
  const detectLShapes = () => {
    let lShapeCount = 0;
    cells.forEach(([row, col]) => {
      // Check all 4 possible L orientations
      const lPatterns = [
        [[0,0], [1,0], [2,0], [2,1]], // L pointing right
        [[0,0], [0,1], [0,2], [1,0]], // L pointing down
        [[0,0], [0,1], [1,1], [2,1]], // L pointing left
        [[0,1], [1,0], [1,1], [1,2]]  // L pointing up
      ];
      
      lPatterns.forEach(pattern => {
        const lCells = pattern.map(([dr, dc]) => `${row + dr},${col + dc}`);
        if (lCells.every(cell => cellSet.has(cell))) {
          lShapeCount++;
        }
      });
    });
    return lShapeCount * 8; // Bonus for L-shapes
  };
  
  // 3. T-Shape detection
  const detectTShapes = () => {
    let tShapeCount = 0;
    cells.forEach(([row, col]) => {
      const tPatterns = [
        [[0,0], [0,1], [0,2], [1,1]], // T pointing down
        [[0,1], [1,0], [1,1], [1,2]], // T pointing up
        [[0,0], [1,0], [2,0], [1,1]], // T pointing right
        [[0,1], [1,0], [1,1], [2,1]]  // T pointing left
      ];
      
      tPatterns.forEach(pattern => {
        const tCells = pattern.map(([dr, dc]) => `${row + dr},${col + dc}`);
        if (tCells.every(cell => cellSet.has(cell))) {
          tShapeCount++;
        }
      });
    });
    return tShapeCount * 10; // Higher bonus for T-shapes
  };
  
  // 4. Line detection (horizontal and vertical)
  const detectLines = () => {
    let lineScore = 0;
    
    // Horizontal lines
    for (let length = 3; length <= 6; length++) {
      cells.forEach(([row, col]) => {
        let hasLine = true;
        for (let i = 0; i < length; i++) {
          if (!cellSet.has(`${row},${col + i}`)) {
            hasLine = false;
            break;
          }
        }
        if (hasLine) lineScore += length * 2;
      });
    }
    
    // Vertical lines
    for (let length = 3; length <= 6; length++) {
      cells.forEach(([row, col]) => {
        let hasLine = true;
        for (let i = 0; i < length; i++) {
          if (!cellSet.has(`${row + i},${col}`)) {
            hasLine = false;
            break;
          }
        }
        if (hasLine) lineScore += length * 2;
      });
    }
    
    return lineScore;
  };
  
  patternScore += detectLShapes();
  patternScore += detectTShapes();
  patternScore += detectLines();
  
  // Normalize based on number of cells
  return Math.min(100, (patternScore / Math.max(1, cells.length)) * 10);
};

// Alternative: Simpler "Gap Penalty" approach
const calculateGapPenaltyFitness = (frameMatrix) => {
  const GRID_WIDTH = 8;
  const GRID_HEIGHT = 12;
  
  const occupiedCells = [];
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      if (frameMatrix[row][col] !== 0) {
        occupiedCells.push([row, col]);
      }
    }
  }
  
  if (occupiedCells.length <= 1) return 100;
  
  // Calculate the convex hull area (simplified as bounding box)
  const minRow = Math.min(...occupiedCells.map(([r, c]) => r));
  const maxRow = Math.max(...occupiedCells.map(([r, c]) => r));
  const minCol = Math.min(...occupiedCells.map(([r, c]) => c));
  const maxCol = Math.max(...occupiedCells.map(([r, c]) => c));
  
  // Count gaps within the bounding box
  let gapsInBoundingBox = 0;
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      if (frameMatrix[row][col] === 0) {
        gapsInBoundingBox++;
      }
    }
  }
  
  const boundingBoxArea = (maxRow - minRow + 1) * (maxCol - minCol + 1);
  const gapRatio = gapsInBoundingBox / boundingBoxArea;
  
  // Fitness = 100% - gap percentage
  return Math.round((1 - gapRatio) * 100);
};

// For even more advanced pattern detection, you can also use:
// const advancedPatternScore = detectAdvancedPatterns(occupiedCells);
// Then incorporate this score into your main fitness calculation

const getBoardCoordinates = (x, y, boardRef, pageRef) => {
  if (!boardRef.current || !pageRef.current) return { col: -1, row: -1 };
  
  const boardRect = boardRef.current.getBoundingClientRect();
  const pageRect = pageRef.current.getBoundingClientRect();
  
  // Use CSS pixel values directly without zoom adjustment
  const offsetX = boardRect.left - pageRect.left + GAP;
  const offsetY = boardRect.top - pageRect.top + GAP;
  
  const col = Math.floor((x - offsetX) / (CELL_SIZE + GAP));
  const row = Math.floor((y - offsetY) / (CELL_SIZE + GAP));
  
  return { col, row };
};

const clearBrickFromMatrix = (matrix, brick, boardRef, pageRef) => {
  const { col: baseCol, row: baseRow } = getBoardCoordinates(brick.x, brick.y, boardRef, pageRef);
  const baseType = brick.id.split('-')[0];
  
  brick.shape.forEach(([dx, dy]) => {
    const col = baseCol + dx;
    const row = baseRow + dy;
    if (row >= 0 && row < GRID_HEIGHT && col >= 0 && col < GRID_WIDTH) {
      if (matrix[row][col] === baseType) {
        matrix[row][col] = 0;
      }
    }
  });
};

const addBrickToMatrix = (matrix, brick, x, y, boardRef, pageRef) => {
  const { col: baseCol, row: baseRow } = getBoardCoordinates(x, y, boardRef, pageRef);
  const baseType = brick.id.split('-')[0];
  
  brick.shape.forEach(([dx, dy]) => {
    const col = baseCol + dx;
    const row = baseRow + dy;
    if (row >= 0 && row < GRID_HEIGHT && col >= 0 && col < GRID_WIDTH) {
      matrix[row][col] = baseType;
    }
  });
  
  return { baseCol, baseRow };
};

function App() {
  
  const [brickGridPositions, setBrickGridPositions] = useState(new Map());
  const [participantId, setParticipantId] = useState('');
  
  // Add data logging state
  const [eventLog, setEventLog] = useState([]); // used in data logging 
  const [allChatMessages, setAllChatMessages] = useState([]); // Track all chat messages for logging
  const [allCalculations, setAllCalculations] = useState([]); // Track all calculations for logging

  const EMPTY_FRAME = Array.from({ length: 12 }, () => Array(8).fill(0)); // used in data logging 
  const [frameMatrix, setFrameMatrix] = useState(EMPTY_FRAME); // used in data logging

  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);

const [showSummary, setShowSummary] = useState(false);
const [showSurvey, setShowSurvey] = useState(false);
const [finalTime, setFinalTime] = useState(null);
const [summaryTimeLeft, setSummaryTimeLeft] = useState(60); // 1 minute countdown
const [surveyTimeLeft, setSurveyTimeLeft] = useState(15 * 60); // 15 minutes for survey

  const [brickCounts, setBrickCounts] = useState(
    Object.fromEntries(BRICK_DEFINITIONS.map(b => [b.type, b.count]))
  );
  const [bricks, setBricks] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [selected, setSelected] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [totalValue, setTotalValue] = useState(0);
  const [coverage, setCoverage] = useState(0);
  const [kpi1, setKpi1] = useState(0);
  const [valuePerCell, setValuePerCell] = useState(0);
  const [fitness, setFitness] = useState(0);
  
  const [paletteRotations, setPaletteRotations] = useState(
    Object.fromEntries(BRICK_DEFINITIONS.map(b => [b.type, 0]))
  );
  const [kpi2, setKpi2] = useState(0);
  
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTraining, setShowTraining] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [trainingCompleted, setTrainingCompleted] = useState(false);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  
  const [trainingAllChatMessages, setTrainingAllChatMessages] = useState([]);
  const [trainingAllCalculations, setTrainingAllCalculations] = useState([]);

  const pageRef = useRef(null);
  const boardRef = useRef(null);

  const clickTimers = useRef({});
  
  // Add data logging helper functions
  const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    const match = ua.match(/(Chrome|Firefox|Safari|Edg|OPR|Trident)\/(\d+\.\d+)/);
    return match ? `${match[1]} ${match[2]}` : "Unknown Browser";
  };

  const getDeviceType = () => {
    if (typeof navigator.userAgentData !== "undefined") {
      return navigator.userAgentData.mobile ? "Mobile" : "Desktop";
    }
    return /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
  };

  // This function takes a UTC date and formats it nicely in UK timezone
  const formatDateToUKTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const parts = new Intl.DateTimeFormat('en-GB', options).formatToParts(date);
    const lookup = {};
    parts.forEach(({ type, value }) => {
      lookup[type] = value;
    });

    const time = date.toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    return `${lookup.weekday}, ${lookup.day} ${lookup.month} ${time} UK time`;
  };
  
  // Function to handle new chat messages
  const handleNewChatMessage = (message) => {
    setAllChatMessages(prev => [...prev, message]);
  };

  // Function to log all chat messages to Google Sheets
  const logAllChatMessages = async () => {
  if (allChatMessages.length === 0) return;

  const aggregatedNotes = allChatMessages.map(message => 
    `[${message.date} ${message.timestamp}] ${message.text}`
  ).join(' | ');

  const aggregatedCalculations = allCalculations.map(calculation => 
    `[${calculation.date} ${calculation.timestamp}] ${calculation.expression}`
  ).join(' | ');

  try {
    await fetch('https://tetris-proxy.vercel.app/api/submit', {
      method: 'POST',
      body: JSON.stringify({
        timestamp: formatDateToUKTime(new Date().toISOString()),
        browser: getBrowserInfo(),
        device: getDeviceType(),
        type: "notes",
        id: null,
        anchor: null,
        frameMatrix: formatMatrixForLogging(frameMatrix),
        duration: GAME_DURATION_SECONDS - timeLeft,
        totalValue,
        kpi1,
        kpi2,
        coverage,
        valuePerCell,
        fitness,
        allNotes: aggregatedNotes,
        noteCount: allChatMessages.length,
        allCalculations: aggregatedCalculations,
        calculationCount: allCalculations.length
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error logging chat messages:', error);
  }
};

  // Function to handle new calculations
  const handleNewCalculation = (calculation) => {
    setAllCalculations(prev => [...prev, calculation]);
  };
  
  // Function to log all chat messages to Google Sheets
  const logAllCalculations = async () => {
  if (allCalculations.length === 0) return;

  const aggregatedNotes = allChatMessages.map(message => 
    `[${message.date} ${message.timestamp}] ${message.text}`
  ).join(' | ');

  const aggregatedCalculations = allCalculations.map(calculation => 
    `[${calculation.date} ${calculation.timestamp}] ${calculation.expression}`
  ).join(' | ');

  try {
    await fetch('https://tetris-proxy.vercel.app/api/submit', {
      method: 'POST',
      body: JSON.stringify({
        timestamp: formatDateToUKTime(new Date().toISOString()),
        browser: getBrowserInfo(),
        device: getDeviceType(),
        type: "calculations",
        id: null,
        anchor: null,
        frameMatrix: formatMatrixForLogging(frameMatrix),
        duration: GAME_DURATION_SECONDS - timeLeft,
        totalValue,
        kpi1,
        kpi2,
        coverage,
        valuePerCell,
        fitness,
        allNotes: aggregatedNotes,
        noteCount: allChatMessages.length,
        allCalculations: aggregatedCalculations,
        calculationCount: allCalculations.length
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error logging calculations:', error);
  }
};

// Timer effect for summary page countdown
useEffect(() => {
  if (showSummary && !showSurvey && summaryTimeLeft > 0) {
    const interval = setInterval(() => setSummaryTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  } else if (showSummary && summaryTimeLeft <= 0 && !showSurvey) {
    setShowSurvey(true);
  }
}, [summaryTimeLeft, showSummary, showSurvey]);

// Timer effect for survey page
useEffect(() => {
  if (showSurvey && surveyTimeLeft > 0) {
    const interval = setInterval(() => setSurveyTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  } else if (showSurvey && surveyTimeLeft <= 0) {
    // Auto-submit survey when time expires
    handleSurveyTimeout();
  }
}, [surveyTimeLeft, showSurvey]);

const handleSurveyTimeout = () => {
  // Log all collected data when survey times out
  const aggregatedNotes = allChatMessages.map(message => 
    `[${message.date} ${message.timestamp}] ${message.text}`
  ).join(' | ');

  const aggregatedCalculations = allCalculations.map(calculation => 
    `[${calculation.date} ${calculation.timestamp}] ${calculation.expression}`
  ).join(' | ');

  fetch('https://tetris-proxy.vercel.app/api/submit', {
  method: 'POST',
  body: JSON.stringify({
    timestamp: formatDateToUKTime(new Date().toISOString()),
    browser: getBrowserInfo(),
    device: getDeviceType(),
    type: "survey_timeout",
    participantId: participantId, // Use actual participant ID instead of empty string
    email: '',
    age: '',
    gender: '',
    education: '',
    workExperience: '',
    managementExperience: '',
    gamingExperience: '',
    tetrisExperience: '',
    mentalCalculations: '',
    mathsLiked: '',
    id: null,
    anchor: null,
    frameMatrix: formatMatrixForLogging(frameMatrix),
    duration: GAME_DURATION_SECONDS - timeLeft,
    totalValue,
    kpi1,
    kpi2,
    coverage,
    valuePerCell,
    fitness,
    allNotes: aggregatedNotes,
    noteCount: allChatMessages.length,
    allCalculations: aggregatedCalculations,
    calculationCount: allCalculations.length,
    satisfaction: '',
    difficulty: '',
    clarity: '',
    timeAdequacy: '',
    strategyUsed: '',
    mostChallenging: '',
    improvements: '',
    overallExperience: '',
    additionalComments: 'Survey timed out - no responses collected'
  }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch(error => {
    console.error('Error logging survey timeout:', error);
  }).finally(() => {
    alert('Survey time has expired. Thank you for participating! You may now close this window.');
  });
};

// Timer effect
useEffect(() => {
  if (!showSummary && timeLeft > 0 && trainingCompleted && registrationCompleted) {
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  } else if (timeLeft <= 0 && !showSummary) {
    setFinalTime(GAME_DURATION_SECONDS);
    
    // Aggregate chat messages and calculations properly for timeout
    const aggregatedNotes = allChatMessages.map(message => 
      `[${message.date} ${message.timestamp}] ${message.text}`
    ).join(' | ');

    const aggregatedCalculations = allCalculations.map(calculation => 
      `[${calculation.date} ${calculation.timestamp}] ${calculation.expression}`
    ).join(' | ');
    
    // Log timeout event with all data in one entry
    fetch('https://tetris-proxy.vercel.app/api/submit', {
  method: 'POST',
  body: JSON.stringify({
    timestamp: formatDateToUKTime(new Date().toISOString()),
    browser: getBrowserInfo(),
    device: getDeviceType(),
    type: "timeout",
    participantId: participantId, // Add participant ID
    id: null,
    anchor: null,
    frameMatrix: formatMatrixForLogging(frameMatrix),
    duration: GAME_DURATION_SECONDS,
    totalValue,
    kpi1,
    kpi2,
    coverage,
    valuePerCell,
    fitness,
    allNotes: aggregatedNotes,
    noteCount: allChatMessages.length,
    allCalculations: aggregatedCalculations,
    calculationCount: allCalculations.length
  }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(error => {
      console.error('Error logging timeout:', error);
    }).finally(() => {
      // Only show summary after logging is complete
      setShowSummary(true);
    });
  }
}, [timeLeft, showSummary, trainingCompleted, registrationCompleted, frameMatrix, totalValue, kpi1, kpi2, coverage, valuePerCell, fitness, allChatMessages, allCalculations]);

// Calculate KPIs when bricks change
useEffect(() => {
  const value = bricks.reduce((sum, brick) => {
    const baseType = brick.id.split('-')[0];
    const brickDef = BRICK_DEFINITIONS.find(b => b.type === baseType);
    return sum + (brickDef ? brickDef.value : 0);
  }, 0);
  setTotalValue(value);

  // Calculate coverage using proper board coordinates
  const filledCells = new Set();
  bricks.forEach(brick => {
    const absoluteCells = getAbsoluteCells(brick, brick.x, brick.y);
    absoluteCells.forEach(([col, row]) => {
      if (col >= 0 && col < GRID_WIDTH && row >= 0 && row < GRID_HEIGHT) {
        filledCells.add(`${col},${row}`);
      }
    });
  });
  
  const usedCells = filledCells.size;
  const totalCells = GRID_WIDTH * GRID_HEIGHT;
  const emptyCells = totalCells - usedCells;

  setCoverage(Math.round((usedCells / totalCells) * 100));
  setKpi1(value - PENALTY_PER_CELL * emptyCells);
  setKpi2(PENALTY_PER_CELL * emptyCells);

  // Calculate new KPIs
  // 1. Value per cell used
  const valuePerCellCalc = usedCells > 0 ? value / usedCells : 0;
  setValuePerCell(valuePerCellCalc);

  // 2. Portfolio fitness calculation
const fitnessCalc = usedCells > 0 ? calculateGapPenaltyFitness(frameMatrix) : null;
setFitness(fitnessCalc);

}, [bricks, frameMatrix]);

// Handle browser zoom/resize by repositioning placed bricks
useEffect(() => {
  const handleResize = () => {
    if (!boardRef.current || !pageRef.current) return;
    
    const boardRect = boardRef.current.getBoundingClientRect();
    const pageRect = pageRef.current.getBoundingClientRect();
    
    setBricks(prev => prev.map(brick => {
      if (!brick.wasPlaced) return brick;
      
      // Get stored grid position for this brick
      const gridPos = brickGridPositions.get(brick.id);
      if (!gridPos) return brick;
      
      // Recalculate pixel position based on current board position
      const newX = boardRect.left - pageRect.left + GAP + gridPos.col * (CELL_SIZE + GAP);
      const newY = boardRect.top - pageRect.top + GAP + gridPos.row * (CELL_SIZE + GAP);
      
      return {
        ...brick,
        x: newX,
        y: newY,
        lastValidX: newX,
        lastValidY: newY
      };
    }));
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [brickGridPositions]);

  const formatTime = (seconds) => {
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

const getAbsoluteCells = (brick, baseX, baseY) => {
  if (!boardRef.current || !pageRef.current) return [];
  
  const boardRect = boardRef.current.getBoundingClientRect();
  const pageRect = pageRef.current.getBoundingClientRect();
  
  // Use CSS pixel values directly
  const offsetX = boardRect.left - pageRect.left + GAP;
  const offsetY = boardRect.top - pageRect.top + GAP;

  return brick.shape.map(([dx, dy]) => {
    const col = Math.floor((baseX - offsetX) / (CELL_SIZE + GAP)) + dx;
    const row = Math.floor((baseY - offsetY) / (CELL_SIZE + GAP)) + dy;
    return [col, row];
  });
};

  const isWithinBounds = (cells) => {
    return cells.every(([col, row]) => {
      const withinBounds = col >= 0 && col < GRID_WIDTH && row >= 0 && row < GRID_HEIGHT;
      return withinBounds;
    });
  };

  const isOverlapping = (cells, excludeId) => {
    const occupied = new Set();
    for (let b of bricks) {
      if (b.id === excludeId) continue;
      const otherCells = getAbsoluteCells(b, b.x, b.y);
      for (let [col, row] of otherCells) {
        occupied.add(`${col},${row}`);
      }
    }
    return cells.some(([col, row]) => occupied.has(`${col},${row}`));
  };

  const isFromPalette = (brick) => {
    return !brick.hasOwnProperty('wasPlaced') || !brick.wasPlaced;
  };

  const handleMouseDown = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (selected && selected !== id) setSelected(null);
    
    const rect = e.target.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragging(id);

    const brick = bricks.find(b => b.id === id);
    if (brick && brick.wasPlaced) {
      setBricks(prev => prev.map(b => 
        b.id === id 
          ? { ...b, originalX: b.x, originalY: b.y, originalShape: [...b.shape] }
          : b
      ));
    }

    if (clickTimers.current[id]) {
      clearTimeout(clickTimers.current[id]);
      delete clickTimers.current[id];
      setSelected(prev => prev === id ? null : id);
    } else {
      clickTimers.current[id] = setTimeout(() => {
        delete clickTimers.current[id];
      }, 300);
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging || !pageRef.current) return;
    
    const pageRect = pageRef.current.getBoundingClientRect();
    const newX = e.clientX - offset.x - pageRect.left;
    const newY = e.clientY - offset.y - pageRect.top;
    
    setBricks(prev => prev.map(b => 
      b.id === dragging ? { ...b, x: newX, y: newY } : b
    ));
  };

  const handleMouseUp = (e) => {
    if (!dragging || !boardRef.current || !pageRef.current) {
      setDragging(null);
      return;
    }

    const boardRect = boardRef.current.getBoundingClientRect();
    const pageRect = pageRef.current.getBoundingClientRect();
    const rawX = e.clientX - boardRect.left;
    const rawY = e.clientY - boardRect.top;

    const brick = bricks.find(b => b.id === dragging);
    if (!brick) {
      setDragging(null);
      return;
    }

    const dragDistance = Math.sqrt(
      Math.pow(e.clientX - dragStart.x, 2) + Math.pow(e.clientY - dragStart.y, 2)
    );

    if (dragDistance < 5) {
      setBricks(prev => prev.map(b => 
        b.id === dragging 
          ? { 
              ...b, 
              x: b.lastValidX || b.x, 
              y: b.lastValidY || b.y,
              shape: b.originalShape || b.shape,
              originalX: undefined,
              originalY: undefined,
              originalShape: undefined,
              preRotationShape: undefined,
              preRotationX: undefined,
              preRotationY: undefined
            } 
          : b
      ));
      setDragging(null);
      return;
    }

    const col = Math.floor((rawX - GAP) / (CELL_SIZE + GAP));
    const row = Math.floor((rawY - GAP) / (CELL_SIZE + GAP));

    const snappedX = boardRect.left - pageRect.left + GAP + col * (CELL_SIZE + GAP);
    const snappedY = boardRect.top - pageRect.top + GAP + row * (CELL_SIZE + GAP);

    const proposedCells = getAbsoluteCells(brick, snappedX, snappedY);
    const droppedOutsideBoard = rawX < 0 || rawY < 0 || rawX > boardRect.width || rawY > boardRect.height;

    const isOutOfBounds = !isWithinBounds(proposedCells);
    const hasOverlap = isOverlapping(proposedCells, dragging);

    const baseCol = Math.floor((snappedX - (boardRect.left - pageRect.left + GAP)) / (CELL_SIZE + GAP));
    const baseRow = Math.floor((snappedY - (boardRect.top - pageRect.top + GAP)) / (CELL_SIZE + GAP));
    
    const allCellsValid = brick.shape.every(([dx, dy]) => {
      const cellCol = baseCol + dx;
      const cellRow = baseRow + dy;
      return cellCol >= 0 && cellCol < GRID_WIDTH && cellRow >= 0 && cellRow < GRID_HEIGHT;
    });

    if (droppedOutsideBoard) {
      if (isFromPalette(brick)) {
        setBricks(prev => prev.filter(b => b.id !== dragging));
      } else {
        setBricks(prev => prev.map(b => 
          b.id === dragging 
            ? { 
                ...b, 
                x: b.lastValidX, 
                y: b.lastValidY,
                shape: b.originalShape || b.shape,
                originalX: undefined,
                originalY: undefined,
                originalShape: undefined,
                preRotationShape: undefined,
                preRotationX: undefined,
                preRotationY: undefined
              } 
            : b
        ));
      }
    } else if (isOutOfBounds || !allCellsValid) {
      if (isFromPalette(brick)) {
        setBricks(prev => prev.filter(b => b.id !== dragging));
      } else {
        const wasRotated = brick.preRotationShape && JSON.stringify(brick.preRotationShape) !== JSON.stringify(brick.shape);
        
        if (wasRotated) {
          setBricks(prev => prev.map(b => 
            b.id === dragging 
              ? { 
                  ...b, 
                  x: b.preRotationX || b.originalX || b.lastValidX, 
                  y: b.preRotationY || b.originalY || b.lastValidY,
                  shape: b.preRotationShape || b.originalShape || b.shape,
                  preRotationShape: undefined,
                  preRotationX: undefined,
                  preRotationY: undefined
                } 
              : b
          ));
        } else {
          setBricks(prev => prev.map(b => 
            b.id === dragging 
              ? { 
                  ...b, 
                  x: b.originalX || b.lastValidX, 
                  y: b.originalY || b.lastValidY,
                  shape: b.originalShape || b.shape
                } 
              : b
          ));
        }
      }
    } else if (hasOverlap) {
      if (isFromPalette(brick)) {
        setBricks(prev => prev.filter(b => b.id !== dragging));
      } else {
        const wasRotated = brick.preRotationShape && JSON.stringify(brick.preRotationShape) !== JSON.stringify(brick.shape);
        
        if (wasRotated) {
          setBricks(prev => prev.map(b => 
            b.id === dragging 
              ? { 
                  ...b, 
                  x: b.preRotationX || b.originalX || b.lastValidX, 
                  y: b.preRotationY || b.originalY || b.lastValidY,
                  shape: b.preRotationShape || b.originalShape || b.shape,
                  preRotationShape: undefined,
                  preRotationX: undefined,
                  preRotationY: undefined
                } 
              : b
          ));
        } else {
          setBricks(prev => prev.map(b => 
            b.id === dragging 
              ? { 
                  ...b, 
                  x: b.originalX || b.lastValidX, 
                  y: b.originalY || b.lastValidY,
                  shape: b.originalShape || b.shape
                } 
              : b
          ));
        }
      }
    } else {
  // Valid placement
  
  // Step 1: Create updated matrix with proper clearing and adding
  const updatedMatrix = frameMatrix.map(row => [...row]); // deep copy
  
  // Step 2: If brick was already placed, clear its previous position using current coordinates
  if (brick.wasPlaced && brick.lastValidX !== undefined && brick.lastValidY !== undefined) {
  // Use the brick's CURRENT stored position (lastValidX/Y) to clear from matrix
  const currentBrick = { ...brick, x: brick.lastValidX, y: brick.lastValidY };
  clearBrickFromMatrix(updatedMatrix, currentBrick, boardRef, pageRef);
}
  
  // Step 3: Add brick to new position
  const baseType = brick.id.split('-')[0];
  const { baseCol: finalCol, baseRow: finalRow } = addBrickToMatrix(
    updatedMatrix, 
    brick, 
    snappedX, 
    snappedY, 
    boardRef, 
    pageRef
  );
  
  // Step 4: Update bricks state and store grid position
const updatedBricks = bricks.map(b => 
  b.id === dragging 
    ? { 
        ...b, 
        x: snappedX, 
        y: snappedY, 
        lastValidX: snappedX, 
        lastValidY: snappedY, 
        wasPlaced: true,
        originalX: undefined,
        originalY: undefined,
        originalShape: undefined,
        preRotationShape: undefined,
        preRotationX: undefined,
        preRotationY: undefined
      }
    : b
);

// Store grid position for zoom handling
setBrickGridPositions(prev => new Map(prev).set(dragging, { col: finalCol, row: finalRow }));
  
  // Step 5: Update state with the SAME matrix
  setBricks(updatedBricks);
  setFrameMatrix(updatedMatrix);

// Step 6: Calculate metrics using the updated matrix
const filledCells = updatedMatrix.flat().filter(cell => cell !== 0).length;
const emptyCells = GRID_WIDTH * GRID_HEIGHT - filledCells;

// Calculate new total value - this should remain the SAME when moving a brick
const newTotalValue = updatedBricks.reduce((sum, b) => {
  const bType = b.id.split('-')[0];
  const bDef = BRICK_DEFINITIONS.find(bd => bd.type === bType);
  return sum + (bDef ? bDef.value : 0);
}, 0);

// Ensure KPIs are calculated consistently
const newKpi1 = newTotalValue - PENALTY_PER_CELL * emptyCells;
const newKpi2 = PENALTY_PER_CELL * emptyCells;

  // Step 7: Log with consistent data
  const snapEvent = {
    type: "snap",
    id: baseType,
    anchor: [finalRow, finalCol],
    timestamp: formatDateToUKTime(new Date().toISOString()),
    frameMatrix: formatMatrixForLogging(updatedMatrix),
    duration: GAME_DURATION_SECONDS - timeLeft,
    totalValue: newTotalValue,
    kpi1: newKpi1,
    kpi2: newKpi2,
    coverage: Math.round((filledCells / (GRID_WIDTH * GRID_HEIGHT)) * 100),
    valuePerCell: filledCells > 0 ? newTotalValue / filledCells : 0,
    fitness: filledCells > 0 ? calculateGapPenaltyFitness(updatedMatrix) : null
  };
  
  setEventLog(prev => [...prev, snapEvent]);

  // Step 8: Send data immediately with consistent values
  fetch('https://tetris-proxy.vercel.app/api/submit', {
  method: 'POST',
  body: JSON.stringify({
    timestamp: snapEvent.timestamp,
    browser: getBrowserInfo(),
    device: getDeviceType(),
    type: "snap",
    participantId: participantId, // Add participant ID
    id: baseType,
    anchor: [finalRow, finalCol],
    frameMatrix: snapEvent.frameMatrix,
    duration: snapEvent.duration,
    totalValue: snapEvent.totalValue,
    kpi1: snapEvent.kpi1,
    kpi2: snapEvent.kpi2,
    coverage: snapEvent.coverage,
    valuePerCell: snapEvent.valuePerCell,
    fitness: snapEvent.fitness,
    allNotes: '',
    noteCount: 0,
    allCalculations: '',
    calculationCount: 0
  }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch(error => {
    console.error('Error logging snap:', error);
  });

  // Step 9: Only decrement count for NEW placements from palette
  if (isFromPalette(brick)) {
    setBrickCounts(prev => ({
      ...prev,
      [baseType]: prev[baseType] - 1
    }));
  }
}
    setDragging(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
  if (selected) {
    const selectedBrick = bricks.find(b => b.id === selected);
    if (selectedBrick && selectedBrick.wasPlaced) {
      // Create updated matrix
      const updatedMatrix = frameMatrix.map(row => [...row]);
      
      // Clear brick from matrix using consistent coordinate calculation
      clearBrickFromMatrix(updatedMatrix, selectedBrick, boardRef, pageRef);
      
      // Update state
      setFrameMatrix(updatedMatrix);

      // Calculate metrics with updated matrix
      const baseType = selectedBrick.id.split('-')[0];
      const removedBrickValue = BRICK_DEFINITIONS.find(b => b.type === baseType)?.value || 0;
      const filledCells = updatedMatrix.flat().filter(cell => cell !== 0).length;
      const emptyCells = GRID_WIDTH * GRID_HEIGHT - filledCells;
      
      // Calculate new total value after removal
      const newTotalValue = totalValue - removedBrickValue;
      const { col: anchorCol, row: anchorRow } = getBoardCoordinates(
        selectedBrick.x, 
        selectedBrick.y, 
        boardRef, 
        pageRef
      );

      // Log remove event with consistent data
      fetch('https://tetris-proxy.vercel.app/api/submit', {
  method: 'POST',
  body: JSON.stringify({
    timestamp: formatDateToUKTime(new Date().toISOString()),
    browser: getBrowserInfo(),
    device: getDeviceType(),
    type: "remove",
    participantId: participantId, // Add participant ID
    id: baseType,
    anchor: [anchorRow, anchorCol],
    frameMatrix: formatMatrixForLogging(updatedMatrix),
    duration: GAME_DURATION_SECONDS - timeLeft,
    totalValue: newTotalValue,
    kpi1: newTotalValue - PENALTY_PER_CELL * emptyCells,
    kpi2: PENALTY_PER_CELL * emptyCells,
    coverage: Math.round((filledCells / (GRID_WIDTH * GRID_HEIGHT)) * 100),
    valuePerCell: filledCells > 0 ? newTotalValue / filledCells : 0,
    fitness: filledCells > 0 ? calculateGapPenaltyFitness(updatedMatrix) : null,
    allNotes: '',
    noteCount: 0,
    allCalculations: '',
    calculationCount: 0
  }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch(error => {
        console.error('Error logging remove:', error);
      });

      // Remove brick and update count
      setBricks(prev => prev.filter(b => b.id !== selected));
      setBrickCounts(prev => ({
        ...prev,
        [baseType]: prev[baseType] + 1
      }));
      setSelected(null);
    }
  }
  return;
}
    
    if (!selected || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    
    if (selected.startsWith('palette-')) {
      const brickType = selected.replace('palette-', '');
      setPaletteRotations(prev => ({
        ...prev,
        [brickType]: e.key === 'ArrowLeft'
          ? (prev[brickType] + 1) % 4
          : (prev[brickType] + 3) % 4
      }));
      return;
    }
    
  setBricks(prev => {
  const updatedBricks = prev.map(b => {
    if (b.id !== selected) return b;
    
    const rotatedShape = e.key === 'ArrowLeft'
      ? rotateClockwise(b.shape)
      : rotateCounterClockwise(b.shape);

    const proposedCells = getAbsoluteCells({ ...b, shape: rotatedShape }, b.x, b.y);

    if (!isWithinBounds(proposedCells) || isOverlapping(proposedCells, selected)) {
      return b;
    }

    return { 
      ...b, 
      shape: rotatedShape,
      preRotationShape: b.shape,
      preRotationX: b.x,
      preRotationY: b.y
    };
  });

  // Check if any brick was actually rotated
  const rotatedBrick = updatedBricks.find(b => b.id === selected && 
    JSON.stringify(b.shape) !== JSON.stringify(prev.find(p => p.id === selected)?.shape));

  if (rotatedBrick && rotatedBrick.wasPlaced) {
    // Update frameMatrix for rotation
    const updatedMatrix = frameMatrix.map(row => [...row]);
    
    // Clear old position using pre-rotation shape
    const oldBrick = { ...rotatedBrick, shape: rotatedBrick.preRotationShape };
    clearBrickFromMatrix(updatedMatrix, oldBrick, boardRef, pageRef);
    
    // Add new position with rotated shape
    const { baseCol: finalCol, baseRow: finalRow } = addBrickToMatrix(
      updatedMatrix, 
      rotatedBrick, 
      rotatedBrick.x, 
      rotatedBrick.y, 
      boardRef, 
      pageRef
    );
    
    // Update frameMatrix state FIRST
    setFrameMatrix(updatedMatrix);
    
    // Calculate metrics using the updated matrix
    const filledCells = updatedMatrix.flat().filter(cell => cell !== 0).length;
    const emptyCells = GRID_WIDTH * GRID_HEIGHT - filledCells;
    const newTotalValue = updatedBricks.reduce((sum, brick) => {
      const bType = brick.id.split('-')[0];
      const bDef = BRICK_DEFINITIONS.find(bd => bd.type === bType);
      return sum + (bDef ? bDef.value : 0);
    }, 0);
    
    const baseType = rotatedBrick.id.split('-')[0];
    
    // Use setTimeout to ensure state updates are processed before logging
    setTimeout(() => {
      fetch('https://tetris-proxy.vercel.app/api/submit', {
  method: 'POST',
  body: JSON.stringify({
    timestamp: formatDateToUKTime(new Date().toISOString()),
    browser: getBrowserInfo(),
    device: getDeviceType(),
    type: "rotated",
    participantId: participantId, // Add participant ID
    id: baseType,
    anchor: [finalRow, finalCol],
    frameMatrix: formatMatrixForLogging(updatedMatrix),
    duration: GAME_DURATION_SECONDS - timeLeft,
    totalValue: newTotalValue,
    kpi1: newTotalValue - PENALTY_PER_CELL * emptyCells,
    kpi2: PENALTY_PER_CELL * emptyCells,
    coverage: Math.round((filledCells / (GRID_WIDTH * GRID_HEIGHT)) * 100),
    valuePerCell: filledCells > 0 ? newTotalValue / filledCells : 0,
    fitness: filledCells > 0 ? calculateGapPenaltyFitness(updatedMatrix) : null,
    allNotes: '',
    noteCount: 0,
    allCalculations: '',
    calculationCount: 0
  }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch(error => {
        console.error('Error logging rotation:', error);
      });
    }, 0);
  }

  return updatedBricks;
});
  };

  const handleGlobalClick = (e) => {
    if (selected && !e.target.closest('[data-brick]') && !e.target.closest('[data-palette]')) {
      setSelected(null);
    }
  };

  const handlePaletteClick = (brickType, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (clickTimers.current[`palette-${brickType}`]) {
      clearTimeout(clickTimers.current[`palette-${brickType}`]);
      delete clickTimers.current[`palette-${brickType}`];
      
      setSelected(prev => prev === `palette-${brickType}` ? null : `palette-${brickType}`);
      return;
    } else {
      clickTimers.current[`palette-${brickType}`] = setTimeout(() => {
        delete clickTimers.current[`palette-${brickType}`];
        createBrickFromPalette(brickType, e);
      }, 300);
    }
  };

  const createBrickFromPalette = (brickType, e) => {
    const rect = e.target.getBoundingClientRect();
    const pageRect = pageRef.current.getBoundingClientRect();
    const x = e.clientX - pageRect.left - rect.width / 2;
    const y = e.clientY - pageRect.top - rect.height / 2;

    const brickDef = BRICK_DEFINITIONS.find(b => b.type === brickType);
    const rotatedShape = getRotatedShape(brickDef.shape, paletteRotations[brickType]);
    
    const newId = `${brickType}-${Date.now()}`;
    const newBrick = {
      id: newId,
      color: brickDef.color,
      shape: rotatedShape,
      x,
      y,
      wasPlaced: false
    };

    setBricks(prev => prev.filter(b => 
      !(b.id.startsWith(`${brickType}-`) && !b.wasPlaced)
    ).concat(newBrick));

    setDragging(newId);
    setSelected(newId);
    setOffset({ x: rect.width / 2, y: rect.height / 2 });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleGlobalClick);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleGlobalClick);
    };
  });
  
// Show welcome page first
if (showWelcome) {
  return <WelcomePage onStart={() => {
    setShowWelcome(false);
    setShowTraining(true);
  }} />;
}

// Show training page second
if (showTraining) {
  return <TrainingPage onComplete={() => {
    setShowTraining(false);
    setShowRegistration(true);
    setTrainingCompleted(true);
  }} />;
}

// Show registration page third
if (showRegistration) {
  return <RegistrationPage onComplete={(id) => {
    setParticipantId(id);
	setShowRegistration(false);
    setRegistrationCompleted(true);
  }} />;
}

// Show survey page after summary
if (showSurvey) {
  return <SurveyPage 
    surveyTimeLeft={surveyTimeLeft}
    allChatMessages={allChatMessages}
    allCalculations={allCalculations}
    formatDateToUKTime={formatDateToUKTime}
    getBrowserInfo={getBrowserInfo}
    getDeviceType={getDeviceType}
    formatMatrixForLogging={formatMatrixForLogging}
    frameMatrix={frameMatrix}
    GAME_DURATION_SECONDS={GAME_DURATION_SECONDS}
    timeLeft={timeLeft}
    totalValue={totalValue}
    kpi1={kpi1}
    kpi2={kpi2}
    coverage={coverage}
    valuePerCell={valuePerCell}
    fitness={fitness}
    participantId={participantId} // Add participant ID prop
  />;
}

// Show summary page after game completion
if (showSummary) {
  return (
    <div style={{ 
      backgroundColor: '#fdf6e3',
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: '40px',
      textAlign: 'center',
      color: '#000'
    }}>
      <h1 style={{ color: '#000', marginBottom: '30px' }}>🎉 Thank you for playing!</h1>
      <p style={{ color: '#000', fontSize: '18px', marginBottom: '10px' }}><strong>Total Value:</strong> ${totalValue}</p>
      <p style={{ color: '#000', fontSize: '18px', marginBottom: '10px' }}><strong>Resource Cost:</strong> ${formatKPI(kpi2)}</p>
      <p style={{ color: '#000', fontSize: '18px', marginBottom: '10px' }}><strong>Net Value:</strong> ${formatKPI(kpi1)}</p>
      <p style={{ color: '#000', fontSize: '18px', marginBottom: '10px' }}><strong>Bricks Placed:</strong> {bricks.length}</p> 
      <p style={{ color: '#000', fontSize: '18px', marginBottom: '10px' }}><strong>Coverage:</strong> {coverage}%</p> 
      <p style={{ color: '#000', fontSize: '18px', marginBottom: '10px' }}><strong>Value/Resource:</strong> ${formatKPI(valuePerCell)}</p>
      <p style={{ color: '#000', fontSize: '18px', marginBottom: '10px' }}><strong>Portfolio Fitness:</strong> {fitness !== null ? `${fitness}%` : 'N/A'}</p>
      <p style={{ color: '#000', fontSize: '18px', marginBottom: '30px' }}><strong>Total Time:</strong> {formatTime(finalTime)}</p>
      
      <div style={{ 
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#e8f5e8',
        borderRadius: '12px',
        borderLeft: '4px solid #28a745'
      }}>
        <p style={{ 
          color: '#000', 
          fontSize: '16px', 
          margin: 0,
          fontWeight: '500'
        }}>
          📋 Please complete a short survey about your experience
        </p>
      </div>
      
      <button
        onClick={() => setShowSurvey(true)}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '16px 32px',
          borderRadius: '12px',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
          fontSize: '18px',
          transition: 'all 0.2s ease',
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#0056b3';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 16px rgba(0,123,255,0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#007bff';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(0,123,255,0.3)';
        }}
      >
        Continue to Survey
      </button>
    </div>
  );
}

// Only show game phase if both training and registration are completed
if (!trainingCompleted || !registrationCompleted) {
  return <div>Loading...</div>; // This should never show if the flow is correct
}

  return (
    <div ref={pageRef} style={styles.page}>
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '10px', color: '#000' }}>
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
			<div style={{ width: '100px' }}></div> {/* Spacer for centering */}
			<div>
				<h2 style={{ fontWeight: 'bold', color: '#000', fontSize: '36px', margin: 0 }}>
					<span role="img" aria-label="tetris">🧱</span> Tetris for Managers
				</h2>
			</div>
			<div style={{ 
				fontSize: '14px', 
				color: '#666', 
				fontWeight: 'normal',
				textAlign: 'right',
				width: '100px'
			}}>
              ⏱️ {formatTime(timeLeft)}
			</div>
		</div>
		<p style={{ color: '#000' }}>Drag and drop the bricks into the frame to maximize <strong>net value</strong>, i.e. the total value of placed bricks <i>minus</i> the penalty from unused space.</p>
		<p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
			💡 Double-click a brick (palette or placed) and use keyboard arrow keys to rotate it<br />
			Press ESC to return a snapped brick back to the palette
		</p>
	</div>

      <div style={styles.bucketArea} data-testid="brick-palette">
        {BRICK_DEFINITIONS.filter(brick => brickCounts[brick.type] > 0).map(brick => {
          const rotatedShape = getRotatedShape(brick.shape, paletteRotations[brick.type]);
          const { offsetX, offsetY } = getCenteredShapeOffset(rotatedShape, CELL_SIZE * 3.5);
          
          return (
            <div key={brick.type} style={styles.bucket}>
              <div style={styles.paletteContainer}>
                <div style={{
                  position: 'absolute',
                  left: `${offsetX}px`,
                  top: `${offsetY - 18}px`,
                  fontWeight: 'bold',
                  fontSize: '12px',
                  color: '#000',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  zIndex: 9999,
                  pointerEvents: 'none'
                }}>
                  ${brick.value}
                </div>

                {rotatedShape.map(([dx, dy], i) => (
                  <div
                    key={i}
                    data-palette="true"
                    onMouseDown={(e) => handlePaletteClick(brick.type, e)}
                    style={{
                      ...styles.brickCell,
                      backgroundColor: brick.color,
                      position: 'absolute',
                      left: `${offsetX + dx * (CELL_SIZE + GAP)}px`,
                      top: `${offsetY + dy * (CELL_SIZE + GAP)}px`,
                      cursor: 'pointer',
                      ...(selected === `palette-${brick.type}` ? styles.selected : {})
                    }}
                  />
                ))}
              </div>
              <div style={styles.countText}>{brickCounts[brick.type]} left</div>
            </div>
          );
        })}
      </div>

      <div style={styles.boardRow}>
  <div ref={boardRef} data-testid="game-board" style={styles.boardArea}>
    <div style={styles.grid}>
      {[...Array(GRID_WIDTH * GRID_HEIGHT)].map((_, idx) => (
        <div key={idx} style={styles.cell} />
      ))}
    </div>
  </div>

{/* Right side container for panels and button */}
<div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}}>

{/* Net Value Panel - Color Coded */}
<div style={{
  background: 'white',
  padding: '20px',
  borderRadius: '12px',
  textAlign: 'center',
  borderLeft: '5px solid #007bff',
  minWidth: '200px',
  boxShadow: '0 0 6px rgba(0,0,0,0.2)'
}}>
  <div style={{
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#007bff',
    marginBottom: '8px',
    fontWeight: '600'
  }}>
    Net Value
  </div>
  <div style={{
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0',
    color: kpi1 > 0 ? '#28a745' : kpi1 < 0 ? '#dc3545' : '#2c3e50'
  }}>
    {kpi1 < 0 ? `-$${formatKPI(Math.abs(kpi1))}` : `$${formatKPI(kpi1)}`}
  </div>
</div>

{/* KPIs Panel */}
<div style={styles.kpiPanel}>
  <h3 style={{ marginTop: 0 }}>📈 KPIs</h3>
  <p><strong>Total Value:</strong> ${totalValue}</p>
  <p><strong>Resource Cost:</strong> ${formatKPI(kpi2)}</p>
  <p><strong>Coverage:</strong> {coverage}%</p>
  <p><strong>Value/Resource:</strong> ${formatKPI(valuePerCell)}</p>
  <p><strong>Portfolio Fitness:</strong> {fitness !== null ? `${fitness}%` : 'N/A'}</p>
</div>

  {/* Standalone Finish Button */}
  <button
    onClick={() => {
      setFinalTime(GAME_DURATION_SECONDS - timeLeft);
      
      const anchorEvents = eventLog.filter(e => e.type === "snap");
      const lastAnchor = anchorEvents.length > 0 ? anchorEvents[anchorEvents.length - 1].anchor : null;

      // Aggregate chat messages and calculations properly
      const aggregatedNotes = allChatMessages.map(message => 
        `[${message.date} ${message.timestamp}] ${message.text}`
      ).join(' | ');

      const aggregatedCalculations = allCalculations.map(calculation => 
        `[${calculation.date} ${calculation.timestamp}] ${calculation.expression}`
      ).join(' | ');

      // Send data immediately when finish button is clicked
fetch('https://tetris-proxy.vercel.app/api/submit', {
  method: 'POST',
  body: JSON.stringify({
    timestamp: formatDateToUKTime(new Date().toISOString()),
    browser: getBrowserInfo(),
    device: getDeviceType(),
    type: "finish",
    participantId: participantId, // Add participant ID
    id: selected ? selected.split('-')[0] : null,
    anchor: lastAnchor,
    frameMatrix: formatMatrixForLogging(frameMatrix),
    duration: GAME_DURATION_SECONDS - timeLeft,
    totalValue,
    kpi1,
    kpi2,
    coverage,
    valuePerCell,
    fitness,
    allNotes: aggregatedNotes,
    noteCount: allChatMessages.length,
    allCalculations: aggregatedCalculations,
    calculationCount: allCalculations.length
  }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(() => {
  setShowSummary(true);
}).catch(error => {
  console.error('Error logging finish data:', error);
  setShowSummary(true);
});
    }}
    style={{
      backgroundColor: '#28a745',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '6px',
      fontWeight: 'bold',
      border: '1px solid #1c7c31',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      fontSize: '16px',
      minWidth: '200px'
    }}
  >
    Finish
  </button>
</div>
</div>

      {/* Notes and Calculator below the frame */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        marginTop: '30px',
        marginBottom: '30px',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: '1000px'
      }}>
        <NoteTracker 
  onMessageAdd={handleNewChatMessage} 
  gameState={{
    formatDateToUKTime,
    getBrowserInfo,
    getDeviceType,
    frameMatrix,
    GAME_DURATION_SECONDS,
    timeLeft,
    totalValue,
    kpi1,
    kpi2,
    coverage,
    valuePerCell,
    fitness,
    participantId, 
    isTraining: false
  }}
/>
        <Calculator 
  onCalculationAdd={handleNewCalculation} 
  gameState={{
    formatDateToUKTime,
    getBrowserInfo,
    getDeviceType,
    frameMatrix,
    GAME_DURATION_SECONDS,
    timeLeft,
    totalValue,
    kpi1,
    kpi2,
    coverage,
    valuePerCell,
    fitness,
    participantId, // Add participant ID
    isTraining: false
  }}
/>
      </div>

      {bricks.map(brick => {
        const baseType = brick.id.split('-')[0];
        const brickDef = BRICK_DEFINITIONS.find(b => b.type === baseType);
        return (
          <React.Fragment key={brick.id}>
            <div style={{
              position: 'absolute',
              left: `${Math.round(brick.x)}px`,
              top: `${Math.round(brick.y) - 18}px`,
              zIndex: 9999,
              fontWeight: 'bold',
              fontSize: '12px',
              color: '#000',
              backgroundColor: 'rgba(255,255,255,0.9)',
              padding: '1px 6px',
              borderRadius: '4px',
              pointerEvents: 'none'
            }}>
              ${brickDef?.value ?? ''}
            </div>

            {brick.shape.map(([dx, dy], i) => (
              <div
                key={`${brick.id}-${i}`}
                data-brick="true"
                onMouseDown={(e) => handleMouseDown(e, brick.id)}
                style={{
                  ...styles.brickCell,
                  ...(brick.id === selected ? styles.selected : {}),
                  backgroundColor: brick.color,
                  left: `${Math.round(brick.x + dx * (CELL_SIZE + GAP))}px`,
                  top: `${Math.round(brick.y + dy * (CELL_SIZE + GAP))}px`
                }}
              />
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default App;