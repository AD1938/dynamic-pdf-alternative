// Checkout.tsx
import React, { useState } from 'react';
import ItemTable1 from './ItemTable1';
import ItemTable2 from './ItemTable2';
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
            return <div style={{paddingTop: '100px'}}><ItemTable1 itemId={itemId} /></div>;
        } else if (index == 1) {
            return <div style={{paddingTop: '100px'}}><ItemTable2 itemId={itemId} /></div> ;
        } else {
            return <NotExist />;
        }
    };

    return (
        <div className="checkout-container">
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
