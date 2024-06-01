import React, { useState } from 'react';
import ItemTable0 from './TableAddressChange';
import ItemTable1 from './TableNameChange';
import ItemTable2 from './ItemTable2';
import ItemTable4 from './TableRemovingVehicle';
import UITest from './UITest';
import NotExist from './NotExist';
import './Checkout.css';
import { Container, Typography, Checkbox, FormControlLabel, Button, Box } from '@mui/material';

interface CheckoutProps {
  items: string[];
}

const CheckoutProperty: React.FC<CheckoutProps> = ({ items }) => {
    const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(items.length).fill(false));
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const handleCheckboxChange = (index: number) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
        if (!updatedCheckedItems[index]) {
            setSelectedItemId(null);
        }
    };

    const handleEditClick = (index: number) => {
        const itemId = `Item ${index + 1}`;
        setSelectedItemId(itemId);
    };

    const renderTable = (itemId: string) => {
        const index = parseInt(itemId.split(' ')[1]) - 1;
        if (index === 0) {
            return <ItemTable0 itemId={itemId} />;
        } else if (index === 1) {
            return <ItemTable1 itemId={itemId} />;
        } else if (index === 2) {
            return <ItemTable2 itemId={itemId} />;
        } else if (index === 4) {
            return <ItemTable4 itemId={itemId} />;
        } else if (index === 11) {
            return <UITest itemId={itemId} />;
        } else {
            return <NotExist />;
        }
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: 2 }}>
            <Typography variant="h4" gutterBottom>
                Property Policy Change
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {items.map((item, index) => (
                    <Box key={index} display="flex" alignItems="center" sx={{ 
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkedItems[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                    id={`checkbox-${index}`}
                                />
                            }
                            label={item}
                            sx={{ flexGrow: 1, marginRight: 10 }}
                        />
                        <Box sx={{ width: '100px', textAlign: 'center' }}>
                            <Button
                                variant="outlined"
                                disabled={!checkedItems[index]}
                                onClick={() => handleEditClick(index)}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>
            {selectedItemId && renderTable(selectedItemId)}
        </Container>
    );
};

export default CheckoutProperty;
