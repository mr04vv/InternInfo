import React from 'react';
import Top from './scenes/Top/Top';
import { Provider } from "react-redux";
import configureStore from "./redux";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <header className="App-header">
      <Top/>
      </header>
    </div>
    </Provider>
  );
}

export default App;
