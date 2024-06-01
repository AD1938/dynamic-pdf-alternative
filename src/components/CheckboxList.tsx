import React, { useState } from 'react';
import ItemTableAddressChange from './TableAddressChange';
import TableNameChange from './TableNameChange';
import TableGeneral from './TableGeneral';
import TableRemovingVehicle from './TableRemovingVehicle';
import './Checkout.css';
import { Container, Typography, Checkbox, Button, Box, FormControlLabel } from '@mui/material';

const GENERATE_NOTE = 'Generate Note';
const ADDRESS_CHANGE = 'Address Change';
const NAME_CHANGE = 'Name Change';
const REMOVING_VEHICLE = 'Removing a Vehicle';

const items = {
  [GENERATE_NOTE]: false,
  [ADDRESS_CHANGE]: false,
  [NAME_CHANGE]: false,
  [REMOVING_VEHICLE]: false,
};

const CheckBoxList: React.FC = () => {

    const initialCheckedState =  {
      [GENERATE_NOTE]: false,
      [ADDRESS_CHANGE]: false,
      [NAME_CHANGE]: false,
      [REMOVING_VEHICLE]: false,
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
                return <ItemTableAddressChange itemId="addressChange" />;
            case NAME_CHANGE:
                return <TableNameChange itemId="nameChange" />;
            case REMOVING_VEHICLE:
                return <TableRemovingVehicle itemId="removingVehicle" />;
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
        </Box>
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
