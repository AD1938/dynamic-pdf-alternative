import React, { useEffect, useState } from 'react';
import './Table.css';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, TextareaAutosize, FormGroup, Grid, Checkbox } from '@mui/material';
import {  Paper, Box } from '@mui/material';

interface ItemTableProps {
  itemId: string;
}

const TableAddingDiscount: React.FC<ItemTableProps> = ({ itemId }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState('');
    const [selectAddRemove, setSelectAddRemove] = useState('');
    const [winterTire, setWinterTire] = useState(false);
    const [winterTirePolicyNum, setWinterTirePolicyNum] = useState('');
    const [winterTireDetails, setWinterTireDetails] = useState('');
    const [multiline, setMultiline] = useState(false);
    const [multilinePolicyNum, setMultilinePolicyNum] = useState('');
    const [multilineDetails, setMultilineDetails] = useState('');
    const [retiree, setRetiree] = useState(false);
    const [retireePolicyNum, setRetireePolicyNum] = useState('');
    const [retireeDetails, setRetireeDetails] = useState('');
    const [multiVehicle, setMultiVehicle] = useState(false);
    const [multiVehiclePolicyNum, setMultiVehiclePolicyNum] = useState('');
    const [multiVehicleDetails, setMultiVehicleDetails] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [message, setMessage] = useState('');
    const localStorageKey = `key-${itemId}`;

    useEffect(() => {
      const data = localStorage.getItem(localStorageKey);
      if (data) {
        const savedData = JSON.parse(data);
        setDisplayName(savedData.displayName || '');
        setSelectedEffectiveDate(savedData.selectedEffectiveDate || '');
        setSelectAddRemove(savedData.selectAddRemove || '');
        setWinterTire(savedData.winterTire || false);
        setWinterTirePolicyNum(savedData.winterTirePolicyNum || '');
        setWinterTireDetails(savedData.winterTireDetails || '');
        setMultiline(savedData.multiline || false);
        setMultilinePolicyNum(savedData.multilinePolicyNum || '');
        setMultilineDetails(savedData.multilineDetails || '');
        setRetiree(savedData.retiree || false);
        setRetireePolicyNum(savedData.retireePolicyNum || '');
        setRetireeDetails(savedData.retireeDetails || '');
        setMultiVehicle(savedData.multiVehicle || false);
        setMultiVehiclePolicyNum(savedData.multiVehiclePolicyNum || '');
        setMultiVehicleDetails(savedData.multiVehicleDetails || '');
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
        selectAddRemove,
        winterTire,
        winterTirePolicyNum,
        winterTireDetails,
        multiline,
        multilinePolicyNum,
        multilineDetails,
        retiree,
        retireePolicyNum,
        retireeDetails,
        multiVehicle,
        multiVehiclePolicyNum,
        multiVehicleDetails,
        additionalNotes,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    };

    const handleGenerate = () => {
        let message = `Who called/emailed and when: ${displayName} at ` + new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ' on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        message += `\nEffective date of change: ${selectedEffectiveDate}`;
        message += `\n${selectAddRemove === 'add' ? 'Add' : 'Remove'} the following discounts:`;
        if (winterTire) {
            message += `\n- Winter tire discount`;
            message += `\n  - Cross-reference policy number: ${winterTirePolicyNum}`;
            message += `\n  - Details: ${winterTireDetails}`;
        }
        if (multiline) {
            message += `\n- Multi-line discount`;
            message += `\n  - Cross-reference policy number: ${multilinePolicyNum}`;
            message += `\n  - Details: ${multilineDetails}`;
        }
        if (retiree) {
            message += `\n- Retiree discount`;
            message += `\n  - Cross-reference policy number: ${retireePolicyNum}`;
            message += `\n  - Details: ${retireeDetails}`;
        }
        if (multiVehicle) {
            message += `\n- Multi-vehicle discount`;
            message += `\n  - Cross-reference policy number: ${multiVehiclePolicyNum}`;
            message += `\n  - Details: ${multiVehicleDetails}`;
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
            <TextField variant="outlined" value={displayName} onChange={(e) => setDisplayName(e.target.value)} fullWidth/>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Effective date of change:</FormLabel>
              <TextField type="date" variant="outlined" value={selectedEffectiveDate.split('T')[0]} onChange={(e) => setSelectedEffectiveDate(e.target.value)} fullWidth/>
          </FormControl>
        </Grid>
      </Grid>

      <FormControl component="fieldset" fullWidth margin="normal">
        <FormGroup>
          <RadioGroup row name="selectAddRemove" onChange={(e) => setSelectAddRemove(e.target.value)}>
            <FormControlLabel value="add" control={<Radio />} label="Add" />
            <FormControlLabel value="remove" control={<Radio />} label="Remove" />
          </RadioGroup>
        </FormGroup>
      </FormControl>
      {selectAddRemove === 'add' && (
        <FormControl fullWidth margin="normal">
          <FormGroup>
            <FormLabel className='titleStyle'>Which discount would client like to add?</FormLabel>
          </FormGroup>
        </FormControl>
      )}
      {selectAddRemove === 'remove' && (
        <FormControl fullWidth margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Which discount would client like to remove?</FormLabel>
        </FormGroup>
      </FormControl>
      )}

      <FormControl fullWidth margin="normal" component="fieldset">
        <FormGroup aria-label="multiline" row>
          <FormControlLabel value="multiline" control={<Checkbox checked={multiline} onChange={(e) => setMultiline(e.target.checked)} />} label="Multi-line discount"/>
          {multiline && (
            <FormControl fullWidth margin="normal">
              <FormLabel className='titleStyle'>Cross-reference policy number:</FormLabel>
              <TextField variant="outlined" value={multilinePolicyNum} onChange={(e) => setWinterTirePolicyNum(e.target.value)} fullWidth />
              <FormLabel className='titleStyle'>Provide any necessary details:</FormLabel>
              <TextField variant="outlined" value={multilineDetails} onChange={(e) => setWinterTireDetails(e.target.value)} fullWidth />
            </FormControl>
          )}
        </FormGroup>
      </FormControl>

      <FormControl fullWidth margin="normal" component="fieldset">
        <FormGroup aria-label="winterTire" row>
          <FormControlLabel value="winterTire" control={<Checkbox checked={winterTire} onChange={(e) => setWinterTire(e.target.checked)} />} label="Winter tire"/>
          {winterTire && (
            <FormControl fullWidth margin="normal">
              <FormLabel className='titleStyle'>Cross-reference policy number:</FormLabel>
              <TextField variant="outlined" value={winterTirePolicyNum} onChange={(e) => setWinterTirePolicyNum(e.target.value)} fullWidth />
              <FormLabel className='titleStyle'>Provide any necessary details:</FormLabel>
              <TextField variant="outlined" value={winterTireDetails} onChange={(e) => setWinterTireDetails(e.target.value)} fullWidth />
            </FormControl>
          )}
        </FormGroup>
      </FormControl>

      <FormControl fullWidth margin="normal" component="fieldset">
        <FormGroup aria-label="retiree" row>
          <FormControlLabel value="retiree" control={<Checkbox checked={retiree} onChange={(e) => setWinterTire(e.target.checked)} />} label="Retiree discount"/>
          {retiree && (
            <FormControl fullWidth margin="normal">
              <FormLabel className='titleStyle'>Cross-reference policy number:</FormLabel>
              <TextField variant="outlined" value={retireePolicyNum} onChange={(e) => setRetireePolicyNum(e.target.value)} fullWidth />
              <FormLabel className='titleStyle'>Provide any necessary details:</FormLabel>
              <TextField variant="outlined" value={retireeDetails} onChange={(e) => setRetireeDetails(e.target.value)} fullWidth />
            </FormControl>
          )}
        </FormGroup>
      </FormControl>

      <FormControl fullWidth margin="normal" component="fieldset">
        <FormGroup aria-label="multiVehicle" row>
          <FormControlLabel value="multiVehicle" control={<Checkbox checked={multiVehicle} onChange={(e) => setWinterTire(e.target.checked)} />} label="Multi-vehicle discount"/>
          {multiVehicle && (
            <FormControl fullWidth margin="normal">
              <FormLabel className='titleStyle'>Cross-reference policy number:</FormLabel>
              <TextField variant="outlined" value={multiVehiclePolicyNum} onChange={(e) => setMultiVehiclePolicyNum(e.target.value)} fullWidth />
              <FormLabel className='titleStyle'>Provide any necessary details:</FormLabel>
              <TextField variant="outlined" value={multiVehicleDetails} onChange={(e) => setMultiVehicleDetails(e.target.value)} fullWidth />
            </FormControl>
          )}
        </FormGroup>
      </FormControl>

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
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>Attach to file: emails to and from client - any necessary signed declarations</FormLabel>
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

export default TableAddingDiscount;