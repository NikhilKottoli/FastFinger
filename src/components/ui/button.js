// src/components/ui/button.js
import React from 'react';

const Button = ({ children, ...props }) => {
    return (
        <button {...props} className="p-2 bg-blue-500 text-white rounded">
            {children}
        </button>
    );
};

export default Button;
