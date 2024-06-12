import React, { useEffect, useState } from 'react';
import './Table.css';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, TextareaAutosize, FormGroup, Grid, MenuItem, Checkbox } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Paper, Box } from '@mui/material';

interface ItemTableProps {
  itemId: string;
}

const TableAddingVehicle: React.FC<ItemTableProps> = ({ itemId }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState('');
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [vin, setVIN] = useState('');
    const [yearRemoved, setYearRemoved] = useState('');
    const [makeRemoved, setMakeRemoved] = useState('');
    const [modelRemoved, setModelRemoved] = useState('');
    const [vehicleOwner, setVehicleOwner] = useState('');
    const [selectLeasedOrFinanced, setSelectLeasedOrFinanced] = useState('leased');
    const [lessorNameAddress, setLessorNameAddress] = useState('');
    const [lienholderNameAddress, setLienholderNameAddress] = useState('');
    const [selectNewOrUsed, setSelectNewOrUsed] = useState('new');
    const [mileageAtPurchase, setMileageAtPurchase] = useState('');
    const [selectAnyModCusDam, setSelectAnyModCusDam] = useState('');
    const [anyModCusDam, setAnyModCusDam] = useState('');
    const [selectHasWinterTires, setSelectHasWinterTires] = useState('');
    const [principalOperator, setPrincipalOperator] = useState('');
    const [occasionalDrivers, setOccasionalDrivers] = useState('');
    const [vehicleUse, setVehicleUse] = useState('');
    const [totalAnnualDistance, setTotalAnnualDistance] = useState('');
    const [oneWayCommuteToWork, setOneWayCommuteToWork] = useState('');
    const [totalBusinessDistance, setTotalBusinessDistance] = useState('');
    const [selectRideSharing, setSelectRideSharing] = useState('');
    const [rideSharing, setRideSharing] = useState('');
    const [selectFoodDelivery, setSelectFoodDelivery] = useState('');
    const [foodDelivery, setFoodDelivery] = useState('');
    const [liabilityLimit, setLiabilityLimit] = useState('');
    const [allPerilsDeductible, setAllPerilsDeductible] = useState('');
    const [collisionDeductible, setCollisionDeductible] = useState('');
    const [comprehensiveDeductible, setComprehensiveDeductible] = useState('');
    const [selectAccidentBenefitsBuyUps, setSelectAccidentBenefitsBuyUps] = useState('');
    const [accidentForgiveness, setAccidentForgiveness] = useState('');
    const [opcf20, setOpcf20] = useState(false);
    const [opcf20Limit, setOpcf20Limit] = useState('');
    const [opcf27, setOpcf27] = useState(false);
    const [opcf27Limit, setOpcf27Limit] = useState('');
    const [opcf43, setOpcf43] = useState(false);
    const [anyOtherCoverages, setAnyOtherCoverages] = useState('');
    const [selectVehicleChangeEffect, setSelectVehicleChangeEffect] = useState('');
    const [vehicleChangeEffect, setVehicleChangeEffect] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [message, setMessage] = useState('');

    const localStorageKey = `key-${itemId}`;

    useEffect(() => {
      const data = localStorage.getItem(localStorageKey);
      if (data) {
        const savedData = JSON.parse(data);
        setDisplayName(savedData.displayName || '');
        setSelectedEffectiveDate(savedData.selectedEffectiveDate || '');
        setYear(savedData.year || '');
        setMake(savedData.make || '');
        setModel(savedData.model || '');
        setVIN(savedData.vin || '');
        setYearRemoved(savedData.yearRemoved || '');
        setMakeRemoved(savedData.makeRemoved || '');
        setModelRemoved(savedData.modelRemoved || '');
        setVehicleOwner(savedData.vehicleOwner || '');
        setSelectLeasedOrFinanced(savedData.selectLeasedOrFinanced || '');
        setLienholderNameAddress(savedData.lienholderNameAddress || '');
        setLessorNameAddress(savedData.lessorNameAddress || '');
        setSelectNewOrUsed(savedData.selectNewOrUsed || '');
        setMileageAtPurchase(savedData.mileageAtPurchase || '');
        setSelectAnyModCusDam(savedData.selectAnyModCusDam || '');
        setAnyModCusDam(savedData.anyModCusDam || '');
        setSelectHasWinterTires(savedData.selectHasWinterTires || '');
        setPrincipalOperator(savedData.principalOperator || '');
        setOccasionalDrivers(savedData.occasionalDrivers || '');
        setVehicleUse(savedData.vehicleUse || '');
        setTotalAnnualDistance(savedData.totalAnnualDistance || '');
        setOneWayCommuteToWork(savedData.oneWayCommuteToWork || '');
        setTotalBusinessDistance(savedData.totalBusinessDistance || '');
        setSelectRideSharing(savedData.selectRideSharing || '');
        setRideSharing(savedData.rideSharing || '');
        setSelectFoodDelivery(savedData.selectFoodDelivery || '');
        setFoodDelivery(savedData.foodDelivery || '');
        setLiabilityLimit(savedData.liabilityLimit || '');
        setAllPerilsDeductible(savedData.allPerilsDeductible || '');
        setCollisionDeductible(savedData.collisionDeductible || '');
        setComprehensiveDeductible(savedData.comprehensiveDeductible || '');
        setSelectAccidentBenefitsBuyUps(savedData.selectAccidentBenefitsBuyUps || '');
        setAccidentForgiveness(savedData.accidentForgiveness || '');
        setOpcf20(savedData.opcf20 || false);
        setOpcf20Limit(savedData.opcf20Limit || '');
        setOpcf27(savedData.opcf27 || false);
        setOpcf27Limit(savedData.opcf27Limit || '');
        setOpcf43(savedData.opcf43 || false);
        setAnyOtherCoverages(savedData.anyOtherCoverages || '');
        setSelectVehicleChangeEffect(savedData.selectVehicleChangeEffect || '');
        setVehicleChangeEffect(savedData.vehicleChangeEffect || '');
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
        year,
        make,
        model,
        vin,
        yearRemoved,
        makeRemoved,
        modelRemoved,
        vehicleOwner,
        selectLeasedOrFinanced,
        lessorNameAddress,
        lienholderNameAddress,
        selectNewOrUsed,
        mileageAtPurchase,
        selectAnyModCusDam,
        anyModCusDam,
        selectHasWinterTires,
        principalOperator,
        occasionalDrivers,
        vehicleUse,
        totalAnnualDistance,
        oneWayCommuteToWork,
        totalBusinessDistance,
        selectRideSharing,
        rideSharing,
        selectFoodDelivery,
        foodDelivery,
        liabilityLimit,
        allPerilsDeductible,
        collisionDeductible,
        comprehensiveDeductible,
        selectAccidentBenefitsBuyUps,
        accidentForgiveness,
        opcf20,
        opcf20Limit,
        opcf27,
        opcf27Limit,
        opcf43,
        anyOtherCoverages,
        selectVehicleChangeEffect,
        vehicleChangeEffect,
        additionalNotes
      };
      localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    };
    
    const handleVehicleUseChange = (event: SelectChangeEvent) => {
      setVehicleUse(event.target.value as string);
    };

    const handleLiabilityLimitChange = (event: SelectChangeEvent) => {
      setLiabilityLimit(event.target.value as string);
    };

    const handleAllPerilsDeductibleChange = (event: SelectChangeEvent) => {
      setAllPerilsDeductible(event.target.value as string);
    };

    const handleCollisionDeductibleChange = (event: SelectChangeEvent) => {
      setCollisionDeductible(event.target.value as string);
    };

    const handleComprehensiveDeductibleChange = (event: SelectChangeEvent) => {
      setComprehensiveDeductible(event.target.value as string);
    };

    const handleGenerate = () => {
        let message = `Who called/emailed and when: ${displayName} at ` + new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ' on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        message += `\nEffective date of vehicle addition: ${selectedEffectiveDate}`;

        message += `\nVehicle Being Added: ${year} ${make} ${model} VIN: ${vin}`;
        message += `\nVehicle Being Removed: ${yearRemoved} ${makeRemoved} ${modelRemoved}`;
        message += `\nWho is the registered owner of the vehicle: ${vehicleOwner}`;
        message += `\nIs the Vehicle Leased or Financed: ${selectLeasedOrFinanced}`;
        if (selectLeasedOrFinanced === 'leased') {
            message += `\nLessor's Name and Mailing Address: ${lessorNameAddress}`;
        } else if (selectLeasedOrFinanced === 'financed') {
            message += `\nLienholder's Name and Mailing Address: ${lienholderNameAddress}`;
        }

        message += `\nIs the vehicle new / used / demo: ${selectNewOrUsed}`;
        if (selectNewOrUsed === 'new' || selectNewOrUsed === 'demo') {
            message += `\nMileage at Purchase: ${mileageAtPurchase}`;
        }

        message += `\nAre there any modifications, customizations or existing damage: ${selectAnyModCusDam}`;
        if (selectAnyModCusDam === 'yes') {
            message += `\nDetails: ${anyModCusDam}`;
        }

        message += `\nWill you be using winter tires: ${selectHasWinterTires}`;
        message += `\nPrincipal Operator of added vehicle: ${principalOperator}`;
        message += `\nOccasional Drivers of added vehicle: ${occasionalDrivers}`;
        message += `\nVehicle Use: ${vehicleUse}`;
        if (vehicleUse === 'Pleasure') {
            message += `\nTotal annual km driven: ${totalAnnualDistance}`;
        } else if (vehicleUse === 'Commute') {
            message += `\n1-way commute to work: ${oneWayCommuteToWork}`;
            message += `\nTotal annual km driven: ${totalAnnualDistance}`;
        } else if (vehicleUse === 'Business') {
            message += `\nTotal annual km driven: ${totalAnnualDistance}`;
            message += `\nTotal business km driven: ${totalBusinessDistance}`;
        }

        message += `\nRide sharing: ${selectRideSharing}`;
        if (selectRideSharing === 'yes') {
            message += `\nDetails: ${rideSharing}`;
        }

        message += `\nFood delivery: ${selectFoodDelivery}`;
        if (selectFoodDelivery === 'yes') {
            message += `\nDetails: ${foodDelivery}`;
        }

        message += `\nCoverage for Added Vehicle:`;
        message += `\nLiability Limit: ${liabilityLimit}`;
        message += `\nAll Perils Deductible: ${allPerilsDeductible}`;
        message += `\nCollision Deductible: ${collisionDeductible}`;
        message += `\nComprehensive Deductible: ${comprehensiveDeductible}`;

        message += `\nAccident Benefits Buy-ups: ${selectAccidentBenefitsBuyUps}`;
        if (selectAccidentBenefitsBuyUps === 'yes') {
            message += `\nIncome Replacement: ${liabilityLimit}`;
            message += `\nMedical, Rehabilitation and Attendant Care: ${allPerilsDeductible}`;
            message += `\nMedical, Rehabilitation and Attendant Care - catastrophic impairment: ${collisionDeductible}`;
            message += `\nCaregiver, Housekeeping & Home Maintenance: ${comprehensiveDeductible}`;
        }

        message += `\nAccident Forgiveness (APE): ${accidentForgiveness}`;
        message += `\nOPCF 20: ${opcf20}`;
        if (opcf20) {
            message += `\nLimit: ${opcf20Limit}`;
        }
        message += `\nOPCF 27: ${opcf27}`;
        if (opcf27) {
            message += `\nLimit: ${opcf27Limit}`;
        }
        message += `\nOPCF 43: ${opcf43}`;
        message += `\nAny Other Coverages: ${anyOtherCoverages}`;

        message += `\nVehicle Change Effect: ${selectVehicleChangeEffect}`;
        if (selectVehicleChangeEffect === 'yes') {
            message += `\nChange: ${vehicleChangeEffect}`;
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
      // setMessage('');
      // setDisplayName('');
      // setSelectedEffectiveDate('');
      // setYear('');
      // setSelectAnyModCusDam('');
      // setAnyModCusDam('');
      // setAdditionalNotes('');
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

        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>Vehicle being added:</FormLabel>
        </FormControl>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <FormControl margin="normal">
              <FormLabel className='titleStyle'>Year:</FormLabel>
              <TextField
                variant="outlined"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl margin="normal">
              <FormLabel className='titleStyle'>Make:</FormLabel>
              <TextField
                variant="outlined"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl margin="normal">
              <FormLabel className='titleStyle'>Model:</FormLabel>
              <TextField
                variant="outlined"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl margin="normal">
              <FormLabel className='titleStyle'>VIN:</FormLabel>
              <TextField
                variant="outlined"
                value={vin}
                onChange={(e) => setVIN(e.target.value)}
                fullWidth
              />
            </FormControl>
          </Grid>
        </Grid>

        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>Vehicle being removed:</FormLabel>
        </FormControl>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <FormControl margin="normal">
              <FormLabel className='titleStyle'>Year:</FormLabel>
              <TextField
                variant="outlined"
                value={yearRemoved}
                onChange={(e) => setYearRemoved(e.target.value)}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl margin="normal">
              <FormLabel className='titleStyle'>Make:</FormLabel>
              <TextField
                variant="outlined"
                value={makeRemoved}
                onChange={(e) => setMakeRemoved(e.target.value)}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl margin="normal">
              <FormLabel className='titleStyle'>Model:</FormLabel>
              <TextField
                variant="outlined"
                value={modelRemoved}
                onChange={(e) => setModelRemoved(e.target.value)}
                fullWidth
              />
            </FormControl>
          </Grid>
        </Grid>

        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Who is the registered owner of the vehicle?</FormLabel>
          <TextField
            variant="outlined"
            value={vehicleOwner}
            onChange={(e) => setVehicleOwner(e.target.value)}
            fullWidth
          />
        </FormControl>

        <FormControl component="fieldset" fullWidth margin="normal">
          <FormGroup>
            <FormLabel className='titleStyle'>Is the Vehicle Leased or Financed?</FormLabel>
            <RadioGroup row name="selectLeasedOrFinanced" onChange={(e) => setSelectLeasedOrFinanced(e.target.value)}>
              <FormControlLabel value="leased" control={<Radio />} label="Leased" />
              <FormControlLabel value="financed" control={<Radio />} label="Financed" />
              <FormControlLabel value="noFinancialInterest" control={<Radio />} label="No Financial Interest" />
            </RadioGroup>
          </FormGroup>
        </FormControl>
        {selectLeasedOrFinanced === 'leased' && (
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Please enter Lessor's Name and Mailing Address:</FormLabel>
            <TextareaAutosize minRows={3} value={lessorNameAddress} onChange={(e) => setLessorNameAddress(e.target.value)} style={{ width: '100%' }} />
          </FormControl>
        )}
        {selectLeasedOrFinanced === 'financed' && (
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Please enter Lienholder's Name and Mailing Address:</FormLabel>
            <TextareaAutosize minRows={3} value={lienholderNameAddress} onChange={(e) => setLienholderNameAddress(e.target.value)} style={{ width: '100%' }} />
          </FormControl>
        )}

        <FormControl component="fieldset" fullWidth margin="normal">
          <FormGroup>
            <FormLabel className='titleStyle'>Is the vehicle new / used / demo?</FormLabel>
            <RadioGroup row name="selectNewOrUsed" onChange={(e) => setSelectNewOrUsed(e.target.value)}>
              <FormControlLabel value="new" control={<Radio />} label="New" />
              <FormControlLabel value="used" control={<Radio />} label="Used" />
              <FormControlLabel value="demo" control={<Radio />} label="Demo" />
            </RadioGroup>
          </FormGroup>
        </FormControl>
        {selectNewOrUsed === 'new' && (
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Please enter the mileage at purchase:</FormLabel>
            <TextareaAutosize minRows={3} value={mileageAtPurchase} onChange={(e) => setMileageAtPurchase(e.target.value)} style={{ width: '100%' }} />
          </FormControl>
        )}
        {selectNewOrUsed === 'demo' && (
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Please enter the mileage at purchase:</FormLabel>
            <TextareaAutosize minRows={3} value={mileageAtPurchase} onChange={(e) => setMileageAtPurchase(e.target.value)} style={{ width: '100%' }} />
          </FormControl>
        )}

        <FormControl component="fieldset" margin="normal">
          <FormGroup>
            <FormLabel className='titleStyle'>Are there any modifications, customizations or existing damage?</FormLabel>
            <RadioGroup row name="selectAnyModCusDam" onChange={(e) => setSelectAnyModCusDam(e.target.value)}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormGroup>
        </FormControl>
          
        {selectAnyModCusDam === 'yes' && (
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Please provide details:</FormLabel>
            <TextareaAutosize
              minRows={3}
              value={anyModCusDam}
              onChange={(e) => setAnyModCusDam(e.target.value)}
              style={{ width: '100%' }}
            />
          </FormControl>
        )}

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Do you own winter tires that will be installed November-April?</FormLabel>
          <RadioGroup 
            row name="selectHasWinterTires"
            onChange={(e) => setSelectHasWinterTires(e.target.value)}
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

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Confirm Principal Operator of added vehicle</FormLabel>
        <TextField
          variant="outlined"
          value={principalOperator}
          onChange={(e) => setPrincipalOperator(e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Confirm Occasional Drivers of added vehicle</FormLabel>
        <TextField
          variant="outlined"
          value={occasionalDrivers}
          onChange={(e) => setOccasionalDrivers(e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Vehicle Use</FormLabel>
        <Select labelId="vehicleUse-select-label" id="vehicleUse-select" value={vehicleUse} label="Vehicle Use" onChange={handleVehicleUseChange}>
          <MenuItem value={'Pleasure'}>Pleasure</MenuItem>
          <MenuItem value={'Commute'}>Commute</MenuItem>
          <MenuItem value={'Business'}>Business</MenuItem>
        </Select>
      </FormControl>
      {vehicleUse === 'Pleasure' && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Total annual km driven:</FormLabel>
          <TextField variant="outlined" value={totalAnnualDistance} onChange={(e) => setTotalAnnualDistance(e.target.value)} fullWidth />
        </FormControl>
      )}
      {vehicleUse === 'Commute' && (
        <>
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>1-way commute to work:</FormLabel>
            <TextField variant="outlined" value={oneWayCommuteToWork} onChange={(e) => setOneWayCommuteToWork(e.target.value)} fullWidth />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Total annual km driven:</FormLabel>
            <TextField variant="outlined" value={totalAnnualDistance} onChange={(e) => setTotalAnnualDistance(e.target.value)} fullWidth />
          </FormControl>
        </>
      )}
      {vehicleUse === 'Business' && (
        <>
          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Total annual km driven:</FormLabel>
            <TextField variant="outlined" value={totalAnnualDistance} onChange={(e) => setTotalAnnualDistance(e.target.value)} fullWidth />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel className='titleStyle'>Total business km driven:</FormLabel>
            <TextField variant="outlined" value={totalBusinessDistance} onChange={(e) => setTotalBusinessDistance(e.target.value)} fullWidth />
          </FormControl>
        </>
      )}

      <FormControl component="fieldset" fullWidth margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Ride sharing?</FormLabel>
          <RadioGroup 
            row name="selectRideSharing"
            onChange={(e) => setSelectRideSharing(e.target.value)}
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
          
      {selectRideSharing === 'yes' && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Ensure eligibility! - 
Please note transportation network, names of drivers, number of hours worked and vehicle(s) used:</FormLabel>
          <TextareaAutosize
            minRows={3}
            value={rideSharing}
            onChange={(e) => setRideSharing(e.target.value)}
            style={{ width: '100%' }}
          />
        </FormControl>
      )}

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Food delivery?</FormLabel>
          <RadioGroup 
            row name="selectFoodDelivery"
            onChange={(e) => setSelectFoodDelivery(e.target.value)}
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
      {selectFoodDelivery === 'yes' && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Ensure eligibility! - Note relevant information:</FormLabel>
          <TextareaAutosize
            minRows={3}
            value={foodDelivery}
            onChange={(e) => setFoodDelivery(e.target.value)}
            style={{ width: '100%' }}
          />
        </FormControl>
      )}

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Coverage for Added Vehicle:</FormLabel>
      </FormControl>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <FormControl margin="normal">
            <FormLabel className='titleStyle'>Liability Limit:</FormLabel>
            <Select value={liabilityLimit} label="Liability Limit" onChange={handleLiabilityLimitChange}>
              <MenuItem value={'$1,000,000'}>$1,000,000</MenuItem>
              <MenuItem value={'$2,000,000'}>$2,000,000</MenuItem>
              <MenuItem value={'n/a'}>n/a</MenuItem>
              <MenuItem value={'Not Covered'}>Not Covered</MenuItem>
              <MenuItem value={'Declined'}>Declined</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl margin="normal">
            <FormLabel className='titleStyle'>All Perils Deductible:</FormLabel>
            <Select value={allPerilsDeductible} label="All Perils Deductible" onChange={handleAllPerilsDeductibleChange}>
              <MenuItem value={'$500'}>$500</MenuItem>
              <MenuItem value={'$1,000'}>$1,000</MenuItem>
              <MenuItem value={'n/a'}>n/a</MenuItem>
              <MenuItem value={'Not Covered'}>Not Covered</MenuItem>
              <MenuItem value={'Declined'}>Declined</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl margin="normal">
            <FormLabel className='titleStyle'>Collision Deductible:</FormLabel>
            <Select value={collisionDeductible} label="Collision Deductible" onChange={handleCollisionDeductibleChange}>
              <MenuItem value={'$500'}>$500</MenuItem>
              <MenuItem value={'$1,000'}>$1,000</MenuItem>
              <MenuItem value={'n/a'}>n/a</MenuItem>
              <MenuItem value={'Not Covered'}>Not Covered</MenuItem>
              <MenuItem value={'Declined'}>Declined</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl margin="normal">
            <FormLabel className='titleStyle'>Comprehensive Deductible:</FormLabel>
            <Select value={comprehensiveDeductible} label="Comprehensive Deductible" onChange={handleComprehensiveDeductibleChange}>
              <MenuItem value={'$500'}>$500</MenuItem>
              <MenuItem value={'$1,000'}>$1,000</MenuItem>
              <MenuItem value={'n/a'}>n/a</MenuItem>
              <MenuItem value={'Not Covered'}>Not Covered</MenuItem>
              <MenuItem value={'Declined'}>Declined</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Accident Benefits Buy-ups?</FormLabel>
          <RadioGroup row name="selectAccidentBenefitsBuyUps" onChange={(e) => setSelectAccidentBenefitsBuyUps(e.target.value)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormGroup>
      </FormControl>
      {selectAccidentBenefitsBuyUps === 'yes' && (
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <FormControl margin="normal">
              <FormLabel className='titleStyle'>Income Replacement:</FormLabel>
              <Select value={liabilityLimit} label="Liability Limit" onChange={handleLiabilityLimitChange}>
                <MenuItem value={'Standard'}>Standard</MenuItem>
                <MenuItem value={'$600'}>$600</MenuItem>
                <MenuItem value={'$800'}>$800</MenuItem>
                <MenuItem value={'$1,000'}>$1,000</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl margin="normal">
              <FormLabel className='titleStyle'>Medical, Rehabilitation and Attendant Care:</FormLabel>
              <Select value={allPerilsDeductible} label="All Perils Deductible" onChange={handleAllPerilsDeductibleChange}>
              <MenuItem value={'Standard'}>Standard</MenuItem>
                <MenuItem value={'$130K Non-Catastrophic'}>$130K Non-Catastrophic</MenuItem>
                <MenuItem value={'$1 million All Injuries'}>$1 million All Injuries</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl margin="normal">
              <FormLabel className='titleStyle'>Medical, Rehabilitation and Attendant Care - catastrophic impairment:</FormLabel>
              <Select value={collisionDeductible} label="Collision Deductible" onChange={handleCollisionDeductibleChange}>
                <MenuItem value={'Standard'}>Standard</MenuItem>
                <MenuItem value={'Enhanced'}>Enhanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl margin="normal">
              <FormLabel className='titleStyle'>Caregiver, Housekeeping & Home Maintenance:</FormLabel>
              <Select value={comprehensiveDeductible} label="Comprehensive Deductible" onChange={handleComprehensiveDeductibleChange}>
                <MenuItem value={'Standard'}>Standard</MenuItem>
                <MenuItem value={'Enhanced'}>Enhanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}

      <FormControl fullWidth margin="normal" component="fieldset">
        <FormGroup aria-label="accidentForgiveness" row>
          <FormControlLabel value="accidentForgiveness" control={<Checkbox />} label="Accident Forgiveness (APE)"/>
        </FormGroup>
      </FormControl>

      <FormControl fullWidth margin="normal" component="fieldset">
        <FormGroup aria-label="opcf20" row>
          <FormControlLabel value="opcf20" control={<Checkbox checked={opcf20} onChange={(e) => setOpcf20(e.target.checked)} />} label="OPCF 20"/>
        </FormGroup>
      </FormControl>
      {opcf20 && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Limit:</FormLabel>
          <TextField variant="outlined" value={opcf20Limit} onChange={(e) => setOpcf20Limit(e.target.value)} fullWidth />
        </FormControl>
      )}

      <FormControl fullWidth margin="normal" component="fieldset">
        <FormGroup aria-label="opcf27" row>
          <FormControlLabel value="opcf27" control={<Checkbox checked={opcf27} onChange={(e) => setOpcf27(e.target.checked)} />} label="OPCF 27"/>
        </FormGroup>
      </FormControl>
      {opcf27 && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Limit:</FormLabel>
          <TextField variant="outlined" value={opcf27Limit} onChange={(e) => setOpcf27Limit(e.target.value)} fullWidth />
        </FormControl>
      )}

      <FormControl fullWidth margin="normal" component="fieldset">
        <FormGroup aria-label="opcf43" row>
          <FormControlLabel value="opcf43" control={<Checkbox checked={opcf43} onChange={(e) => setOpcf43(e.target.checked)} />} label="OPCF 43"/>
        </FormGroup>
      </FormControl>
      {opcf43 && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle' style={{color: 'red', fontWeight: 'bold'}}>REMINDER: Confirm Eligibility! Attach the Bill of Sale to the file</FormLabel>
        </FormControl>
      )}

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Note any other coverages here:</FormLabel>
        <TextareaAutosize
          minRows={4}
          value={anyOtherCoverages}
          onChange={(e) => setAnyOtherCoverages(e.target.value)}
          style={{ width: '100%'}}
        />
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Will vehicle addition affect the usage / distances driven or driver assignment on remaining vehicles on the policy?</FormLabel>
          <RadioGroup 
            row name="selectVehicleChangeEffect"
            onChange={(e) => setSelectVehicleChangeEffect(e.target.value)}
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
      {selectVehicleChangeEffect === 'yes' && (
        <FormControl>
          <FormLabel className='titleStyle'>Please note all changes:</FormLabel>
          <TextareaAutosize
            minRows={3}
            value={vehicleChangeEffect}
            onChange={(e) => setVehicleChangeEffect(e.target.value)}
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
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>Reminders: Insured Must be the Registered Owner of the Vehicle. If they aren’t, they will need to be added as a named         insured to the policy, or a new policy is needed</FormLabel>
        <br></br>
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>ATTACH TO FILE:</FormLabel>
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>• Bill of Sale        • Ownership</FormLabel>
        <FormLabel className='titleStyle' style={{fontWeight:'bold'}}>• Proof of Winter Tires        • Emails to and from client</FormLabel>
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