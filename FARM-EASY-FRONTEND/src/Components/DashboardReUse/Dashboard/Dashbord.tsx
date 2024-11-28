// Dashboard.tsx
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Sidebar from './Sidebar';
import MainContentTab from './Main';

const DashboardDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
 

  // Function to toggle the sidebar open/closed
  const toggleSidebar = (): void => {
    setIsOpen(!isOpen);
  };


  return (
    <div className={`flex-1 bg-slate-200 ${isOpen ? "md:ml-44" : "ml-16"} transition-all duration-300`}>
       <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <MainContentTab isOpen={isOpen} />

      
    </div>
  );
};

export default DashboardDemo;
