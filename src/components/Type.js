import React, { useState, useEffect, useRef } from 'react';
import { Timer } from 'lucide-react';

const words = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", 
  "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", 
  "into", "your", "good", "some", "could", "them", "see", "other", "than", 
  "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", 
  "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", 
  "new", "want", "because", "any", "these", "give", "day", "most", "us",

  "information", "understand", "development", "community", "technology", 
  "organization", "government", "international", "environment", "experience",
  "university", "opportunity", "relationship", "communication", "education",
  "responsibility", "profession", "individual", "application", "operation",
  "generation", "knowledge", "strategy", "performance", "presentation",

  "Alexander", "Elizabeth", "Christopher", "Charlotte", "Benjamin", "Isabella",
  "Jonathan", "Victoria", "Abraham", "Theodore", "Catherine", "William",
  "Nicholas", "Penelope", "Nathaniel", "Eleanor", "Samantha", "Gregory",
  "Stephanie", "Michael", "Jessica", "Robert", "Olivia", "Matthew", "Sophia"
];


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function TypingTest() {
  const [testWords, setTestWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [errors, setErrors] = useState(0);
  const [incorrectIndices, setIncorrectIndices] = useState([]); // Track incorrect words
  const inputRef = useRef(null);

  useEffect(() => {
    resetTest();
  }, []);

  const resetTest = () => {
    setTestWords(shuffleArray([...words]).slice(0, 50));
    setCurrentIndex(0);
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setErrors(0);
    setIncorrectIndices([]);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value.endsWith(' ')) {
      const trimmedValue = value.trim();
      if (trimmedValue !== testWords[currentIndex]) {
        setErrors(errors + 1);
        setIncorrectIndices([...incorrectIndices, currentIndex]); // Mark incorrect word
      }
      setCurrentIndex(currentIndex + 1);
      setInput('');

      if (currentIndex === testWords.length - 1) {
        setEndTime(Date.now());
      }
    }
  };

  const calculateWPM = () => {
    const timeInMinutes = (endTime - startTime) / 60000;
    return Math.round((testWords.length / timeInMinutes) * (1 - errors / testWords.length));
  };

  return (
    <div className="bg-black min-h-screen text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Typing Speed Test</h1>
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        {!endTime ? (
          <>
            <div className="mb-4 text-lg flex flex-wrap">
              {testWords.map((word, index) => (
                <span
                  key={index}
                  className={`mr-2 mb-2 ${
                    index < currentIndex
                      ? incorrectIndices.includes(index) 
                        ? 'text-red-500'  // Incorrect words in red
                        : 'text-green-400' // Correct words in green
                      : index === currentIndex
                      ? 'bg-blue-500'
                      : ''
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Start typing here..."
              autoFocus
            />
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Test Complete!</h2>
            <p className="text-xl mb-2">
              WPM: {calculateWPM()}
            </p>
            <p className="text-xl mb-4">
              Errors: {errors}
            </p>
            <p className="text-xl mb-4">
              Accuracy: {(50-errors)*2}%
            </p>
            <button
              onClick={resetTest}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Retry
            </button>
          </div>
        )}
      </div>
      {startTime && !endTime && (
        <div className="mt-4 flex items-center">
          <Timer className="mr-2" />
          <span>
            Time: {((Date.now() - startTime) / 1000).toFixed(1)} seconds
          </span>
        </div>
      )}
    </div>
  );
}
