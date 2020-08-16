import React, { useEffect } from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {view, subscribeToEventsState, loginData} from './components/recoil/atoms';
import axios from 'axios';
import {DEFAULT_CONFIG} from './conf/configuration';
/*import Login from './components/login/login';
import Contacts from './components/contacts/contacts';
import Chat from './components/chat/chat';
//import Chat from './components/chat/chat';
import Header from './components/header/header';
import './App.css';
import Backdrop from './components/backdrop/backdrop';*/

// --------------------------- New Style --------------------- //
import {Switch, Route, Redirect, Router} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Signin from './view/signin';
import ContactList from './view/contacts';
import MainButton from './view/mainButton';
import MainContainter from './view/main';
import Toolbar from './view/toolbar';
import ChatCmp from './view/chat';
import Signup from './view/signup';
import UiComponents from './components/uiComponents';
import ChangePass from './view/changepass';
import ActivateUser from './view/activateuser';
import NewUserSubscriber from './components/events/newUserSubscriber';
import UserDisconnectSubscriber from './components/events/userDisconnectSubscriber';
import IncomingMsgSubscriber from './components/events/incomingMsgSubscriber';



const App = props => {
  //const viewState = useRecoilValue(view.getAtom);
  //const subscribe = useRecoilValue(subscribeToEventsState);
  //const cmp = viewState === view.posibleViews.LOGIN ? <Login /> : viewState === view.posibleViews.CONTACTS ? <Contacts /> : <Chat />;

  const userData = useRecoilValue(loginData);

  const subscriptions = <>
    <NewUserSubscriber />
    <UserDisconnectSubscriber />
    {<IncomingMsgSubscriber />}
  </>
  

  
  
  const cmp  = userData !== null 
  ? <>
      <Route path="/contacts" exact render={ () => (
        <>
          <Toolbar />
          <MainButton />
          <ContactList />
          
        </>
      )} />
      <Route path="/contacts/:id" exact component={ChatCmp} />
      {subscriptions}
    </> 
  : null ;


  return (
    <MainContainter>
      <CssBaseline />
      <UiComponents />
      
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        {cmp}
        <Route path="/changepass/:token" exact component={ChangePass} />
        <Route path="/activateuser/:token/:nickname" exact component={ActivateUser} /> 
        <Redirect from='/' to='/' />       
      </Switch>

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
