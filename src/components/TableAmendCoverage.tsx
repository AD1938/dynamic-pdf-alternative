import React, { useEffect, useState } from 'react';
import './Table.css';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, TextareaAutosize, FormGroup, Grid } from '@mui/material';
import {  Paper, Box } from '@mui/material';

interface ItemTableProps {
  itemId: string;
}

const TableAmendCoverage: React.FC<ItemTableProps> = ({ itemId }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState('');
    const [vehicleCoverage, setVehicleCoverage] = useState('');
    const [selectLeasedOrFinanced, setSelectLeasedOrFinanced] = useState('');

    const [coverageDetails, setCoverageDetails] = useState('');
    const [coverageReason, setCoverageReason] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [message, setMessage] = useState('');
    const localStorageKey = `key-${itemId}`;

    useEffect(() => {
      const data = localStorage.getItem(localStorageKey);
      if (data) {
        const savedData = JSON.parse(data);
        setDisplayName(savedData.displayName || '');
        setSelectedEffectiveDate(savedData.selectedEffectiveDate || '');
        setVehicleCoverage(savedData.vehicleCoverage || '');
        setSelectLeasedOrFinanced(savedData.selectLeasedOrFinanced || '');

        setCoverageDetails(savedData.coverageDetails || '');
        setCoverageReason(savedData.coverageReason || '');
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
        vehicleCoverage,
        selectLeasedOrFinanced,

        coverageDetails,
        coverageReason,        
        additionalNotes,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    };

    const [vehicles, setVehicles] = useState([{ vehicleCoverage: '', selectLeasedOrFinanced: '' }]);
    
    const handleAddVehicle = () => {
      // setNewDrivers([...newDrivers, { name: '', insuranceCarrier: '', policyNumber: '' }]);
      // setNewDriverAdded(true);
      setVehicles([...vehicles, { vehicleCoverage: '', selectLeasedOrFinanced: '' }]);
    };

    const handleRemoveVehicle = (index: number) => {
      const newVehicles = [...vehicles];
      newVehicles.splice(index, 1);
      setVehicles(newVehicles);
    };

    const handleGenerate = () => {
      let message = `Who called/emailed and when: ${displayName} at ` + new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ' on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      message += `\nEffective date of change: ${selectedEffectiveDate}`;
      message += `\nVehicle(s) which coverages are being amended on: `;
      vehicles.forEach((vehicle, index) => {
        message += `\nVehicle ${index + 1}: ${vehicle.vehicleCoverage}`;
        message += `\nIs this vehicle leased or financed?: ${vehicle.selectLeasedOrFinanced}`;
      });
      
      message += `\nDetails of coverage being amended: ${coverageDetails}`;
      message += `\nWhat's the reason for this coverage change?: ${coverageReason}`;
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
            <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>Vehicle(s) which coverages are being amended on:</FormLabel>
          </FormGroup>
        </FormControl>

        {vehicles.map((vehicle, index) => (
          <div key={index}>
            <FormControl component="fieldset" fullWidth margin="normal">
              <FormGroup>
                <FormLabel className='titleStyle'>Vehicle:</FormLabel>
                <TextField
                  variant="outlined"
                  value={vehicle.vehicleCoverage}
                  onChange={(e) => {
                    const newVehicles = [...vehicles];
                    newVehicles[index].vehicleCoverage = e.target.value;
                    setVehicles(newVehicles);
                  }}
                  fullWidth
                />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset" margin="normal">
              <FormGroup>
                <FormLabel className='titleStyle'>Is this vehicle leased or financed?</FormLabel>
                <RadioGroup
                  row
                  name={`selectLeasedOrFinanced${index}`}
                  onChange={(e) => {
                    const newVehicles = [...vehicles];
                    newVehicles[index].selectLeasedOrFinanced = e.target.value;
                    setVehicles(newVehicles);
                  }}
                >
                  <FormControlLabel value="leased" control={<Radio />} label="Leased" />
                  <FormControlLabel value="financed" control={<Radio />} label="Financed" />
                </RadioGroup>
                {(vehicle.selectLeasedOrFinanced === 'leased' || vehicle.selectLeasedOrFinanced === 'financed') && (
                  <FormLabel className='titleStyle' style={{color:'red'}}>FULL COVERAGE IS REQUIRED!</FormLabel>
                )}
              </FormGroup>
            </FormControl>
            <Button variant="contained" color="error" onClick={() => handleRemoveVehicle(index)} style={{ marginTop: '40px', marginLeft: '40px' }}>
              Remove
            </Button>
          </div>
        ))}
        <Button variant="contained" color="success" onClick={handleAddVehicle}>
          Add another Vehicle
        </Button>
        

        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Details of coverage being amended:</FormLabel>
          <TextareaAutosize minRows={4} value={coverageDetails} onChange={(e) => setCoverageDetails(e.target.value)} style={{ width: '100%'}} />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>What's the reason for this coverage change?</FormLabel>
          <TextareaAutosize minRows={4} value={coverageReason} onChange={(e) => setCoverageReason(e.target.value)} style={{ width: '100%'}} />
        </FormControl>


        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Additional Notes</FormLabel>
          <TextareaAutosize minRows={4} value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} style={{ width: '100%'}} />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>ATTACH TO FILE:</FormLabel>
          <br />
          <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>• Emails to and from client</FormLabel>
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

export default TableAmendCoverage;