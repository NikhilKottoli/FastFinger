// src/components/ui/alert.js
import React from 'react';

const Alert = ({ children }) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
            {children}
        </div>
    );
};

const AlertDescription = ({ children }) => {
    return (
        <div className="mt-2">{children}</div>
    );
};

export { Alert, AlertDescription };
