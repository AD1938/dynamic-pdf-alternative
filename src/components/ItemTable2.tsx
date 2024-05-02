// ItemTable2.tsx
import React, { useEffect, useState } from 'react';
import './ItemTable2.css'; // Ensure your CSS path is correct

interface ItemTableProps {
    itemId: string;
}

const ItemTable2: React.FC<ItemTableProps> = ({ itemId }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedOption, setSelectedOption] = useState('A');
    const [message, setMessage] = useState('');

    const localStorageKey = `itemTable2-${itemId}`;

    useEffect(() => {
        const data = localStorage.getItem(localStorageKey);
        if (data) {
            const savedData = JSON.parse(data);
            setFirstName(savedData.firstName || '');
            setLastName(savedData.lastName || '');
            setSelectedDate(savedData.selectedDate || '');
            setSelectedOption(savedData.selectedOption || 'A');
        }
    }, [itemId]);  // Load data when itemId changes

    const saveData = () => {
        const dataToSave = {
            firstName,
            lastName,
            selectedDate,
            selectedOption
        };
        localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
        console.log("Data saved:", dataToSave); // Optional: for debugging
    };

    const handleTodayDate = () => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
    };

    const handleGenerate = () => {
        setMessage(`${firstName} ${lastName} selects ${selectedOption} at the date of ${selectedDate}`);
    };

    return (
        <div className="container">
            <div>
                <label className="label">First Name:</label>
                <input
                    className="input"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label className="label">Last Name:</label>
                <input
                    className="input"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label className="label">Date:</label>
                <input
                    className="input"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <button className="button" onClick={handleTodayDate}>Today</button>
            </div>
            <div>
                <label className="label">Select Option:</label>
                <select className="select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
            <div>
                <button className="button" onClick={saveData}>Save</button>
            </div>
            <div>
                <button className="button" onClick={handleGenerate}>Generate</button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ItemTable2;
