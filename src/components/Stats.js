import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Stats = ({ wpm, accuracy, totalKeys, correctKeys, incorrectKeys }) => {
    // Chart.js Data
    const data = {
        labels: ['WPM', 'Accuracy (%)', 'Total Keys', 'Correct Keys', 'Incorrect Keys'],
        datasets: [
            {
                label: 'Typing Stats',
                data: [wpm, accuracy, totalKeys, correctKeys, incorrectKeys],
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
                    <strong>WPM:</strong> {wpm}
                </div>
                <div className="stat-item">
                    <strong>Accuracy:</strong> {accuracy}%
                </div>
                <div className="stat-item">
                    <strong>Total Keys Pressed:</strong> {totalKeys}
                </div>
                <div className="stat-item">
                    <strong>Correct Keys:</strong> {correctKeys}
                </div>
                <div className="stat-item">
                    <strong>Incorrect Keys:</strong> {incorrectKeys}
                </div>
            </div>
        </div>
    );
};

export default Stats;
