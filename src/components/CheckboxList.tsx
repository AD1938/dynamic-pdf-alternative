import React, { useState } from 'react';
import TableAddressChange from './TableAddressChange';
import TableNameChange from './TableNameChange';
import TableGeneral from './TableGeneral';
import TableAddingVehicle from './TableAddingVehicle';
import TableSubtractingVehicle from './TableSubtractingVehicle';
import TableRemovingVehicle from './TableRemovingVehicle';
import TableAddingDriver from './TableAddingDriver';
import TableRemovingDriver from './TableRemovingDriver';
import './Checkout.css';
import { Container, Typography, Checkbox, Button, Box, FormControlLabel } from '@mui/material';

const GENERATE_NOTE = 'Generate Note';
const ADDRESS_CHANGE = 'Address Change';
const NAME_CHANGE = 'Name Change';
const ADDING_A_VEHICLE = 'Adding a Vehicle';
const SUBTRACTING_VEHICLE = 'Subtracting a Vehicle';
const REMOVING_VEHICLE = 'Removing a Vehicle';
const ADDING_A_DRIVER = 'Adding a Driver';
const REMOVING_A_DRIVER = 'Removing a Driver - in progress';

const items = {
  [GENERATE_NOTE]: false,
  [ADDRESS_CHANGE]: false,
  [NAME_CHANGE]: false,
  [ADDING_A_VEHICLE]: false,
  [SUBTRACTING_VEHICLE]: false,
  [REMOVING_VEHICLE]: false,
  [ADDING_A_DRIVER]: false,
  [REMOVING_A_DRIVER]: false,
};

const CheckBoxList: React.FC = () => {

    const initialCheckedState =  {
      [GENERATE_NOTE]: false,
      [ADDRESS_CHANGE]: false,
      [NAME_CHANGE]: false,
      [ADDING_A_VEHICLE]: false,
      [SUBTRACTING_VEHICLE]: false,
      [REMOVING_VEHICLE]: false,
      [ADDING_A_DRIVER]: false,
      [REMOVING_A_DRIVER]: false,
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
      setCheckedItems(initialCheckedState);
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
            default:
           return <div>Item not found.</div>;
        }
    };

    return (
      <Container maxWidth="md" sx={{ marginTop: 2 }}>
        {/* <Button variant="contained" color="primary" onClick={handleResetAll} sx={{ marginBottom: 2 }}>
                Reset All
        </Button> */}
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
            <Box sx={{ width: '100px', textAlign: 'center' }}>
              <Button variant="outlined" disabled={!checkedItems[GENERATE_NOTE]} onClick={() => handleEditClick(GENERATE_NOTE)}>
                Edit
              </Button>
            </Box>
          </Box>
        </Box>
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
            <Box sx={{ width: '100px', textAlign: 'center' }}>
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
            <Box sx={{ width: '100px', textAlign: 'center' }}>
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
            <Box sx={{ width: '100px', textAlign: 'center' }}>
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
            <Box sx={{ width: '100px', textAlign: 'center' }}>
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
            <Box sx={{ width: '100px', textAlign: 'center' }}>
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
            <Box sx={{ width: '100px', textAlign: 'center' }}>
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
            <Box sx={{ width: '100px', textAlign: 'center' }}>
              <Button variant="outlined" disabled={!checkedItems[REMOVING_A_DRIVER]} onClick={() => handleEditClick(REMOVING_A_DRIVER)}>
                Edit
              </Button>
            </Box>
          </Box>
        </Box>

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
