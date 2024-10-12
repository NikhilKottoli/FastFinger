// src/components/ui/input.js
import React from 'react';

const Input = React.forwardRef((props, ref) => {
    return (
        <input
            ref={ref}
            {...props}
            className="border p-2 rounded"
        />
    );
});

export default Input;
