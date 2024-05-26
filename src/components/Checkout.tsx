// Checkout.tsx
import React, { useState } from 'react';
import ItemTable1 from './ItemTable1';
import ItemTable2 from './ItemTable2';
import ItemTable3 from './ItemTable3';
import UITest from './UITest';
import NotExist from './NotExist';
import './Checkout.css';

interface CheckoutProps {
    items: string[];
}

const Checkout: React.FC<CheckoutProps> = ({ items }) => {
    const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(items.length).fill(false));
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const handleCheckboxChange = (index: number) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
        // Automatically deselect and hide the table if its checkbox is unchecked
        if (!updatedCheckedItems[index]) {
            setSelectedItemId(null);
        }
    };

    const handleEditClick = (index: number) => {
        const itemId = `Item ${index + 1}`;
        setSelectedItemId(itemId);
    };

    const renderTable = (itemId: string) => {
        const index = parseInt(itemId.split(' ')[1]) - 1;
        if (index == 0) {
            return <ItemTable1 itemId={itemId} />;
        } else if (index == 1) {
            return <ItemTable2 itemId={itemId} />;
        } else if (index == 2) {
            return <ItemTable3 />;
        } else if (index == 11) {
            return <UITest itemId={itemId} />;
        } else {
            return <NotExist />;
        }
    };

    return (
        <div className="wide-container">
            <h1>Auto Policy Change</h1>
            <div className="items-row">
                {items.map((item, index) => (
                    <div key={index} className="item">
                        <input
                            type="checkbox"
                            id={`checkbox-${index}`}
                            checked={checkedItems[index]}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <label htmlFor={`checkbox-${index}`}>{item}</label>
                        <button
                            disabled={!checkedItems[index]}
                            onClick={() => handleEditClick(index)}
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
            {selectedItemId && renderTable(selectedItemId)}
        </div>
    );
};

export default Checkout;
