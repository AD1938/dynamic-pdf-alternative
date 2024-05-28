// ItemTableGeneral.tsx
import React, { useEffect, useState } from 'react';
import './ItemTable0.css';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, TextareaAutosize, FormGroup } from '@mui/material';
import {  Paper, Box } from '@mui/material';

interface ItemTableProps {
  itemId: string;
}

const ItemTableGeneral: React.FC<ItemTableProps> = ({ itemId }) => {
    const [displayName, setDisplayName] = useState('');
    const [reasonForContact, setReasonForContact] = useState('');
    const [selectActionRequired, setSelectActionRequired] = useState('');
    const [addressChangeEffect, setAddressChangeEffect] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [message, setMessage] = useState('');

    const localStorageKey = `itemTableGeneral-${itemId}`;

    useEffect(() => {
      const data = localStorage.getItem(localStorageKey);
      if (data) {
        const savedData = JSON.parse(data);
        setDisplayName(savedData.displayName || '');
        setReasonForContact(savedData.reasonForContact || '');
        setSelectActionRequired(savedData.selectActionRequired || '');
        setAddressChangeEffect(savedData.addressChangeEffect || '');
        setAdditionalNotes(savedData.additionalNotes || '');
      }
    }, [itemId, localStorageKey]);

    const saveData = () => {
      const dataToSave = {
        displayName,
        reasonForContact,
        selectActionRequired,
        addressChangeEffect,
        additionalNotes,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    };

    const handleGenerate = () => {
        let message = `Who called/emailed and when: ${displayName} at ` + new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ' on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        message += `\nReason/Purpose for contact: ${reasonForContact}`;
        
        message += `\nAction required?: ${selectActionRequired}`;
        if (selectActionRequired === 'yes') {
            message += `\nExplain action: ${addressChangeEffect}`;
        }
        
        message += `\nAdditional Notes: ${additionalNotes}`;

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
      setReasonForContact('');
      setSelectActionRequired('');
      setAddressChangeEffect('');
      setAdditionalNotes('');
    };
    
    return (
      <Paper
      sx={{
        backgroundColor: '#white',
        borderRadius: '8px',
        p: '30px', // shorthand for padding
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        mx: 'auto', // shorthand for margin left and right auto
        my: 2 // shorthand for margin top and bottom 20px
      }}
    >

        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Who called/emailed:</FormLabel>
          <TextField
            variant="outlined"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            fullWidth
          />
        </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Reason/Purpose for contact:</FormLabel>
        <TextField
          variant="outlined"
          value={reasonForContact}
          onChange={(e) => setReasonForContact(e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Action required?</FormLabel>
          <RadioGroup 
            row name="selectActionRequired"
            onChange={(e) => setSelectActionRequired(e.target.value)}
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
            />
          </RadioGroup>
        </FormGroup>
      </FormControl>
          
      {selectActionRequired === 'yes' && (
        <FormControl>
          <FormLabel className='titleStyle'>Note any change in use (i.e., pleasure, commute, business) and distance driven for all vehicles on the policy:</FormLabel>
          <TextareaAutosize
            minRows={3}
            value={addressChangeEffect}
            onChange={(e) => setAddressChangeEffect(e.target.value)}
            style={{ width: '100%' }}
          />
        </FormControl>
      )}

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Additional Notes</FormLabel>
        <TextareaAutosize
          minRows={4}
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          style={{ width: '100%'}}
        />
      </FormControl>

      <Button onClick={handleGenerate} variant="contained" color="primary" style={{ marginRight: '50px',  marginTop:'20px'}}>Generate & Copy</Button>
      { message && (
      <Box
        sx={{
          backgroundColor: '#e8f5e9', // Light blue background color
          color: 'black', // White text color
          // borderLeft: '5px solid #0056b3', // Solid blue border on the left
          padding: '15px', // Padding around the content
          fontFamily: 'monospace', // Monospace font for the content
          whiteSpace: 'pre-wrap' // Preserves formatting and allows wrapping
        }}
      >
        {message}
      </Box>)}
      <Button onClick={handleClear} variant="contained" color="primary" style={{marginTop: '20px'}}>Clear</Button>

    </Paper>
    );
};

export default ItemTableGeneral;