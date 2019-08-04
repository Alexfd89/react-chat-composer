import React, { Component } from 'react';
import './styles';
import Composer from './components/Composer';

class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>

        </div>
        <Composer />
      </div>
    )
  }
}

export default App;
