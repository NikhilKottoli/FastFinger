import React, { useEffect, useState } from 'react';

const LeaderBoard = () => {
    const [leaders, setLeaders] = useState([]); // State to store leaderboard data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage errors

    // Fetch leaderboard data from the backend
    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const response = await fetch('http://localhost:4000/leaderboard'); // Update URL if necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                console.log(data);
                setLeaders(data); // Set the fetched data to the leaders state
            } catch (err) {
                setError(err.message); // Set the error message if fetching fails
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchLeaders();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    if (loading) {
        return <div className="text-white text-center">Loading...</div>; // Loading message
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>; // Error message
    }

    return (
        <div className='bg-black min-h-screen text-white p-8'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Leader Board</h1>
            <div className='w-full max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg'>
                <table className='w-full text-left table-auto'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2'>Rank</th>
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaders.map((leader, index) => (
                            <tr key={index} className="bg-gray-700 odd:bg-gray-600">
                                <td className='border px-4 py-2'>{index + 1}</td>
                                <td className='border px-4 py-2'>{leader.name.split('@')[0]}</td>
                                <td className='border px-4 py-2'>{leader.WPM}</td> {/* Use WPM for score */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaderBoard;
