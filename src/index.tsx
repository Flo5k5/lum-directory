import * as React from 'react';
import * as ReactDOM from 'react-dom';
import fontAwesome from 'src/themes/icon-library';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

registerServiceWorker();

// Load fontAwesome Library
fontAwesome.init();
