// ItemTable3.tsx
import React, { useState } from 'react';
import { jsPDF } from "jspdf";

const ItemTable3: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.text(`First Name: ${firstName}`, 10, 10);
        doc.text(`Last Name: ${lastName}`, 10, 20);
        doc.text(`Selected Date: ${selectedDate}`, 10, 30);

        // Generate PDF data URI string
        const string = doc.output('datauristring');

        // Attempt to open a new window
        const x = window.open();
        if (x) {
            const iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
            x.document.open();
            x.document.write(iframe);
            x.document.close();
        } else {
            // Handle the case where the window couldn't be opened
            alert("Unable to open new window. Please check your popup settings.");
        }
    };

    return (
        <div>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            <button onClick={generatePDF}>Generate PDF</button>
        </div>
    );
};

export default ItemTable3;
