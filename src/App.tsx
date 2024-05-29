import Checkout from './components/Checkout';
import CheckoutGeneral from './components/CheckoutGeneral';
import { Container } from '@mui/material';

function App() {

  const generalNoteItems = [
    'Generate Note'
  ];

  const autoPolicyItems = [
    'Address Change',
    'Name Change',
    'Adding a Vehicle',
    'Substituting a Vehicle',
    'Removing a Vehicle',
    'Adding a Driver',
    'Removing a Driver',
    'Add, Remove, Amend Interested Party',
    'Amend Coverage',
    'Amend Rating or License Class',
    'Adding Discount',
    // 'UI Test'
  ];
  return (
    <>
      <Container>
        <header className="checkout-header">
          <img src="https://wellcareinsurance.ca/wp-content/uploads/2021/05/cropped-cropped-cropped-well-care-log1-e1622044439563.jpg" alt="Logo" className="logo"/>
          <nav className="menu">
            <label className="menu-label">WellCare Gen AI</label>
          </nav>
        </header>
        <CheckoutGeneral items={generalNoteItems}/>
        <Checkout items={autoPolicyItems}/>
      </Container>
    </>
  )
}

export default App
