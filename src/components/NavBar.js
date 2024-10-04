import { useNavigate } from 'react-router-dom';
import React from 'react';

const NavBar = () => {
  const navigate = useNavigate();

  const gotoProjects = () => {
    navigate('/Type');
  }
  const gotoAbout = () => {
    navigate('/');
  }
  const gotoContact = () => {
    navigate('/Leaderboard');
  }

  const gotoStats = () => {
    navigate('/Stats');
  }

  const buttonClass = `
  relative
  overflow-hidden
  rounded-full
  bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-700
  text-white
  font-semibold
  py-2 px-6
  md:px-12
  transition-all duration-300
  transform hover:scale-105
  hover:shadow-lg hover:shadow-blue-500/50
  before:absolute before:inset-0
  before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
  before:translate-x-[-200%]
  hover:before:animate-[shine_1s_ease-in-out]
  after:absolute after:inset-0
  after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent
  after:translate-x-[-200%]
  after:blur-[5px]
  hover:after:animate-[shine_1s_ease-in-out_0.1s]
`;


  return (
    <nav className="sticky top-0 z-50 w-full py-6 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex justify-center space-x-6 sm:space-x-10">
          <li>
            <button className={buttonClass} onClick={gotoAbout}>
              Home
            </button>
          </li>
          <li>
            <button className={buttonClass} onClick={gotoProjects}>
              Type
            </button>
          </li>
          <li>
            <button className={buttonClass} onClick={gotoContact}>
              Leader Board
            </button>
          </li>
          <li>
            <button className={buttonClass} onClick={gotoStats}>
              Stats
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;