import logo from './logo.svg';
import './App.css';
import Sudoku from './components/Sudoku';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    document.body.focus();
  },[]);

  return (
    <div className="App">
      <Sudoku/>
    </div>
  );
}

export default App;
