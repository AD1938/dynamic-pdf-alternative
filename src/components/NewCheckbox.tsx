import React, { useState } from 'react';
import ItemTableAddressChange from './ItemTableAddressChange';
import ItemTableNameChange from './ItemTableNameChange';
import ItemTableGeneral from './ItemTableGeneral';
import ItemTableRemovingVehicle from './ItemTableRemovingVehicle';
import './Checkout.css';
import { Container, Typography, Checkbox, Button, Box, FormControlLabel } from '@mui/material';

const items = {
  'Generate Note - done': false,
  'Name Change - done': false,
  'Address Change - done': false,
  'Removing a Vehicle - done': false,
};

const NewCheckBox: React.FC = () => {

    const initialCheckedState =  {
      'Generate Note - done': false,
      'Name Change - done': false,
      'Address Change - done': false,
      'Removing a Vehicle - done': false,
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
            case 'Generate Note - done':
                return <ItemTableGeneral itemId="general" />;
            case 'Address Change - done':
                return <ItemTableAddressChange itemId="addressChange" />;
            case 'Name Change - done':
                return <ItemTableNameChange itemId="nameChange" />;
            case 'Removing a Vehicle - done':
                return <ItemTableRemovingVehicle itemId="removingVehicle" />;
            default:
           return <div>Item not found.</div>;
        }
    };

    return (
      <Container maxWidth="md" sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleResetAll} sx={{ marginBottom: 2 }}>
                Reset All
        </Button>
        <Typography variant="h4" gutterBottom marginTop='30px'>
          General Note Change
        </Typography>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
            <FormControlLabel
              control={<Checkbox checked={checkedItems['Generate Note - done']} onChange={() => handleCheckboxChange('Generate Note - done')} id="checkbox-generate-note" />}
              label="Generate Note - done"
              sx={{ flexGrow: 1, marginRight: 10 }}
            />
            <Box sx={{ width: '100px', textAlign: 'center' }}>
              <Button variant="outlined" disabled={!checkedItems['Generate Note - done']} onClick={() => handleEditClick('Generate Note - done')}>
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
              control={<Checkbox checked={checkedItems['Address Change - done']} onChange={() => handleCheckboxChange('Address Change - done')} id="checkbox-address-change" />}
              label="Address Change - done"
              sx={{ flexGrow: 1, marginRight: 10 }}
            />
            <Box sx={{ width: '100px', textAlign: 'center' }}>
              <Button variant="outlined" disabled={!checkedItems['Address Change - done']} onClick={() => handleEditClick('Address Change - done')}>
                Edit
              </Button>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
            <FormControlLabel
              control={<Checkbox checked={checkedItems['Name Change - done']} onChange={() => handleCheckboxChange('Name Change - done')} id="checkbox-name-change" />}
              label="Name Change - done"
              sx={{ flexGrow: 1, marginRight: 10 }}
            />
            <Box sx={{ width: '100px', textAlign: 'center' }}>
              <Button variant="outlined" disabled={!checkedItems['Name Change - done']} onClick={() => handleEditClick('Name Change - done')}>
                Edit
              </Button>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
            <FormControlLabel
              control={<Checkbox checked={checkedItems['Removing a Vehicle - done']} onChange={() => handleCheckboxChange('Removing a Vehicle - done')} id="checkbox-removing-vehicle" />}
              label="Removing a Vehicle - done"
              sx={{ flexGrow: 1, marginRight: 10 }}
            />
            <Box sx={{ width: '100px', textAlign: 'center' }}>
              <Button variant="outlined" disabled={!checkedItems['Removing a Vehicle - done']} onClick={() => handleEditClick('Removing a Vehicle - done')}>
                Edit
              </Button>
            </Box>
          </Box>
        </Box>
        {selectedItemId && (
          <>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 2, color: 'red', fontWeight: 'bold' }}>
              Editing: {selectedItemId}
            </Typography>
            {renderTable(selectedItemId)}
          </>
        )}
      </Container>
    );
};

export default NewCheckBox;
