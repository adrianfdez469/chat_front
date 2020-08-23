import React, { useEffect } from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {view, subscribeToEventsState, loginData, activeChatWith} from './components/recoil/atoms';
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
import {Switch, Route, Redirect} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
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
import DeclinedFriendshipSubscriber from './components/events/declinedFriendshipSubscriber';
import RequestFriendSubscriber from './components/events/requestFriendshipSubscriber';
import AcceptFriendshipSubscriber from './components/events/acceptedFriendshipSubscriber';
import DeletedContactSubscriber from './components/events/deletedContactSubscriber';
import BlokedContactSubscriber from './components/events/blokedContactSubscriber';
import RecibedMessageSubscriber from './components/events/recibedMessageSubscriber';
import {SnackbarProvider} from 'notistack';
import {idiomaState} from './components/recoil/atoms';

const App = props => {

    const subscribe = useRecoilValue(subscribeToEventsState);
    const userData = useRecoilValue(loginData);
    const chatWith = useRecoilValue(activeChatWith);
    const idioma = useRecoilValue(idiomaState);
    const notistackRef = React.createRef();
    const onClickDismiss = key => () => { 
        notistackRef.current.closeSnackbar(key);
    }
  
    const cmp  = userData !== null 
    ? <>
            {
                chatWith 
                ? <ChatCmp />
                :<Route path="/contacts" exact render={ () => (
                    <>
                        <Toolbar />
                        <MainButton />
                        <ContactList />
                
                    </>
                )} />
            }
        </> 
    : null ;


  return (
    <MainContainter>
        <CssBaseline />
        <UiComponents />
        <SnackbarProvider 
            maxSnack={3} 
            autoHideDuration={3000}
            preventDuplicate
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            ref={notistackRef}
            action={(key) => (
                <Button variant="outlined" size="small" color="inherit" onClick={onClickDismiss(key)}>
                    {idioma === 'es' ?  "Cerrar" : "Close"}
                </Button>
            )}
        >
            <Switch>
                <Route path="/" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                {cmp}
                <Route path="/changepass/:token" exact component={ChangePass} />
                <Route path="/activateuser/:token/:nickname" exact component={ActivateUser} /> 
                <Redirect from='/' to='/' />       
            </Switch>
            {subscribe ? <>
                                <NewUserSubscriber />
                                <UserDisconnectSubscriber />
                                <IncomingMsgSubscriber />
                                <RequestFriendSubscriber />
                                <DeclinedFriendshipSubscriber />
                                <AcceptFriendshipSubscriber />
                                <DeletedContactSubscriber />
                                <BlokedContactSubscriber />
                                <RecibedMessageSubscriber />
                            </>: null
            }
        </SnackbarProvider>
    </MainContainter>
  );
}

export default App;
