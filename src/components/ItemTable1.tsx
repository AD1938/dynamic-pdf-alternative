// ItemTable1.tsx
import React, { useEffect, useState } from 'react';
import './ItemTable1.css';

interface ItemTableProps {
    itemId: string;
}

interface NewDriver {
    name: string;
    insuranceCarrier: string;
    policyNumber: string;
}

const ItemTable1: React.FC<ItemTableProps> = ({ itemId }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [selectAddressChangeEffect, setSelectAddressChangeEffect] = useState('');
    const [addressChangeEffect, setAddressChangeEffect] = useState('');
    const [selectAddressChangeDriverEffect, setSelectAddressChangeDriverEffect] = useState('');
    const [addressChangeDriverEffect, setAddressChangeDriverEffect] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [newDrivers, setNewDrivers] = useState<NewDriver[]>([]);
    const [newDriverAdded, setNewDriverAdded] = useState(false);
    const [message, setMessage] = useState('');

    const localStorageKey = `itemTable1-${itemId}`;

    useEffect(() => {
        const data = localStorage.getItem(localStorageKey);
        if (data) {
            const savedData = JSON.parse(data);
            setDisplayName(savedData.displayName || '');
            setSelectedEffectiveDate(savedData.selectedEffectiveDate || '');
            setNewAddress(savedData.newAddress || '');
            setSelectAddressChangeEffect(savedData.selectAddressChangeEffect || '');
            setAddressChangeEffect(savedData.addressChangeEffect || '');
            setSelectAddressChangeDriverEffect(savedData.selectAddressChangeDriverEffect || '');
            setAddressChangeDriverEffect(savedData.addressChangeDriverEffect || '');
            setAdditionalNotes(savedData.additionalNotes || '');
            setNewDrivers(savedData.newDrivers || []);
            setNewDriverAdded(savedData.newDrivers && savedData.newDrivers.length > 0);
        }
    }, [itemId]);

    const saveData = () => {
        const dataToSave = {
            displayName,
            selectedEffectiveDate,
            newAddress,
            selectAddressChangeEffect,
            addressChangeEffect,
            selectAddressChangeDriverEffect,
            addressChangeDriverEffect,
            additionalNotes,
            newDrivers
        };
        localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    };

    const handleAddDriver = () => {
        setNewDrivers([...newDrivers, { name: '', insuranceCarrier: '', policyNumber: '' }]);
        setNewDriverAdded(true);
    };

    const handleRemoveDriver = (index: number) => {
        const updatedDrivers = newDrivers.filter((_, i) => i !== index);
        setNewDrivers(updatedDrivers);
    };

    const handleDriverChange = (index: number, field: string, value: string) => {
        const updatedDrivers = newDrivers.map((driver, i) => {
            if (i === index) {
                return { ...driver, [field]: value };
            }
            return driver;
        });
        setNewDrivers(updatedDrivers);
    };

    const handleNewDriverSelection = (value: string) => {
        if (value === "no") {
            setNewDrivers([]);
            setNewDriverAdded(false);
        } else if (value === "yes" && newDrivers.length === 0) {
            handleAddDriver();
        }
    };

    const handleGenerate = () => {
        const newDriversString = newDrivers.map(driver => 
            `New Driver Name: ${driver.name}, Insurance Carrier: ${driver.insuranceCarrier}, Policy Number: ${driver.policyNumber}`).join('\n');
        const message = `Name: ${displayName}\nEffective Date of Address Change: ${selectedEffectiveDate}\nNew Address: ${newAddress}\nAddress Change Effect: ${addressChangeEffect}\nDriver Assignment Change: ${addressChangeDriverEffect}\nAdditional Notes: ${additionalNotes}\nNew Drivers:\n${newDriversString}`;
        setMessage(message);
        saveData();
        try {
            navigator.clipboard.writeText(message);
        } catch (err) {
            console.error('Failed to copy message: ', err);
        }
    };

    const handleClear = () => {
        localStorage.removeItem(localStorageKey);
        setMessage('');
        setDisplayName('');
        setSelectedEffectiveDate('');
        setNewAddress('');
        setSelectAddressChangeEffect('');
        setAddressChangeEffect('');
        setSelectAddressChangeDriverEffect('');
        setAddressChangeDriverEffect('');
        setAdditionalNotes('');
        setNewDrivers([]);
        setNewDriverAdded(false);
    };
    return (
        <div className="containerItemTable1">
            <label className="label">Who called/emailed:</label>
            <div className="row">
                <input
                    className="input input-short"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </div>
            {/* <label className="label">Date:</label>
            <div className="row">
                <input
                    className="input"
                    type="date"
                    value={selectedDate.split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value + 'T' + selectedTime)}
                />
                <input
                    className="input button-margin"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                />
                <button className="button button-margin" onClick={handleTodayDate}>Today & Now</button>
            </div> */}
            <label className="label">Effective date of address change:</label>
            <div className="row">
                <input
                    className="input"
                    type="date"
                    value={selectedEffectiveDate.split('T')[0]}
                    onChange={(e) => setSelectedEffectiveDate(e.target.value)}
                />
            </div>
            <label className="">New Address:</label>
            <div className="row label">
                <input
                    className='input'
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                />
            </div>
            <label className="label">Are there any new drivers in the household?</label>
            <div className="column">
                <div>
                    <input type="radio" id="yesNewDriver" name="newDriver" value="yes" onChange={(e) => handleNewDriverSelection(e.target.value)} />
                    <label htmlFor="yesNewDriver">Yes</label>
                </div>
                <div>
                    <input type="radio" id="noNewDriver" name="newDriver" value="no" onChange={(e) => handleNewDriverSelection(e.target.value)} defaultChecked />
                    <label htmlFor="noNewDriver">No</label>
                </div>
            </div>
            {newDriverAdded && (
                <div>
                    <p style={{ color: 'red' }}>All drivers in household must be insured under OAP1</p>
                    <label>Please provide drivers insurance information:</label>
                    <table>
                        <thead>
                            <tr>
                                <th>New Driver Name</th>
                                <th>Insurance Carrier</th>
                                <th>Policy Number</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {newDrivers.map((driver, index) => (
                                <tr key={index}>
                                    <td><input type="text" value={driver.name} onChange={(e) => handleDriverChange(index, 'name', e.target.value)} /></td>
                                    <td><input type="text" value={driver.insuranceCarrier} onChange={(e) => handleDriverChange(index, 'insuranceCarrier', e.target.value)} /></td>
                                    <td><input type="text" value={driver.policyNumber} onChange={(e) => handleDriverChange(index, 'policyNumber', e.target.value)} /></td>
                                    <td><button onClick={() => handleRemoveDriver(index)}>X</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleAddDriver}>Add another new driver</button>
                </div>
            )}
            <label className="row">Will this address change affect the usage and distance driven of any of the vehicles on the policy?</label>
            <div className="">
                <div>
                    <input
                        type="radio"
                        id="yes"
                        name="selectAddressChangeEffect"
                        value="yes"
                        onChange={(e) => setSelectAddressChangeEffect(e.target.value)}
                    />
                    <label htmlFor="yes">Yes</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="no"
                        name="selectAddressChangeEffect"
                        value="no"
                        onChange={(e) => setSelectAddressChangeEffect(e.target.value)}
                        defaultChecked
                    />
                    <label htmlFor="no">No</label>
                </div>
                {selectAddressChangeEffect === 'yes' && (
                    <div id="addressChangeEffectDiv">
                        <label className="">Note any change in use (i.e. pleasure, commute, business) and distance driven for all vehicles on the policy:</label>
                        <div className="row label">
                            <textarea
                                className='input'
                                value={addressChangeEffect}
                                onChange={(e) => setAddressChangeEffect(e.target.value)}
                                style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <label className="row">Will the address change affect driver assignment on any of the vehicles?</label>
            <div className="">
                <div>
                    <input
                        type="radio"
                        id="yesDriver"
                        name="selectAddressChangeDriverEffect"
                        value="yes"
                        onChange={(e) => setSelectAddressChangeDriverEffect(e.target.value)}
                    />
                    <label htmlFor="yesDriver">Yes</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="noDriver"
                        name="selectAddressChangeDriverEffect"
                        value="no"
                        onChange={(e) => setSelectAddressChangeDriverEffect(e.target.value)}
                        defaultChecked
                    />
                    <label htmlFor="noDriver">No</label>
                </div>
                {selectAddressChangeDriverEffect === 'yes' && (
                    <div id="addressChangeDriverEffectDiv">
                        <label className="">Please note any changes to driver assignment for all vehicles listed on the policy:</label>
                        <div className="row label">
                            <textarea
                                className='input'
                                value={addressChangeDriverEffect}
                                onChange={(e) => setAddressChangeDriverEffect(e.target.value)}
                                style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <label className="">Additional Notes:</label>
            <div className="row label">
                <textarea
                    className='input'
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                />
            </div>
            {/* <div>
                <label className="label">Select Option:</label>
                <select className="select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div> */}
            {/* <div>
                <button className="button" onClick={saveData}>Save</button>
            </div> */}
            <div>
                <button className="button" onClick={handleGenerate}>Generate & Copy</button>
            </div>
            {/* {message && <p className="message">{message}</p>} */}
            {message && <pre className="message">{message}</pre>}
            
            <div>
                <button className="button" onClick={handleClear}>Clear</button>
            </div>
        </div>
    );
};

export default ItemTable1;
