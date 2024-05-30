import Checkout from './components/Checkout';
import CheckoutGeneral from './components/CheckoutGeneral';
import { Container } from '@mui/material';

function App() {

  const generalNoteItems = [
    'Generate Note - done'
  ];

  const autoPolicyItems = [
    '0 - Address Change - done',
    '1 - Name Change',
    '2 - Adding a Vehicle',
    '3 - Substituting a Vehicle',
    '4 - Removing a Vehicle - done',
    '5 - Adding a Driver',
    '6 - Removing a Driver',
    '7 - Add, Remove, Amend Interested Party',
    '8 - Amend Coverage',
    '9 - Amend Rating or License Class',
    '10 - Adding Discount',
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
