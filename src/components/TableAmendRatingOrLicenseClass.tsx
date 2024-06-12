import React, { useEffect, useState } from 'react';
import './Table.css';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, TextareaAutosize, FormGroup, Grid } from '@mui/material';
import {  Paper, Box } from '@mui/material';

interface ItemTableProps {
  itemId: string;
}

const TableNameChange: React.FC<ItemTableProps> = ({ itemId }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState('');
    const [selectAmendReason, setSelectAmendReason] = useState('');
    const [changeOfKmDriven, setChangeOfKmDriven] = useState('');
    const [driverAndChange, setDriverAndChange] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [message, setMessage] = useState('');
    const localStorageKey = `key-${itemId}`;

    useEffect(() => {
      const data = localStorage.getItem(localStorageKey);
      if (data) {
        const savedData = JSON.parse(data);
        setDisplayName(savedData.displayName || '');
        setSelectedEffectiveDate(savedData.selectedEffectiveDate || '');
        setSelectAmendReason(savedData.selectAmendReason || '');
        setChangeOfKmDriven(savedData.changeOfKmDriven || '');
        setDriverAndChange(savedData.driverAndChange || '');

        setAdditionalNotes(savedData.additionalNotes || '');
      }
    }, [itemId, localStorageKey]);

    useEffect(() => {
      const intervalId = setInterval(saveData, 5000); // Call saveData every 5 seconds
      return () => {clearInterval(intervalId)}; // Clear the interval when the component unmounts
    });

    const saveData = () => {
      const dataToSave = {
        displayName,
        selectedEffectiveDate,
        selectAmendReason,
        changeOfKmDriven,
        driverAndChange,
        additionalNotes,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    };

    const handleGenerate = () => {
        let message = `Who called/emailed and when: ${displayName} at ` + new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ' on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        message += `\nEffective date of change: ${selectedEffectiveDate}`;
        if (selectAmendReason === 'rating') {
          message += `\nWhat is being amended: Rating`;
          message += `\nPlease enter change of Km driven (1-way commute/total annual): ${changeOfKmDriven}`;
        } else if (selectAmendReason === 'licenseClass') {
          message += `\nWhat is being amended: License Class`;
          message += `\nPlease note driver and change of license class. Get Drivers License History if needed: ${driverAndChange}`;
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
      window.location.reload();
    };
    
    return (
      <Paper
        sx={{
          backgroundColor: '#white',
          borderRadius: '8px',
          p: '30px', // shorthand for padding
          boxShadow: 24,
          fontFamily: 'Arial, sans-serif',
          maxWidth: '800px',
          mx: 'auto', // shorthand for margin left and right auto
          my: 2 // shorthand for margin top and bottom 20px
        }}
      >

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Who called/emailed:</FormLabel>
            <TextField
              variant="outlined"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Effective date of change:</FormLabel>
              <TextField
                type="date"
                variant="outlined"
                value={selectedEffectiveDate.split('T')[0]}
                onChange={(e) => setSelectedEffectiveDate(e.target.value)}
                fullWidth
              />
          </FormControl>
        </Grid>
      </Grid>

      <FormControl component="fieldset" fullWidth margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>What is being amended:</FormLabel>
          <RadioGroup row name="selectAmendReason" onChange={(e) => setSelectAmendReason(e.target.value)}>
            <FormControlLabel value="rating" control={<Radio />} label="Rating" />
            <FormControlLabel value="licenseClass" control={<Radio />} label="License Class" />
          </RadioGroup>
        </FormGroup>
      </FormControl>
      {selectAmendReason === 'rating' && (
        <FormControl fullWidth margin="normal">
          <FormGroup>
            <FormLabel className='titleStyle'>Please enter change of Km driven (1-way commute/total annual)</FormLabel>
            <TextareaAutosize
              minRows={4}
              value={changeOfKmDriven}
              onChange={(e) => setChangeOfKmDriven(e.target.value)}
              style={{ width: '100%'}}
            />
          </FormGroup>
        </FormControl>
      )}
      {selectAmendReason === 'licenseClass' && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Please note driver and change of license class. Get Drivers License History if needed:</FormLabel>
          <TextareaAutosize
            minRows={4}
            value={driverAndChange}
            onChange={(e) => setDriverAndChange(e.target.value)}
            style={{ width: '100%'}}
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

export default TableNameChange;