import React, { Component } from 'react';
import './styles';
// import UserInput from './components/UserInput';
// import Input from './components/Input/Input';
import Input2 from './components/Input2';

class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>

        </div>
        <Input2 />
      </div>
    )
  }
}

export default App
