import React, { useState, useEffect } from 'react';

// Custom Button component
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-2 rounded-full flex items-center justify-center transition-colors duration-300";
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "bg-white hover:bg-gray-100 text-blue-600 border border-blue-600",
  };

  return (
    <button 
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Keyboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
    <line x1="6" y1="8" x2="6" y2="8"></line>
    <line x1="10" y1="8" x2="10" y2="8"></line>
    <line x1="14" y1="8" x2="14" y2="8"></line>
    <line x1="18" y1="8" x2="18" y2="8"></line>
    <line x1="6" y1="12" x2="6" y2="12"></line>
    <line x1="10" y1="12" x2="10" y2="12"></line>
    <line x1="14" y1="12" x2="14" y2="12"></line>
    <line x1="18" y1="12" x2="18" y2="12"></line>
    <line x1="6" y1="16" x2="18" y2="16"></line>
  </svg>
);

const FastTypeLogo = () => (
  <div className="text-4xl font-bold text-blue-600 animate-scale-in">
    Fast<span className="text-green-500">Type</span>
  </div>
);

const TypingAnimation = () => {
  const [text, setText] = useState('');
  const fullText = 'Welcome to FastType!';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-3xl font-semibold mb-4 animate-fade-in">
      {text}
    </h1>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
      <FastTypeLogo />
      <TypingAnimation />
      <p className="text-xl text-gray-600 mb-8 text-center animate-fade-in-up">
        Improve your typing speed and accuracy with our interactive lessons and challenges.
      </p>
      <div className="flex space-x-4 animate-fade-in-up">
        <Button>
          <a href="/Type">
            Get Started
          </a>
          
        </Button>
        <Button variant="outline">
          <a href="/About">
            Learn More <Keyboard />
          </a>
          
        </Button>
      </div>
    </div>
  );
};

export default HomePage;