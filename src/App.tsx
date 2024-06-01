import NewCheckBox from './components/NewCheckbox';
import { Container } from '@mui/material';

function App() {

  return (
    <>
       <Container>
        <header className="checkout-header">
          <img src="https://wellcareinsurance.ca/wp-content/uploads/2021/05/cropped-cropped-cropped-well-care-log1-e1622044439563.jpg" alt="Logo" className="logo"/>
          <nav className="menu">
            <label className="menu-label">WellCare Gen AI</label>
          </nav>
        </header>
        <NewCheckBox />
      </Container> 
    </>
  )
}

export default App
