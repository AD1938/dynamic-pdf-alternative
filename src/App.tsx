import Checkout from './components/Checkout';

function App() {

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
    'UI Test'
  ];
  return (
    <>
      <header className="checkout-header">
        <img src="https://wellcareinsurance.ca/wp-content/uploads/2021/05/cropped-cropped-cropped-well-care-log1-e1622044439563.jpg" alt="Logo" className="logo"/>
        <nav className="menu">
          <label className="menu-label">WellCare Gen AI</label>
        </nav>
      </header>
      <div style={{ height: '50px' }}></div>
     <Checkout items={autoPolicyItems}/>

    </>
  )
}

export default App
