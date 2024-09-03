import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import resume from '../assets/homepage/resume.png'
import "../styles/homepage.css"

function HomePage() {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className='d-block mx-auto text-center image-container'>
          <img 
            src={resume} 
            alt="Alan Wood Resume"
            className={`full-height-image ${isVisible ? 'fade-in' : ''}`}
          />
          <div className='highlight highlight-profile'></div>
          <div className='highlight highlight-work'></div>
          <div className='highlight highlight-certifications'></div>
          <div className='highlight highlight-contact'></div>
          <div className='highlight highlight-skills'></div>
          <div className='highlight highlight-education'></div>
          <div className='highlight highlight-languages'></div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
