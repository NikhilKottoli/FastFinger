import React from 'react';

const LeaderBoard = () => {
    const leaders = [
        { name: 'Alice', score: 150 },
        { name: 'Bob', score: 120 },
        { name: 'Charlie', score: 100 },
        { name: 'Diana', score: 90 },
        { name: 'Eve', score: 80 }
    ];

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
                                <td className='border px-4 py-2'>{leader.name}</td>
                                <td className='border px-4 py-2'>{leader.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaderBoard;
