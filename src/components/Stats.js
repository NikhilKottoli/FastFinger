import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Stats = () => {
    const [stats, setStats] = useState({
        wpm: 0,
        accuracy: 0,
        totalKeys: 0,
        correctKeys: 0,
        incorrectKeys: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const id = localStorage.getItem('userId');
                const response = await fetch(`http://localhost:4000/api/stats/${id}`);
                const data = await response.json();
                console.log('Fetched Stats:', data); // Log fetched data

                // Map the fetched data to the component's state
                setStats({
                    wpm: data.averageWPM,                // Use averageWPM
                    accuracy: data.averageAccuracy,       // Use averageAccuracy
                    totalKeys: 0,                         // Set to 0 or modify if you have this data
                    correctKeys: data.totalCorrectWords,  // Use totalCorrectWords
                    incorrectKeys: data.totalIncorrectWords, // Use totalIncorrectWords
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Chart.js Data
    const data = {
        labels: ['WPM', 'Accuracy (%)', 'Total Keys', 'Correct Keys', 'Incorrect Keys'],
        datasets: [
            {
                label: 'Typing Stats',
                data: [
                    stats.wpm,
                    stats.accuracy,
                    stats.totalKeys,
                    stats.correctKeys,
                    stats.incorrectKeys,
                ],
                backgroundColor: ['#4caf50', '#2196f3', '#ffeb3b', '#ff5722', '#f44336'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while fetching data
    }

    return (
        <div className="stats-container bg-black text-white p-6 h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Typing Stats</h2>

            {/* Chart */}
            <div className="chart w-full max-w-lg mb-6">
                <Bar data={data} options={options} />
            </div>

            {/* Stats in text form */}
            <div className="text-stats grid grid-cols-2 gap-4 text-lg">
                <div className="stat-item">
                    <strong>WPM:</strong> {stats.wpm}
                </div>
                <div className="stat-item">
                    <strong>Accuracy:</strong> {stats.accuracy}%
                </div>
                <div className="stat-item">
                    <strong>Total Keys Pressed:</strong> {stats.totalKeys}
                </div>
                <div className="stat-item">
                    <strong>Correct Keys:</strong> {stats.correctKeys}
                </div>
                <div className="stat-item">
                    <strong>Incorrect Keys:</strong> {stats.incorrectKeys}
                </div>
            </div>
        </div>
    );
};

export default Stats;
