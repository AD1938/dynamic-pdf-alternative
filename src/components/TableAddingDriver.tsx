import React, { useEffect, useState } from 'react';
import './Table.css';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, TextareaAutosize, FormGroup, Grid } from '@mui/material';
import {Paper, Box } from '@mui/material';

interface ItemTableProps {
  itemId: string;
}

const TableAddingDriver: React.FC<ItemTableProps> = ({ itemId }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState('');
    const [driverLegalName, setDriverLegalName] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const [selectedDriveryDOB, setSelectedDriveryDOB] = useState('');
    const [driverRelationship, setDriverRelationship] = useState('');
    const [driverMaritalStatus, setDriverMaritalStatus] = useState('married');
    const [selectSpouseOwnInsurance, setSelectSpouseOwnInsurance] = useState('no');
    const [spouseInsuranceDetails, setSpouseInsuranceDetails] = useState('');
    const [spouseName, setSpouseName] = useState('');
    const [spouseInsuranceCarrier, setSpouseInsuranceCarrier] = useState('');
    const [spousePolicyNumber, setSpousePolicyNumber] = useState('');
    const [driverLicenseDateG1, setDriverLicenseDateG1] = useState('');
    const [driverLicenseDateG2, setDriverLicenseDateG2] = useState('');
    const [driverLicenseDateG, setDriverLicenseDateG] = useState('');
    const [selectBeginnerDriverEducation, setSelectBeginnerDriverEducation] = useState('no');
    const [whyAddDriver, setWhyAddDriver] = useState('');
    const [selectMVRAndAutoplus, setSelectMVRAndAutoplus] = useState('no');
    const [selectDriverAdditionEffect, setSelectDriverAdditionEffect] = useState('no');
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
        setDriverLicense(savedData.driverLicense || '');
        setSelectedDriveryDOB(savedData.selectedDriveryDOB || '');
        setDriverRelationship(savedData.driverRelationship || '');
        setDriverMaritalStatus(savedData.driverMaritalStatus || '');
        setSelectSpouseOwnInsurance(savedData.selectSpouseOwnInsurance || '');
        setSpouseInsuranceDetails(savedData.spouseInsuranceDetails || '');
        setSpouseName(savedData.spouseName || '');
        setSpouseInsuranceCarrier(savedData.spouseInsuranceCarrier || '');
        setSpousePolicyNumber(savedData.spousePolicyNumber || '');
        setDriverLicenseDateG1(savedData.driverLicenseDateG1 || '');
        setDriverLicenseDateG2(savedData.driverLicenseDateG2 || '');
        setDriverLicenseDateG(savedData.driverLicenseDateG || '');
        setSelectBeginnerDriverEducation(savedData.selectBeginnerDriverEducation || 'no');
        setWhyAddDriver(savedData.whyAddDriver || '');
        setSelectMVRAndAutoplus(savedData.selectMVRAndAutoplus || 'no');
        setSelectDriverAdditionEffect(savedData.selectDriverAdditionEffect || 'no');
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
        driverLicense,
        selectedDriveryDOB,
        driverRelationship,
        driverMaritalStatus,
        selectSpouseOwnInsurance,
        spouseInsuranceDetails,
        spouseName,
        spouseInsuranceCarrier,
        spousePolicyNumber,
        driverLicenseDateG1,
        driverLicenseDateG2,
        driverLicenseDateG,
        selectBeginnerDriverEducation,
        whyAddDriver,
        selectMVRAndAutoplus,
        selectDriverAdditionEffect,
        driverAdditionChanges,
        additionalNotes
      };
      localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    };

    const handleGenerate = () => {
        let message = `Who called/emailed and when: ${displayName} at ` + new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ' on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        message += `\nEffective date of vehicle addition: ${selectedEffectiveDate}`;
        message += `\nFull legal name of driver being added: ${driverLegalName}`;
        message += `\nDriver's license number of driver being added: ${driverLicense}`;
        message += `\nDate of birth of driver being added: ${selectedDriveryDOB}`;
        message += `\nDriver’s relationship to the insured: ${driverRelationship}`;
        
        message += `\nDriver's marital status: ${driverMaritalStatus}`;
        if (driverMaritalStatus === 'married') {
            message += `\nDoes drivers spouse have their own insurance? ${selectSpouseOwnInsurance}`;
            if (selectSpouseOwnInsurance === 'yes') {
                message += `\nSpouse name: ${spouseName}`;
                message += `\nInsurance carrier: ${spouseInsuranceCarrier}`;
                message += `\nPolicy number: ${spousePolicyNumber}`;
            } else {
                message += `\nPlease note all details: ${spouseInsuranceDetails}`;
            }
        }

        message += `\nAdded driver's licensing dates:`;
        message += `\nDriver's licensing date - G1: ${driverLicenseDateG1}`;
        message += `\nDriver's licensing date - G2: ${driverLicenseDateG2}`;
        message += `\nDriver's licensing date - G: ${driverLicenseDateG}`;

        message += `\nWas beginner driver education completed? ${selectBeginnerDriverEducation}`;

        message += `\nWhy is the driver being added? ${whyAddDriver}`;

        message += `\nWas MVR and Autoplus pulled? ${selectMVRAndAutoplus}`;

        message += `\nWill driver addition affect the usage / distances driven or driver assignment on remaining vehicles on the policy? ${selectDriverAdditionEffect}`;
        if (selectDriverAdditionEffect === 'yes') {
            message += `\nPlease note all changes: ${driverAdditionChanges}`;
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

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Full legal name of driver being added:</FormLabel>
            <TextField
              variant="outlined"
              value={driverLegalName}
              onChange={(e) => setDriverLegalName(e.target.value)}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Driver's license number of driver being added:</FormLabel>
            <TextField
              variant="outlined"
              value={driverLicense}
              onChange={(e) => setDriverLicense(e.target.value)}
              fullWidth
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Date of birth of driver being added:</FormLabel>
              <TextField
                type="date"
                variant="outlined"
                value={selectedDriveryDOB.split('T')[0]}
                onChange={(e) => setSelectedDriveryDOB(e.target.value)}
                fullWidth
              />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Driver’s relationship to the insured:</FormLabel>
            <TextField
              variant="outlined"
              value={driverRelationship}
              onChange={(e) => setDriverRelationship(e.target.value)}
              fullWidth
            />
          </FormControl>
        </Grid>
      </Grid>

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Driver's marital status:</FormLabel>
          <RadioGroup row name="driverMaritalStatus" onChange={(e) => setDriverMaritalStatus(e.target.value)}>
            <FormControlLabel value="married" control={<Radio />} label="Married" />
            <FormControlLabel value="single" control={<Radio />} label="Single" />
          </RadioGroup>
        </FormGroup>
      </FormControl>          
      {driverMaritalStatus === 'married' && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Does drivers spouse have their own insurance?</FormLabel>
          <RadioGroup row name="selectSpouseOwnInsurance" onChange={(e) => setSelectSpouseOwnInsurance(e.target.value)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          {selectSpouseOwnInsurance === 'yes' && (
            <FormControl fullWidth margin="normal">
              <FormControl fullWidth margin="normal">
                <FormLabel className='titleStyle'>Please provide spouse insurance information:</FormLabel>
              </FormControl>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <FormControl fullWidth margin="normal">
                    <FormLabel className='titleStyle'>Spouse name:</FormLabel>
                    <TextField
                      variant="outlined"
                      value={spouseName}
                      onChange={(e) => setSpouseName(e.target.value)}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth margin="normal">
                    <FormLabel className='titleStyle'>Insurance carrier:</FormLabel>
                    <TextField
                      variant="outlined"
                      value={spouseInsuranceCarrier}
                      onChange={(e) => setSpouseInsuranceCarrier(e.target.value)}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
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
          {selectSpouseOwnInsurance === 'no' && (
            <FormControl fullWidth margin="normal">
              <FormLabel className='titleStyle'>Please note all details:</FormLabel>
              <TextField variant="outlined" value={spouseInsuranceDetails} onChange={(e) => setSpouseInsuranceDetails(e.target.value)} fullWidth />
            </FormControl>
          )}
        </FormControl>
      )}

      <FormControl fullWidth margin="normal">
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Added driver's licensing dates:</FormLabel>
        </FormControl>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <FormControl fullWidth margin="normal">
              <FormLabel className='titleStyle'>Driver's licensing date - G1:</FormLabel>
              <TextField
                variant="outlined"
                value={driverLicenseDateG1}
                onChange={(e) => setDriverLicenseDateG1(e.target.value)}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Driver's licensing date - G2:</FormLabel>
              <TextField
                variant="outlined"
                value={driverLicenseDateG2}
                onChange={(e) => setDriverLicenseDateG2(e.target.value)}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Driver's licensing date - G:</FormLabel>
              <TextField
                variant="outlined"
                value={driverLicenseDateG}
                onChange={(e) => setDriverLicenseDateG(e.target.value)}
                fullWidth
              />
            </FormControl>
          </Grid>
        </Grid>
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Was beginner driver education completed?</FormLabel>
          <RadioGroup row name="selectBeginnerDriverEducation" onChange={(e) => setSelectBeginnerDriverEducation(e.target.value)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormGroup>
      </FormControl>
      {selectBeginnerDriverEducation === 'yes' && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle' style={{color:'red'}}>ENSURE DRIVER LICENSE HISTORY IS ON FILE</FormLabel>
        </FormControl>
      )}

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Why is the driver being added?</FormLabel>
        <TextField
          variant="outlined"
          value={whyAddDriver}
          onChange={(e) => setWhyAddDriver(e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Was MVR and Autoplus pulled?</FormLabel>
          <RadioGroup row name="selectMVRAndAutoplus" onChange={(e) => setSelectMVRAndAutoplus(e.target.value)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormGroup>
      </FormControl>
      {selectMVRAndAutoplus === 'yes' && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle' style={{color:'red'}}>Ensure to pull MVR and Autoplus</FormLabel>
        </FormControl>
      )}

      <FormControl component="fieldset" margin="normal">
          <FormGroup>
            <FormLabel className='titleStyle'>Will driver addition affect the usage / distances driven or driver assignment on remaining vehicles on the policy?</FormLabel>
            <RadioGroup row name="selectDriverAdditionEffect" onChange={(e) => setSelectDriverAdditionEffect(e.target.value)}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormGroup>
        </FormControl>          
        {selectDriverAdditionEffect === 'yes' && (
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
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>• MVR, Autoplus, LOE (where necessary), Drivers License History (if applying for drivers training discount), Emails to and from client.</FormLabel>
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

export default TableAddingDriver;