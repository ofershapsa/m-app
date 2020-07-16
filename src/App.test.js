import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AddClient from './AddClient';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
  ReactDOM.render(<AddClient />, div);
  ReactDOM.unmountComponentAtNode(div);
});
