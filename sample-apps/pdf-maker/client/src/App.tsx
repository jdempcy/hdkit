import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormPDFMaker } from "./FormPDFMaker";
import Fade from "@material-ui/core/Fade";



function App() {

  return (
    <div className="App">
      <div>
        <FormPDFMaker />
      </div>
      <footer className="App-footer">
      <p>
        Welcome to the Everyone Is Different PDF Maker.
      </p>
      <Fade in={true} timeout={9000}>
        <p>🙈 And... monkeys! 🙉 </p>
      </Fade>
        <img src={logo} className="App-logo" alt="logo" />
      </footer>
    </div>
  );
}

export default App;
