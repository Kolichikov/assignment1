import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Setup from './ReducersCreators';
import Init from './init';
import { Provider } from 'react-redux';
new Init();

ReactDOM.render(
    <Provider store={Init.store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
new Setup();
registerServiceWorker();
