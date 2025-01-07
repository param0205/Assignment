import React from 'react';
import { useNavigate} from 'react-router-dom';
import { useState, useRef } from 'react';
import NavHeader from './NavHeader'
import UploadDetails from './UploadDetails';

const InvoiceDetail = () => {
  const navigate = useNavigate();
  const [selectedPage, setselectedPage] = useState("Vendor");
  const [TopOfPage, setTopOfPage] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Logout handler
  const logout = () => {
    localStorage.removeItem('userSession');
    navigate('/login'); // Redirect to login page
  };
  const containerRef = useRef(null);

  // Create references for each section inside the container
  const sectionRefs = {
    section1: useRef(null),
    section2: useRef(null),
    section3: useRef(null),
  };

  // Function to handle scrolling to a specific section
  const scrollToSection = (sectionRef) => {
    const container = containerRef.current;
    const target = sectionRef.current;

    if (container && target) {
      container.scrollTo({
        top: target.offsetTop - container.offsetTop, // Calculate the position within the container
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  return (
    <div>
      <NavHeader
              TopOfPage={TopOfPage}
              selectedPage={selectedPage}
              setselectedPage={setselectedPage}
              containerRef={containerRef} sectionRefs={sectionRefs}
              setIsContentVisible={setIsContentVisible}
              />
      <UploadDetails containerRef={containerRef} sectionRefs={sectionRefs} setIsContentVisible={setIsContentVisible} isContentVisible={isContentVisible}/>
    </div>
  );
};

export default InvoiceDetail;
