
import React from 'react';
import { Page } from '../App';

interface NavbarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavButton: React.FC<{
  page: Page;
  activePage: Page;
  onClick: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, activePage, onClick, children }) => {
  const isActive = activePage === page;
  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75";
  const activeClasses = "bg-cyan-500 text-white";
  const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <button
      onClick={() => onClick(page)}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};


const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  return (
    <nav className="flex flex-wrap gap-2 justify-center">
      <NavButton page="lessons" activePage={activePage} onClick={setActivePage}>บทเรียน</NavButton>
      <NavButton page="converter" activePage={activePage} onClick={setActivePage}>เครื่องมือแปลงค่า</NavButton>
      <NavButton page="exercises" activePage={activePage} onClick={setActivePage}>แบบฝึกหัด</NavButton>
      <NavButton page="chatbot" activePage={activePage} onClick={setActivePage}>AI Chatbot</NavButton>
    </nav>
  );
};

export default Navbar;
