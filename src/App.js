import React from 'react';
import './App.css';
import OnboardForm from './Form';

function App() {

  return (
    <div className="App">
      <header className="App-header" />
        <h1>Formik. Formerly McForm&reg;.</h1>
        <h2>All your form are belong to us.</h2>
        <div className="flex-container">
          <OnboardForm/>
        </div>
    </div>
  );
}

export default App;
