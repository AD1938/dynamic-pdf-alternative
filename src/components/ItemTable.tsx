// demo for different types of inputs

import React, { useEffect, useState } from 'react';

interface ItemTableProps {
    itemId: string; // Unique ID for each item to key into local storage
}

const ItemTable: React.FC<ItemTableProps> = ({ itemId }) => {
    const [text, setText] = useState('');

    useEffect(() => {
        // Load saved text from local storage
        const savedText = localStorage.getItem(`item-${itemId}`);
        if (savedText) {
            setText(savedText);
        }
    }, [itemId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        setText(newText);
        localStorage.setItem(`item-${itemId}`, newText); // Save to local storage on change
    };

    return (
        <div>
            <label htmlFor="item-input">Details for {itemId}:</label>
            <input
                type="text"
                id="item-input"
                value={text}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '10px' }}
            />
        </div>
    );
};

export default ItemTable;
