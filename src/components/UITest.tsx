// ItemTable1.tsx
import React, { useEffect, useState } from 'react';
import './ItemTable1.css';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, TextareaAutosize, FormGroup } from '@mui/material';

interface ItemTableProps {
    itemId: string;
}

interface NewDriver {
    name: string;
    insuranceCarrier: string;
    policyNumber: string;
}

interface TitleStyleType {
  marginBottom: string;
  fontWeight: number;

}

const TitleStyle: TitleStyleType = {
  marginBottom: '15px',
  fontWeight: 900,
};

const UITest: React.FC<ItemTableProps> = ({ itemId }) => {
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
      <div style={{ padding: '20px', backgroundColor: 'white' }}>

        <FormControl fullWidth margin="normal">
          <FormLabel style={TitleStyle}>Who called/emailed:</FormLabel>
          <TextField
            variant="outlined"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel style={TitleStyle}>Effective date of address change:</FormLabel>
          <TextField
            type="date"
            variant="outlined"
            value={selectedEffectiveDate.split('T')[0]}
            onChange={(e) => setSelectedEffectiveDate(e.target.value)}
            fullWidth
          />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel style={TitleStyle}>New Address:</FormLabel>
        <TextField
          variant="outlined"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl margin="normal">
        <FormLabel style={TitleStyle}>Are there any new drivers in the household?</FormLabel>
        <RadioGroup 
          row name="newDriver"
          onChange={(e) => handleNewDriverSelection(e.target.value)}
          >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            // defaultChecked
          />
        </RadioGroup>
      </FormControl>

      {newDriverAdded && (
          <div>
          <p style={{ color: 'red' }}>All drivers in household must be insured under OAP1</p>
          <FormLabel>Please provide drivers insurance information:</FormLabel>
              <table style={{marginBottom: '20px'}}>
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
              <Button onClick={handleAddDriver} variant="outlined" style={{ margin: '20px 0' }}>Add another new driver</Button>
            </div>

        )}

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel style={TitleStyle}>Will this address change affect the usage and distance driven of any of the vehicles on the policy?</FormLabel>
          <RadioGroup 
            row name="selectAddressChangeEffect"
            onChange={(e) => setSelectAddressChangeEffect(e.target.value)}
            >
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label="Yes"
              // onChange={(e) => setSelectAddressChangeEffect(e.target.value)}
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label="No"
              // onChange={(e) => setSelectAddressChangeEffect(e.target.value)}
              // defaultChecked
            />
          </RadioGroup>
        </FormGroup>
      </FormControl>
          
      {selectAddressChangeEffect === 'yes' && (
        <FormControl fullWidth margin="normal">
          <FormLabel style={TitleStyle}>Note any change in use (i.e., pleasure, commute, business) and distance driven for all vehicles on the policy:</FormLabel>
          <TextareaAutosize
            minRows={3}
            value={addressChangeEffect}
            onChange={(e) => setAddressChangeEffect(e.target.value)}
            style={{ width: '100%' }}
          />
        </FormControl>
      )}
      
      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel style={TitleStyle}>Will this address change affect driver assignment on any of the vehicles?</FormLabel>
          <RadioGroup 
            row name="selectAddressChangeDriverEffect"
            onChange={(e) => setSelectAddressChangeDriverEffect(e.target.value)}
            >
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label="Yes"
              // onChange={(e) => setSelectAddressChangeEffect(e.target.value)}
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label="No"
              // onChange={(e) => setSelectAddressChangeEffect(e.target.value)}
              // defaultChecked
            />
          </RadioGroup>
        </FormGroup>
      </FormControl>
          
      {selectAddressChangeDriverEffect === 'yes' && (
        <FormControl fullWidth margin="normal">
          <FormLabel style={TitleStyle}>Please note any changes to driver assignment for all vehicles listed on the policy:</FormLabel>
          <TextareaAutosize
            minRows={3}
            value={addressChangeEffect}
            onChange={(e) => setAddressChangeDriverEffect(e.target.value)}
            style={{ width: '100%' }}
          />
        </FormControl>
      )}


      <FormControl fullWidth margin="normal">
        <FormLabel style={TitleStyle}>Additional Notes</FormLabel>
        <TextareaAutosize
          minRows={4}
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          style={{ width: '100%'}}
        />
      </FormControl>
      


      <Button onClick={handleGenerate} variant="contained" color="primary" style={{ marginRight: '50px',  marginTop:'20px'}}>Generate & Copy</Button>
      {message && <pre>{message}</pre>}
      <Button onClick={handleClear} variant="contained" color="primary" style={{marginTop: '20px'}}>Clear</Button>

        </div>
    );
};

export default UITest;
