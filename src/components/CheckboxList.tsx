import React, { useState } from 'react';
import TableAddressChange from './TableAddressChange';
import TableNameChange from './TableNameChange';
import TableGeneral from './TableGeneral';
import TableAddingVehicle from './TableAddingVehicle';
import TableSubtractingVehicle from './TableSubtractingVehicle';
import TableRemovingVehicle from './TableRemovingVehicle';
import TableAddingDriver from './TableAddingDriver';
import TableRemovingDriver from './TableRemovingDriver';
import TableAddRemoveAmendInterestedParty from './TableAddRemoveAmendInterestedParty';
import TableAmendCoverage from './TableAmendCoverage';
import TableAmendRatingOrLicenseClass from './TableAmendRatingOrLicenseClass';
import TableAddingDiscount from './TableAddingDiscount';
import './Checkout.css';
import { Container, Typography, Checkbox, Button, Box, FormControlLabel, Grid } from '@mui/material';

// General Note
const GENERATE_NOTE = 'Generate Note';

// Auto Policy Change
const ADDRESS_CHANGE = 'Address Change';
const NAME_CHANGE = 'Name Change';
const ADDING_A_VEHICLE = 'Adding a Vehicle';
const SUBTRACTING_VEHICLE = 'Subtracting a Vehicle';
const REMOVING_VEHICLE = 'Removing a Vehicle';
const ADDING_A_DRIVER = 'Adding a Driver';
const REMOVING_A_DRIVER = 'Removing a Driver';
const ADD_REMOVE_AMEND_INTERESTED_PARTY = 'Add, Remove, Amend Interested Party';
const AMEND_COVERAGE = 'Amend Coverage';
const AMEND_RATING_OR_LICENSE_CLASS = 'Amend Rating or License Class';
const ADDING_DISCOUNT = 'Adding Discount';

// Property Change  
const ADDING_A_NAMED_INSURED = "Adding a Named Insured";
const ADDING_OR_SUBBING_A_LOCATION_HOMEOWNERS = "Adding or Subbing a Location - Homeowners";
const ADDING_OR_SUBBING_A_LOCATION_CONDO = "Adding or Subbing a Location - Condo"; 
const ADDING_OR_SUBBING_A_LOCATION_TENATNS = "Adding or Subbing a Location - Tenants"; 
const REMOVING_A_LOCATION = "Removing a Location";
const AMEND_COVERAGE_PROPERTY = 'Amend Coverage Property';
const ADD_REMOVE_AMEND_MORTAGEE = "Add, Remove, Amend Mortgagee"; 
const ADD_DISCOUNT = "Add Discount";

const CheckBoxList: React.FC = () => {

    const items = {
      [GENERATE_NOTE]: false,
      [ADDRESS_CHANGE]: false,
      [NAME_CHANGE]: false,
      [ADDING_A_VEHICLE]: false,
      [SUBTRACTING_VEHICLE]: false,
      [REMOVING_VEHICLE]: false,
      [ADDING_A_DRIVER]: false,
      [REMOVING_A_DRIVER]: false,
      [ADD_REMOVE_AMEND_INTERESTED_PARTY]: false,
      [AMEND_COVERAGE]: false,
      [AMEND_RATING_OR_LICENSE_CLASS]: false,
      [ADDING_DISCOUNT]: false,
      
      [ADDING_A_NAMED_INSURED]: false,
      [ADDING_OR_SUBBING_A_LOCATION_HOMEOWNERS]: false,
      [ADDING_OR_SUBBING_A_LOCATION_CONDO]: false,
      [ADDING_OR_SUBBING_A_LOCATION_TENATNS]: false,
      [REMOVING_A_LOCATION]: false,
      [AMEND_COVERAGE_PROPERTY]: false,
      [ADD_REMOVE_AMEND_MORTAGEE]: false,
      [ADD_DISCOUNT]: false
    };
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(items);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const handleCheckboxChange = (item: string) => {
      const updatedChecked = !checkedItems[item];
      setCheckedItems(prev => ({
        ...prev,
        [item]: updatedChecked
      }));
      // If the checkbox is unchecked, also set the selectedItemId to null
      if (!updatedChecked) {
        setSelectedItemId(null);
      }
    };
    
    const handleEditClick = (id: string) => {
      setSelectedItemId(id);
    };

    const handleResetAll = () => {
      // Clear local storage
      localStorage.clear();

      // Reset checked items and selected item ID
      setCheckedItems(items);
      setSelectedItemId(null);
    };

    const renderTable = (itemId: string) => {
        switch (itemId) {
            case GENERATE_NOTE:
                return <TableGeneral itemId="general" />;
            case ADDRESS_CHANGE:
                return <TableAddressChange itemId="addressChange" />;
            case NAME_CHANGE:
                return <TableNameChange itemId="nameChange" />;
            case ADDING_A_VEHICLE:
                return <TableAddingVehicle itemId="addingAVehicle" />;
            case SUBTRACTING_VEHICLE:
                return <TableSubtractingVehicle itemId="subtractingVehicle" />;
            case REMOVING_VEHICLE:
                return <TableRemovingVehicle itemId="removingVehicle" />;
            case ADDING_A_DRIVER:
                return <TableAddingDriver itemId="addingADriver" />;
            case REMOVING_A_DRIVER:
                return <TableRemovingDriver itemId="removingADriver" />;
            case ADD_REMOVE_AMEND_INTERESTED_PARTY:
                return <TableAddRemoveAmendInterestedParty itemId="addRemoveAmendInterestedParty" />;
            case AMEND_COVERAGE:
                return <TableAmendCoverage itemId="amendCoverage" />;
            case AMEND_RATING_OR_LICENSE_CLASS:
                return <TableAmendRatingOrLicenseClass itemId="amendRatingOrLicenseClass" />;
            case ADDING_DISCOUNT:
                return <TableAddingDiscount itemId="addingDiscount" />;
            default:
           return <Typography variant="h5" sx={{ color: 'blue', textAlign: 'center' }}>Work in progress...</Typography>;
        }
    };

    return (
      <Container maxWidth="xl" sx={{ marginTop: 2 }}>
        <Grid container spacing={3} justifyContent="center" sx={{ boxShadow: 5, paddingBottom: '20px' }}> 
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom marginTop='30px'>
              General Note Change
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[GENERATE_NOTE]} onChange={() => handleCheckboxChange(GENERATE_NOTE)} id="checkbox-generate-note" />}
                  label={GENERATE_NOTE}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[GENERATE_NOTE]} onClick={() => handleEditClick(GENERATE_NOTE)}>
                    Edit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        <br></br><br></br>
        <Grid container spacing={3} justifyContent="center" sx={{ boxShadow: 5, paddingBottom: '20px' }}> 
          <Grid item xs={6} >
            <Typography variant="h4" gutterBottom marginTop='25px'>
              Auto Policy Change
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[ADDRESS_CHANGE]} onChange={() => handleCheckboxChange(ADDRESS_CHANGE)} id="checkbox-address-change" />}
                  label={ADDRESS_CHANGE}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[ADDRESS_CHANGE]} onClick={() => handleEditClick(ADDRESS_CHANGE)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[NAME_CHANGE]} onChange={() => handleCheckboxChange(NAME_CHANGE)} id="checkbox-name-change" />}
                  label={NAME_CHANGE}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[NAME_CHANGE]} onClick={() => handleEditClick(NAME_CHANGE)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[ADDING_A_VEHICLE]} onChange={() => handleCheckboxChange(ADDING_A_VEHICLE)} id="checkbox-name-change" />}
                  label={ADDING_A_VEHICLE}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[ADDING_A_VEHICLE]} onClick={() => handleEditClick(ADDING_A_VEHICLE)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[SUBTRACTING_VEHICLE]} onChange={() => handleCheckboxChange(SUBTRACTING_VEHICLE)} id="checkbox-name-change" />}
                  label={SUBTRACTING_VEHICLE}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[SUBTRACTING_VEHICLE]} onClick={() => handleEditClick(SUBTRACTING_VEHICLE)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[REMOVING_VEHICLE]} onChange={() => handleCheckboxChange(REMOVING_VEHICLE)} id="checkbox-removing-vehicle" />}
                  label={REMOVING_VEHICLE}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[REMOVING_VEHICLE]} onClick={() => handleEditClick(REMOVING_VEHICLE)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[ADDING_A_DRIVER]} onChange={() => handleCheckboxChange(ADDING_A_DRIVER)} id="checkbox-removing-vehicle" />}
                  label={ADDING_A_DRIVER}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[ADDING_A_DRIVER]} onClick={() => handleEditClick(ADDING_A_DRIVER)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[REMOVING_A_DRIVER]} onChange={() => handleCheckboxChange(REMOVING_A_DRIVER)} id="checkbox-removing-vehicle" />}
                  label={REMOVING_A_DRIVER}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[REMOVING_A_DRIVER]} onClick={() => handleEditClick(REMOVING_A_DRIVER)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[ADD_REMOVE_AMEND_INTERESTED_PARTY]} onChange={() => handleCheckboxChange(ADD_REMOVE_AMEND_INTERESTED_PARTY)} id="checkbox-removing-vehicle" />}
                  label={ADD_REMOVE_AMEND_INTERESTED_PARTY}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[ADD_REMOVE_AMEND_INTERESTED_PARTY]} onClick={() => handleEditClick(ADD_REMOVE_AMEND_INTERESTED_PARTY)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[AMEND_COVERAGE]} onChange={() => handleCheckboxChange(AMEND_COVERAGE)} id="checkbox-removing-vehicle" />}
                  label={AMEND_COVERAGE}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[AMEND_COVERAGE]} onClick={() => handleEditClick(AMEND_COVERAGE)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[AMEND_RATING_OR_LICENSE_CLASS]} onChange={() => handleCheckboxChange(AMEND_RATING_OR_LICENSE_CLASS)} id="checkbox-removing-vehicle" />}
                  label={AMEND_RATING_OR_LICENSE_CLASS}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[AMEND_RATING_OR_LICENSE_CLASS]} onClick={() => handleEditClick(AMEND_RATING_OR_LICENSE_CLASS)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[ADDING_DISCOUNT]} onChange={() => handleCheckboxChange(ADDING_DISCOUNT)} id="checkbox-removing-vehicle" />}
                  label={ADDING_DISCOUNT}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[ADDING_DISCOUNT]} onClick={() => handleEditClick(ADDING_DISCOUNT)}>
                    Edit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid> 
          <Grid item xs={6} >
            <Typography variant="h4" gutterBottom marginTop='25px'>
              Property Policy Change
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[ADDING_A_NAMED_INSURED]} onChange={() => handleCheckboxChange(ADDING_A_NAMED_INSURED)} id="checkbox-adding-a-named-insured" />}
                  label={ADDING_A_NAMED_INSURED}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[ADDING_A_NAMED_INSURED]} onClick={() => handleEditClick(ADDING_A_NAMED_INSURED)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[ADDING_OR_SUBBING_A_LOCATION_HOMEOWNERS]} onChange={() => handleCheckboxChange(ADDING_OR_SUBBING_A_LOCATION_HOMEOWNERS)} id="checkbox-adding-or-subbing-a-location-homeowners" />}
                  label={ADDING_OR_SUBBING_A_LOCATION_HOMEOWNERS}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[ADDING_OR_SUBBING_A_LOCATION_HOMEOWNERS]} onClick={() => handleEditClick(ADDING_OR_SUBBING_A_LOCATION_HOMEOWNERS)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[ADDING_OR_SUBBING_A_LOCATION_CONDO]} onChange={() => handleCheckboxChange(ADDING_OR_SUBBING_A_LOCATION_CONDO)} id="checkbox-adding-or-subbing-a-location-condo" />}
                  label={ADDING_OR_SUBBING_A_LOCATION_CONDO}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[ADDING_OR_SUBBING_A_LOCATION_CONDO]} onClick={() => handleEditClick(ADDING_OR_SUBBING_A_LOCATION_CONDO)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[ADDING_OR_SUBBING_A_LOCATION_TENATNS]} onChange={() => handleCheckboxChange(ADDING_OR_SUBBING_A_LOCATION_TENATNS)} id="checkbox-adding-or-subbing-a-location-tenants" />}
                  label={ADDING_OR_SUBBING_A_LOCATION_TENATNS}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[ADDING_OR_SUBBING_A_LOCATION_TENATNS]} onClick={() => handleEditClick(ADDING_OR_SUBBING_A_LOCATION_TENATNS)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[REMOVING_A_LOCATION]} onChange={() => handleCheckboxChange(REMOVING_A_LOCATION)} id="checkbox-removing-a-location" />}
                  label={REMOVING_A_LOCATION}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[REMOVING_A_LOCATION]} onClick={() => handleEditClick(REMOVING_A_LOCATION)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[AMEND_COVERAGE_PROPERTY]} onChange={() => handleCheckboxChange(AMEND_COVERAGE_PROPERTY)} id="checkbox-amend-coverage" />}
                  label={AMEND_COVERAGE_PROPERTY}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[AMEND_COVERAGE_PROPERTY]} onClick={() => handleEditClick(AMEND_COVERAGE_PROPERTY)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[ADD_REMOVE_AMEND_MORTAGEE]} onChange={() => handleCheckboxChange(ADD_REMOVE_AMEND_MORTAGEE)} id="checkbox-add-remove-amend-mortagee" />}
                  label={ADD_REMOVE_AMEND_MORTAGEE}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[ADD_REMOVE_AMEND_MORTAGEE]} onClick={() => handleEditClick(ADD_REMOVE_AMEND_MORTAGEE)}>
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
                <FormControlLabel
                  control={<Checkbox checked={checkedItems[ADD_DISCOUNT]} onChange={() => handleCheckboxChange(ADD_DISCOUNT)} id="checkbox-add-discount" />}
                  label={ADD_DISCOUNT}
                  sx={{ flexGrow: 1, marginRight: 10 }}
                />
                <Box sx={{ width: '100px', textAlign: 'left' }}>
                  <Button variant="outlined" disabled={!checkedItems[ADD_DISCOUNT]} onClick={() => handleEditClick(ADD_DISCOUNT)}>
                    Edit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <br />
        <Button variant="contained" color="primary" onClick={handleResetAll} sx={{ margintop: 2 }}>
          Reset All
        </Button>
        {selectedItemId && (
          <>
            <Typography variant="h5" gutterBottom sx={{ marginTop: 2, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
              {selectedItemId}
            </Typography>
            {renderTable(selectedItemId)}
          </>
        )}
      </Container>
    );
};

export default CheckBoxList;
