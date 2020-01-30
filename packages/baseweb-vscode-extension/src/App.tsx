import * as React from 'react';
import {LightTheme} from './baseui/themes';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{(LightTheme as any).colors.primaryB}</h1>
        </header>
        <p className="App-intro">
          To get sssstarted, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
