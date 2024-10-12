// src/components/ui/label.js
import React from 'react';

const Label = ({ children, ...props }) => {
    return (
        <label {...props} className="block text-sm font-medium text-gray-700">
            {children}
        </label>
    );
};

export default Label;
