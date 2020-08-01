import React from 'react';
import {RecoilRoot} from 'recoil';

import Login from './components/login/login';
import Chat from './components/chat/chat';
import Header from './components/header/header';

import './App.css';


function App() {
  return (
    <RecoilRoot>
      <div className="main">
        <Header />
        <Login />
      </div>
    </RecoilRoot>
  );
}

export default App;
