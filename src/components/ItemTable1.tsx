// ItemTable1.tsx
import React, { useEffect, useState } from 'react';

interface ItemTableProps {
    itemId: string;
}

const ItemTable1: React.FC<ItemTableProps> = ({ itemId }) => {
    const [text, setText] = useState('');

    useEffect(() => {
        const savedText = localStorage.getItem(`itemTable1-${itemId}`);
        if (savedText) {
            setText(savedText);
        }
    }, [itemId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        setText(newText);
        localStorage.setItem(`itemTable1-${itemId}`, newText);
    };

    return (
        <div>
            <label htmlFor="itemTable1-input">Details for {itemId} (Table 1):</label>
            <input
                type="text"
                id="itemTable1-input"
                value={text}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '10px' }}
            />
        </div>
    );
};

export default ItemTable1;
