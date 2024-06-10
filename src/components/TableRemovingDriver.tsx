import React, { useEffect, useState } from 'react';
import './Table.css';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, TextareaAutosize, FormGroup, Grid } from '@mui/material';
import {Paper, Box } from '@mui/material';

interface ItemTableProps {
  itemId: string;
}

const TableAddingVehicle: React.FC<ItemTableProps> = ({ itemId }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState('');
    const [driverLegalName, setDriverLegalName] = useState('');
    const [resonForRemoval, setResonForRemoval] = useState('');
    const [selectDriverRemainInHousehold, setSelectDriverRemainInHousehold] = useState('no');
    const [selectDriverOwnInsurance, setSelectDriverOwnInsurance] = useState('no');
    const [driverInsuranceDetails, setDriverInsuranceDetails] = useState('');
    const [spouseInsuranceCarrier, setSpouseInsuranceCarrier] = useState('');
    const [spousePolicyNumber, setSpousePolicyNumber] = useState('');
    const [selectDriverDeletionEffect, setSelectDriverDeletionEffect] = useState('no');
    const [driverAdditionChanges, setDriverAdditionChanges] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [message, setMessage] = useState('');

    const localStorageKey = `key-${itemId}`;

    useEffect(() => {
      const data = localStorage.getItem(localStorageKey);
      if (data) {
        const savedData = JSON.parse(data);
        setDisplayName(savedData.displayName || '');
        setSelectedEffectiveDate(savedData.selectedEffectiveDate || '');
        setDriverLegalName(savedData.driverLegalName || '');
        setResonForRemoval(savedData.resonForRemoval || '');
        setSelectDriverRemainInHousehold(savedData.selectDriverRemainInHousehold || 'no');
        setSelectDriverOwnInsurance(savedData.selectDriverOwnInsurance || 'no');
        setDriverInsuranceDetails(savedData.driverInsuranceDetails || '');
        setSpouseInsuranceCarrier(savedData.spouseInsuranceCarrier || '');
        setSpousePolicyNumber(savedData.spousePolicyNumber || '');
        setSelectDriverDeletionEffect(savedData.selectDriverDeletionEffect || 'no');
        setDriverAdditionChanges(savedData.driverAdditionChanges || '');
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
        driverLegalName,
        resonForRemoval,
        selectDriverRemainInHousehold,
        selectDriverOwnInsurance,
        driverInsuranceDetails,
        spouseInsuranceCarrier,
        spousePolicyNumber,
        selectDriverDeletionEffect,
        driverAdditionChanges,
        additionalNotes
      };
      localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    };

    const handleGenerate = () => {
        let message = `Who called/emailed and when: ${displayName} at ` + new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ' on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        message += `\nEffective date of driver removal: ${selectedEffectiveDate}`;
        message += `\nDriver being removed: ${driverLegalName}`;
        message += `\nReason for driver being removed: ${resonForRemoval}`;
        
        message += `\nWill the driver remain in the household: ${selectDriverRemainInHousehold}`;
        if (selectDriverRemainInHousehold === 'yes') {
          message += `\nDoes driver have their own insurance policy: ${selectDriverOwnInsurance}`;
          if (selectDriverOwnInsurance === 'yes') {
            message += `\nInsurance Carrier: ${spouseInsuranceCarrier}`;
            message += `\nPolicy number: ${spousePolicyNumber}`;
          } else {
            message += `\nInsurance Details: ${driverInsuranceDetails}`;
          }
        }

        message += `\nWill driver deletion affect the usage / distances driven or driver assignment on remaining vehicles on the policy: ${selectDriverDeletionEffect}`;
        if (selectDriverDeletionEffect === 'yes') {
          message += `\nChanges: ${driverAdditionChanges}`;
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
            <FormLabel className='titleStyle'>Effective date of driver removal:</FormLabel>
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
        <FormLabel className='titleStyle'>Driver being removed:</FormLabel>
        <TextField
          variant="outlined"
          value={driverLegalName}
          onChange={(e) => setDriverLegalName(e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Reason for driver being removed:</FormLabel>
        <TextareaAutosize
          minRows={4}
          value={resonForRemoval}
          onChange={(e) => setResonForRemoval(e.target.value)}
          style={{ width: '100%'}}
        />
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Will the driver remain in the household?</FormLabel>
          <RadioGroup row name="selectDriverRemainInHousehold" onChange={(e) => setSelectDriverRemainInHousehold(e.target.value)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormGroup>
      </FormControl>          
      {selectDriverRemainInHousehold === 'yes' && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Does driver have their own insurance policy?</FormLabel>
          <RadioGroup row name="selectDriverOwnInsurance" onChange={(e) => setSelectDriverOwnInsurance(e.target.value)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          {selectDriverOwnInsurance === 'yes' && (
            <FormControl fullWidth margin="normal">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <FormLabel className='titleStyle'>Please provide details of Insurance Carrier:</FormLabel>
                    <TextField
                      variant="outlined"
                      value={spouseInsuranceCarrier}
                      onChange={(e) => setSpouseInsuranceCarrier(e.target.value)}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <FormLabel className='titleStyle'>Policy number:</FormLabel>
                    <TextField
                      variant="outlined"
                      value={spousePolicyNumber}
                      onChange={(e) => setSpousePolicyNumber(e.target.value)}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </FormControl>
          )}
          {selectDriverOwnInsurance === 'no' && (
            <FormControl fullWidth margin="normal">
              <FormLabel className='titleStyle'>Please note all details:</FormLabel>
              <TextField variant="outlined" value={driverInsuranceDetails} onChange={(e) => setDriverInsuranceDetails(e.target.value)} fullWidth />
            </FormControl>
          )}
        </FormControl>
      )}

      <FormControl component="fieldset" margin="normal">
          <FormGroup>
            <FormLabel className='titleStyle'>Will driver deletion affect the usage / distances driven or driver assignment on remaining vehicles on the policy?</FormLabel>
            <RadioGroup row name="selectDriverDeletionEffect" onChange={(e) => setSelectDriverDeletionEffect(e.target.value)}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormGroup>
        </FormControl>
        {selectDriverDeletionEffect === 'yes' && (
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Please note all changes:</FormLabel>
            <TextareaAutosize
              minRows={3}
              value={driverAdditionChanges}
              onChange={(e) => setDriverAdditionChanges(e.target.value)}
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
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>ATTACH TO FILE:</FormLabel>
        <br />
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>• All emails sent to and from client, If removed driver is remaining in household and has no current insurance, a signed OPCF 28 needs to be signed in ink and on file.</FormLabel>
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

export default TableAddingVehicle;