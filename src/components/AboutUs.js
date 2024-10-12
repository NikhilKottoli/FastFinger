import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Benefit = ({ icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg bg-gray-500"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {icon}
    <h3 className="text-3xl font-bold mt-4 mb-2 text-[#FFAA00]">{title}</h3>
    <p className="text-xl font-bold">{description}</p>
  </motion.div>
);

const AboutUsPage = () => {
  const [animatedText, setAnimatedText] = useState('');
  const fullText = "Empowering fast and accurate typing";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-[#FFAA00] mb-4">About FastType</h1>
          <p className="text-xl text-gray-600">{animatedText}</p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-center mb-8">Our Mission</h2>
          <p className="text-xl text-white text-center max-w-2xl mx-auto">
            At FastType, we're passionate about helping people improve their typing skills. 
            Our mission is to provide an engaging, effective platform for users to enhance 
            their speed and accuracy, empowering them in their personal and professional lives.
          </p>
        </motion.section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Benefit 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              title="Boost Your Speed"
              description="Our adaptive lessons help you type faster with targeted exercises."
            />
            <Benefit 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Improve Accuracy"
              description="Reduce errors and build muscle memory with our precision-focused challenges."
            />
            <Benefit 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Track Progress"
              description="Monitor your improvement with detailed statistics and performance insights."
            />
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold mb-4">Ready to improve your typing skills?</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsPage;