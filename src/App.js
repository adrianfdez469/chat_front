import React from 'react';
import {RecoilRoot} from 'recoil';

import Login from './components/login/login';
import Contacts from './components/chat/contacts';
import Chat from './components/chat/chat';
import Header from './components/header/header';

import './App.css';


function App() {

  const logged = true;

  return (
    <RecoilRoot>
      <div className="main">
        <Header />        
        {logged ? <Chat /> : <Login />}        
      </div>
    </RecoilRoot>
  );
}

export default App;
