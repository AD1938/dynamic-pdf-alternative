import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import logo from '../assets/logo.png';

const ItemTable3: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const loadImage = (url: string, callback: (base64Img: string) => void): void => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            const reader = new FileReader();
            reader.onloadend = function() {
                if (typeof reader.result === 'string') {  // Ensure result is a string
                    callback(reader.result);
                }
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    };

    const generatePDF = (): void => {
        const doc = new jsPDF();

        loadImage(logo, (base64Img: string) => {
            doc.addImage(base64Img, 'PNG', 80, 10, 55, 20); // Logo positioned and scaled

            doc.setFontSize(12);
            // Corrected the arguments for text alignment
            doc.text('Wellcare Insurance', 105, 55, { align: 'center' });
            doc.text('200 Town Centre Blvd Unit 101, Markham, ON L3R 8G5', 105, 65, { align: 'center' });

            doc.setFontSize(10);
            doc.text(`First Name: ${firstName}`, 105, 80, { align: 'center' });
            doc.text(`Last Name: ${lastName}`, 105, 90, { align: 'center' });

            const pdfDataUri = doc.output('datauristring');
            const iframe = `<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`;
            const windowRef = window.open();
            if (windowRef) {
                windowRef.document.open();
                windowRef.document.write(iframe);
                windowRef.document.close();
            } else {
                alert("Popup blocked. Please allow popups for this site.");
            }
        });
    };

    return (
        <div>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
            <button onClick={generatePDF}>Generate PDF</button>
        </div>
    );
};

export default ItemTable3;
