import React from 'react';
import {useRecoilValue} from 'recoil';
import {view, subscribeToEventsState} from './components/recoil/atoms';

/*import Login from './components/login/login';
import Contacts from './components/contacts/contacts';
import Chat from './components/chat/chat';
//import Chat from './components/chat/chat';
import Header from './components/header/header';
import NewUserSubscriber from './components/events/newUserSubscriber';
import UserDisconnectSubscriber from './components/events/userDisconnectSubscriber';
import IncomingMsgSubscriber from './components/events/incomingMsgSubscriber';
import './App.css';
import Backdrop from './components/backdrop/backdrop';*/

// --------------------------- New Style --------------------- //
import Signin from './view/signin';
import Sigup from './view/signup';
import ContactList from './view/contacts';
import MainContainter from './view/main';
import Toolbar from './view/toolbar';
import ChatCmp from './view/chat';
import Signup from './view/signup';

function App() {
  //const viewState = useRecoilValue(view.getAtom);
  //const subscribe = useRecoilValue(subscribeToEventsState);
  //const cmp = viewState === view.posibleViews.LOGIN ? <Login /> : viewState === view.posibleViews.CONTACTS ? <Contacts /> : <Chat />;
/*
  let subscriptions = null;
  if(subscribe){
    subscriptions = <>
      <NewUserSubscriber />
      <UserDisconnectSubscriber />
      {<IncomingMsgSubscriber />}
    </>
  }*/

  


  return (
    <MainContainter>
      <Signup />
    </MainContainter>
  );

  /*return (
    <>
    <Backdrop />
      <div className="main">
      
        <Header />        
        {cmp}
        {subscriptions}
        
      </div></>
  );*/
}

export default App;
