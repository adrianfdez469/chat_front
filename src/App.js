import React, {Suspense} from 'react';
import {useRecoilValue} from 'recoil';

// Recoil Atoms
import {subscribeToEventsState, loginData, activeChatWith, tokenTimeoutAtom, darkModeAtom} from './components/recoil/atoms';

// React router
import {Switch, Route, Redirect} from 'react-router-dom';

// Materia UI
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {SnackbarProvider} from 'notistack';

// Componentes visuales
import Signin from './view/signin';
import MainContainter from './view/main';
import Signup from './view/signup';
import UiComponents from './components/uiComponents';
import useRefreshToken from './utils/useRefreshToken';



//import Toolbar from './view/toolbar';
//import MainButton from './view/mainButton';
//import ContactList from './view/contacts';
//import ChatCmp from './view/chat';
//import ActivateUser from './view/activateuser';
//import Events from './components/events';
//import ChangePass from './view/changepass';

const AsyncToolbar = React.lazy(() => import('./view/toolbar'));
const AsyncMainButton = React.lazy(() => import('./view/mainButton'));
const AsyncContactList = React.lazy(() => import('./view/contacts'));
const AsyncChatCmp = React.lazy(() => import('./view/chat'));
const AsyncActivateUser = React.lazy(() => import('./view/activateuser'));
const AsyncChangePass = React.lazy(() => import('./view/changepass'));
const AsyncEvents = React.lazy(() => import('./components/events'));



const TimerCmp = () => {

    const refreshToken = useRefreshToken();
    const timeoutData = useRecoilValue(tokenTimeoutAtom);
    
    React.useEffect(() => {
        
        let timeleft = new Date(timeoutData.timeleft).getTime() - new Date().getTime();
        if(timeleft >= 10000){
            setTimeout(()=> {
                refreshToken();
            }, timeleft - 10000);
        }

    }, [timeoutData]);

    return <></>;
}

const themeDark = createMuiTheme({palette: {type: 'dark',}});
const themeDefault = createMuiTheme({});


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const App = () => {

    const classes = useStyles();

    const dark = useRecoilValue(darkModeAtom);
    const subscribe = useRecoilValue(subscribeToEventsState);
    const userData = useRecoilValue(loginData);
    const chatWith = useRecoilValue(activeChatWith);
    const notistackRef = React.createRef();
    const onClickDismiss = key => () => { 
        notistackRef.current.closeSnackbar(key);
    }
  
    const cmp  = userData !== null 
    ? <>
            {
                chatWith 
                ? <Suspense fallback={
                    <Backdrop className={classes.backdrop} open={true} >
                        <CircularProgress color="inherit" />
                    </Backdrop>}
                >
                    <AsyncChatCmp />
                </Suspense>
                                    
                : <Route path="/contacts" exact render={ () => (
                    <ThemeProvider theme={dark ? themeDark : themeDefault}>
                        <Suspense fallback={
                            <Backdrop className={classes.backdrop} open={true} >
                                <CircularProgress color="inherit" />
                            </Backdrop>}
                        >
                            <AsyncToolbar />
                            <AsyncMainButton />
                            <AsyncContactList />
                        </Suspense>
                    </ThemeProvider>
                )} />
            }
        </> 
    : null ;


    return (<ThemeProvider theme={dark ? themeDark : themeDefault}>
       
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
                        <IconButton onClick={onClickDismiss(key)}>
                            <CloseIcon fontSize="small" style={{color: 'white'}} />
                        </IconButton>
                    )}
                >
                    <Switch>
                        <Route path="/" exact component={Signin} />
                        <Route path="/signup" exact component={Signup} />
                        {cmp}
                        <Route path="/changepass/:token" exact render={() => (
                            <Suspense fallback={
                                <Backdrop className={classes.backdrop} open={true} >
                                    <CircularProgress color="inherit" />
                                </Backdrop>}
                            >
                                <AsyncChangePass />
                            </Suspense>
                        )} />
                        
                        
                        
                        <Route path="/activateuser/:token/:nickname/:invited" exact render={() => (
                            <Suspense fallback={
                                <Backdrop className={classes.backdrop} open={true} >
                                    <CircularProgress color="inherit" />
                                </Backdrop>}
                            >
                                <AsyncActivateUser />
                            </Suspense>
                        )} /> 
                        <Route path="/activateuser/:token/:nickname" exact render={() => (
                            <Suspense fallback={
                                <Backdrop className={classes.backdrop} open={true} >
                                    <CircularProgress color="inherit" />
                                </Backdrop>}
                            >
                                <AsyncActivateUser />
                            </Suspense>
                        )} /> 
                        
                        
                        
                        
                        <Redirect from='/' to='/' />       
                    </Switch>
                    
                    {subscribe ? 
                        <Suspense fallback={
                            <Backdrop className={classes.backdrop} open={true} >
                                <CircularProgress color="inherit" />
                            </Backdrop>}
                        >
                            <AsyncEvents />
                        </Suspense>
                    : null
                    }
                    <TimerCmp />
                </SnackbarProvider>
            </MainContainter>
        </ThemeProvider>);
}



export default App;
