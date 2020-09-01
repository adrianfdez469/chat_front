import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {RecoilRoot} from 'recoil';
import { BrowserRouter } from 'react-router-dom';
//import 'typeface-roboto';
//import 'fontsource-roboto';
//import "fontsource-roboto/300.css"
//import "fontsource-roboto/400.css"
//import "fontsource-roboto/500.css"
//import "fontsource-roboto/700.css"

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>      
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
serviceWorker.register();
