import React from 'react';
import {useRecoilValue} from 'recoil';
import {view, subscribeToEventsState} from './components/recoil/atoms';
import Login from './components/login/login';
import Contacts from './components/contacts/contacts';
import Chat from './components/chat/chat';
//import Chat from './components/chat/chat';
import Header from './components/header/header';
import NewUserSubscriber from './components/events/newUserSubscriber';
import UserDisconnectSubscriber from './components/events/userDisconnectSubscriber';
import IncomingMsgSubscriber from './components/events/incomingMsgSubscriber';
import './App.css';
import Backdrop from './components/backdrop/backdrop';


function App() {
  const viewState = useRecoilValue(view.getAtom);
  const subscribe = useRecoilValue(subscribeToEventsState);
  const cmp = viewState === view.posibleViews.LOGIN ? <Login /> : viewState === view.posibleViews.CONTACTS ? <Contacts /> : <Chat />;

  let subscriptions = null;
  if(subscribe){
    subscriptions = <>
      <NewUserSubscriber />
      <UserDisconnectSubscriber />
      {<IncomingMsgSubscriber />}
    </>
  }

  return (<><Backdrop />
      <div className="main">
      
        <Header />        
        {cmp}
        {subscriptions}
        
      </div></>
  );
}

export default App;
