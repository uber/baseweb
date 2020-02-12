import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from '@sprinklr/spaceweb';
import {Button} from '@sprinklr/spaceweb/button';
import {Avatar} from '@sprinklr/spaceweb/avatar';

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <Button onClick={() => alert('click')}>Hello</Button>
            <Avatar name="Hello?" />
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
