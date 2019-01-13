import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

/** Smoke test for testing rendering of the App component. */
it('renders without crashing', () => {
  const div: HTMLDivElement = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
