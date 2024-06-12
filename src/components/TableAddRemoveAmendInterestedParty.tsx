import React, { useEffect, useState } from 'react';
import './Table.css';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, TextareaAutosize, FormGroup, Grid } from '@mui/material';
import {  Paper, Box } from '@mui/material';

interface ItemTableProps {
  itemId: string;
}

const TableAddRemoveAmendInterestedParty: React.FC<ItemTableProps> = ({ itemId }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState('');
    const [selectAdditionRemovalOrAmendment, setSelectAdditionRemovalOrAmendment] = useState('');
    const [selectFinancialInterestDetails, setSelectFinancialInterestDetails] = useState('');
    const [lienholder, setLienholder] = useState('');
    const [lessor, setLessor] = useState('');
    const [financialInterestNameAndMailingAddress, setFinancialInterestNameAndMailingAddress] = useState('');
    const [removalDetails, setRemovalDetails] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [message, setMessage] = useState('');
    const localStorageKey = `key-${itemId}`;

    useEffect(() => {
      const data = localStorage.getItem(localStorageKey);
      if (data) {
        const savedData = JSON.parse(data);
        setDisplayName(savedData.displayName || '');
        setSelectedEffectiveDate(savedData.selectedEffectiveDate || '');
        setSelectAdditionRemovalOrAmendment(savedData.selectAdditionRemovalOrAmendment || '');
        setSelectFinancialInterestDetails(savedData.selectFinancialInterestDetails || '');
        setLienholder(savedData.lienholder || '');
        setLessor(savedData.lessor || '');
        setFinancialInterestNameAndMailingAddress(savedData.financialInterestNameAndMailingAddress || '');
        setRemovalDetails(savedData.removalDetails || '');

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
        selectAdditionRemovalOrAmendment,
        financialInterestNameAndMailingAddress,
        selectFinancialInterestDetails,
        lienholder,
        lessor,
        removalDetails,
        additionalNotes,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    };

    const handleGenerate = () => {
        let message = `Who called/emailed and when: ${displayName} at ` + new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ' on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        message += `\nEffective date of change: ${selectedEffectiveDate}`;
        message += `\nIs this an addition, removal or amendment: ${selectAdditionRemovalOrAmendment}`;
        if (selectAdditionRemovalOrAmendment === 'addition' || selectAdditionRemovalOrAmendment === 'amendment') {
          message += `\nIf addition / amendment, what are the details of the new financial interest: ${selectFinancialInterestDetails}`;
          message += `\nFinancial Interest name and mailing address: ${financialInterestNameAndMailingAddress}`;
        } else if (selectAdditionRemovalOrAmendment === 'removal') {
          message += `\nPlease provide removal details: ${removalDetails}`;
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
          <FormLabel className='titleStyle'>Is this an addition, removal or amendment?</FormLabel>
          <RadioGroup row name="selectAdditionRemovalOrAmendment" onChange={(e) => setSelectAdditionRemovalOrAmendment(e.target.value)}>
            <FormControlLabel value="addition" control={<Radio />} label="Addition" />
            <FormControlLabel value="removal" control={<Radio />} label="Removal" />
            <FormControlLabel value="amendment" control={<Radio />} label="Amendment" />
          </RadioGroup>
        </FormGroup>
      </FormControl>
      {(selectAdditionRemovalOrAmendment === 'addition' || selectAdditionRemovalOrAmendment === 'amendment') && (
        <FormControl fullWidth margin="normal">
          <FormGroup>
            <FormLabel className='titleStyle'>If addition / amendment, what are the details of the new financial interest?</FormLabel>
            <RadioGroup row name="selectFinancialInterestDetails" onChange={(e) => setSelectFinancialInterestDetails(e.target.value)}>
              <FormControlLabel value="lienholder" control={<Radio />} label="Lienholder" />
              <FormControlLabel value="lessor" control={<Radio />} label="Lessor" />
            </RadioGroup>
          </FormGroup>
          <FormLabel className='titleStyle'>Financial Interest name and mailing address:</FormLabel>
          <TextareaAutosize
            minRows={4}
            value={financialInterestNameAndMailingAddress}
            onChange={(e) => setFinancialInterestNameAndMailingAddress(e.target.value)}
            style={{ width: '100%'}}
          />
        </FormControl>
      )}
      {selectAdditionRemovalOrAmendment === 'removal' && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Please provide removal details:</FormLabel>
          <TextareaAutosize
            minRows={4}
            value={removalDetails}
            onChange={(e) => setRemovalDetails(e.target.value)}
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

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>ATTACH TO FILE:</FormLabel>
        <br />
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>• Emails to and from client</FormLabel>
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>• If removal of lessor: request copy of ownership as proof that registration is in insureds name only.</FormLabel>
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>• If removal of a lienholder: request a copy of the release documents</FormLabel>
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>• If amendment: request a copy of the release documents for the party being removed</FormLabel>
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

export default TableAddRemoveAmendInterestedParty;