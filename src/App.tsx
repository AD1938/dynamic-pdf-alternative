import Checkout from './components/Checkout';

function App() {

  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
];
  return (
    <>
     <Checkout items={items}/>
    </>
  )
}

export default App
