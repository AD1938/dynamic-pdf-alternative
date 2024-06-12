import CheckBoxList from './components/CheckboxList';
import { Container } from '@mui/material';

function App() {

  return (
    <>
       <Container>
        <header className="checkout-header">
          <a href="https://wellcareinsurance.ca" target="_blank" rel="noopener noreferrer">
            <img src="https://wellcareinsurance.ca/wp-content/uploads/2021/05/cropped-cropped-cropped-well-care-log1-e1622044439563.jpg" alt="Logo" className="logo"/>
          </a>
          <nav className="menu">
            <label className="menu-label">WellCare Gen AI</label>
          </nav>
        </header>
        <CheckBoxList />
      </Container> 
    </>
  )
}

export default App
