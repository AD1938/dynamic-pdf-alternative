import React, { useEffect, useState } from 'react';
import './Table.css';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, TextareaAutosize, FormGroup, Grid, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box
} from '@mui/material';

interface ItemTableProps {
  itemId: string;
}

interface NewDriver {
  name: string;
  insuranceCarrier: string;
  policyNumber: string;
}

const TableAddingVehicle: React.FC<ItemTableProps> = ({ itemId }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState('');
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [vin, setVIN] = useState('');
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
    
    const [selectAddressChangeDriverEffect, setSelectAddressChangeDriverEffect] = useState('');
    const [addressChangeDriverEffect, setAddressChangeDriverEffect] = useState('');
    const [selectNewDrivers, setSelectNewDrivers] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [newDrivers, setNewDrivers] = useState<NewDriver[]>([]);
    const [noNewDriverEffect, setNoNewDriverEffect] = useState('');
    const [newDriverAdded, setNewDriverAdded] = useState(false);
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

        setSelectAddressChangeDriverEffect(savedData.selectAddressChangeDriverEffect || '');
        setAddressChangeDriverEffect(savedData.addressChangeDriverEffect || '');
        setAdditionalNotes(savedData.additionalNotes || '');
        setSelectNewDrivers(savedData.selectNewDrivers || '');
        setNewDrivers(savedData.newDrivers || []);
        setNoNewDriverEffect(savedData.noNewDriverEffect || '');
        setNewDriverAdded(savedData.newDrivers && savedData.newDrivers.length > 0);
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

        selectNewDrivers,
        selectAddressChangeDriverEffect,
        addressChangeDriverEffect,
        additionalNotes,
        newDrivers,
        noNewDriverEffect
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
      setSelectNewDrivers(value);
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
        let message = `Who called/emailed and when: ${displayName} at ` + new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ' on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        message += `\nEffective Date of Address Change: ${selectedEffectiveDate}`;
        message += `\nNew Address: ${year}`;
        
        message += `\nWill this address change affect the usage and distance driven of any of the vehicles on the policy: ${selectAnyModCusDam}`;
        if (selectAnyModCusDam === 'yes') {
            message += `\nChange to use and distance driven: ${anyModCusDam}`;
        }

        message += `\nAre there any new drivers in the household: ${selectNewDrivers}`;
        if (selectNewDrivers === 'yes') {
            message += `\nNew Drivers:\n${newDriversString}`;
        } else {
            message += `\nDetails as to why driver not being added: ${noNewDriverEffect}`;
        }
        message += `\n`;
        message += `\nWill the address change affect driver assignment on any of the vehicles: ${selectAddressChangeDriverEffect}`;
        if (selectAddressChangeDriverEffect === 'yes') {
            message += `\nPlease note any changes to driver assignment for all vehicles listed on the policy: ${addressChangeDriverEffect}`;
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
      setSelectedEffectiveDate('');
      setYear('');
      setSelectAnyModCusDam('');
      setAnyModCusDam('');
      setSelectAddressChangeDriverEffect('');
      setAddressChangeDriverEffect('');
      setAdditionalNotes('');
      setSelectNewDrivers('');
      setNewDrivers([]);
      setNoNewDriverEffect('');
      setNewDriverAdded(false);
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
          <FormLabel className='titleStyle'>Effective date of address change:</FormLabel>
          <TextField
            type="date"
            variant="outlined"
            value={selectedEffectiveDate.split('T')[0]}
            onChange={(e) => setSelectedEffectiveDate(e.target.value)}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Vehicle being added:</FormLabel>
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
      <Grid container spacing={3}>
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

      <FormControl fullWidth margin="normal">
        <FormLabel className='titleStyle'>Are there any new drivers in the household?</FormLabel>
        <RadioGroup 
          row name="selectNewDrivers"
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
      
      {selectNewDrivers === 'no' && (
        <FormControl fullWidth margin="normal">
          <FormLabel className='titleStyle'>Details as to why driver not being added:</FormLabel>
          <TextareaAutosize
            minRows={3}
            value={noNewDriverEffect}
            onChange={(e) => setNoNewDriverEffect(e.target.value)}
            style={{ width: '100%' }}
          />
        </FormControl>
      )}
      
      {newDriverAdded && (
             <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
             <Table>
               <TableHead>
                 <TableRow>
                   <TableCell>New Driver Name</TableCell>
                   <TableCell>Insurance Carrier</TableCell>
                   <TableCell>Policy Number</TableCell>
                   <TableCell>Action</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {newDrivers.map((driver, index) => (
                   <TableRow key={index}>
                     <TableCell>
                       <TextField
                         fullWidth
                         variant="outlined"
                         value={driver.name}
                         onChange={(e) => handleDriverChange(index, 'name', e.target.value)}
                       />
                     </TableCell>
                     <TableCell>
                       <TextField
                         fullWidth
                         variant="outlined"
                         value={driver.insuranceCarrier}
                         onChange={(e) => handleDriverChange(index, 'insuranceCarrier', e.target.value)}
                       />
                     </TableCell>
                     <TableCell>
                       <TextField
                         fullWidth
                         variant="outlined"
                         value={driver.policyNumber}
                         onChange={(e) => handleDriverChange(index, 'policyNumber', e.target.value)}
                       />
                     </TableCell>
                     <TableCell>
                       <Button
                         color="error"
                         variant="contained"
                         onClick={() => handleRemoveDriver(index)}
                       >
                         Remove
                       </Button>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
             <Button
              variant="contained"
              color="primary"
              onClick={handleAddDriver}
              style={{ marginTop: '10px' }}
             >
              Add New Driver
            </Button> 
           </TableContainer>
        )}

      <FormControl component="fieldset" margin="normal">
        <FormGroup>
          <FormLabel className='titleStyle'>Will this address change affect driver assignment on any of the vehicles?</FormLabel>
          <RadioGroup 
            row name="selectAddressChangeDriverEffect"
            onChange={(e) => setSelectAddressChangeDriverEffect(e.target.value)}
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
          
      {selectAddressChangeDriverEffect === 'yes' && (
        <FormControl>
          <FormLabel className='titleStyle'>Please note any changes to driver assignment for all vehicles listed on the policy:</FormLabel>
          <TextareaAutosize
            minRows={3}
            value={addressChangeDriverEffect}
            onChange={(e) => setAddressChangeDriverEffect(e.target.value)}
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

export default TableAddingVehicle;