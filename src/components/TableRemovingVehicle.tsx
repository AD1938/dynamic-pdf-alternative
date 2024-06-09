import React, { useEffect, useState } from 'react';
import './Table.css';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, TextareaAutosize, FormGroup, Grid } from '@mui/material';
import {  Paper, Box } from '@mui/material';

interface ItemTableProps {
  itemId: string;
}

const TableRemovingVehicle: React.FC<ItemTableProps> = ({ itemId }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState('');
    const [whyVehicleBeingDeleted, setWhyVehicleBeingDeleted] = useState('');
    const [vehicleBeingDeleted, setVehicleBeingDeleted] = useState('');
    const [selectVehicleDeletionAffect, setSelectVehicleDeletionAffect] = useState('');
    const [vehicleDeletionAffect, setVehicleDeletionAffect] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [message, setMessage] = useState('');

    const localStorageKey = `key-${itemId}`;

    useEffect(() => {
      const data = localStorage.getItem(localStorageKey);
      if (data) {
        const savedData = JSON.parse(data);
        setDisplayName(savedData.displayName || '');
        setWhyVehicleBeingDeleted(savedData.whyVehicleBeingDeleted || '');
        setSelectedEffectiveDate(savedData.selectedEffectiveDate || '');
        setVehicleBeingDeleted(savedData.vehicleBeingDeleted || '');
        setSelectVehicleDeletionAffect(savedData.selectVehicleDeletionAffect || '');
        setVehicleDeletionAffect(savedData.vehicleDeletionAffect || '');
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
        whyVehicleBeingDeleted,
        vehicleBeingDeleted,
        selectVehicleDeletionAffect,
        vehicleDeletionAffect,
        additionalNotes,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    };

    const handleGenerate = () => {
        let message = `Who called/emailed and when: ${displayName} at ` + new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ' on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        message += `\nEffective date of vehicle deletion: ${selectedEffectiveDate}`;
        message += `\nVehicle being deleted: ${vehicleBeingDeleted}`;
        message += `\nWhy is vehicle being deleted: ${whyVehicleBeingDeleted}`;
        
        message += `\nWill vehicle deletion affect the usage / distances driven or driver assignment on remaining vehicles on the policy: ${selectVehicleDeletionAffect}`;
        if (selectVehicleDeletionAffect === 'yes') {
            message += `\nChanges related to vehicle removal: ${vehicleDeletionAffect}`;
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
      setVehicleBeingDeleted('');
      setSelectVehicleDeletionAffect('');
      setVehicleDeletionAffect('');
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
              <FormLabel className='titleStyle'>Effective date of vehicle addition:</FormLabel>
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

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Vehicle being deleted:</FormLabel>
        <TextField
          variant="outlined"
          value={vehicleBeingDeleted}
          onChange={(e) => setVehicleBeingDeleted(e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Why is vehicle being deleted:</FormLabel>
        <TextField
          variant="outlined"
          value={whyVehicleBeingDeleted}
          onChange={(e) => setWhyVehicleBeingDeleted(e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Will vehicle deletion affect the usage / distances driven or driver assignment on remaining vehicles on the policy?</FormLabel>
          <RadioGroup 
            row name="selectVehicleDeletionAffect"
            onChange={(e) => setSelectVehicleDeletionAffect(e.target.value)}
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
          
      {selectVehicleDeletionAffect === 'yes' && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Please note all changes:</FormLabel>
          <TextareaAutosize
            minRows={3}
            value={vehicleDeletionAffect}
            onChange={(e) => setVehicleDeletionAffect(e.target.value)}
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

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Attach to file: All emails sent to and from client.</FormLabel>
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

export default TableRemovingVehicle;