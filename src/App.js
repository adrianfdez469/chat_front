import React, {Suspense} from 'react';
import {useRecoilValue} from 'recoil';
// Recoil Atoms
import {subscribeToEventsState, activeChatWith, darkModeAtom, idiomaState, view} from './components/recoil/atoms';

// Materia UI
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {SnackbarProvider} from 'notistack';

// Componentes visuales
//import Signin from './view/signin';
import MainContainter from './view/main';
import UiComponents from './components/uiComponents';

import FirebaseAuth from './view/firebaseAuth';
import AppTour from './view/tour/tour.view';


const AsyncToolbar = React.lazy(() => import('./view/toolbar'));
const AsyncMainButton = React.lazy(() => import('./view/mainButton'));
const AsyncContactList = React.lazy(() => import('./view/contacts'));
const AsyncChatCmp = React.lazy(() => import('./view/chat'));
const AsyncEvents = React.lazy(() => import('./components/events'));
//const AsyncPrivacyPolicy = React.lazy(() => import('./view/privacyPolitic'));

const themeDark = createMuiTheme({palette: {type: 'dark',}});
const themeDefault = createMuiTheme({});


const BodyApp = React.memo(() => {

    const idioma = useRecoilValue(idiomaState);
    const dark = useRecoilValue(darkModeAtom);
    const chatWith = useRecoilValue(activeChatWith);
    const subscribe = useRecoilValue(subscribeToEventsState);

    const view = chatWith 
        ? 
            <AsyncChatCmp />
        
        : <>
            <ThemeProvider theme={dark ? themeDark : themeDefault}>
                <AsyncToolbar />
                <AsyncContactList />
                <AsyncMainButton />
                <AppTour idioma={idioma}/>
            </ThemeProvider>
        </>

    return <>
        {view}
        {subscribe && <AsyncEvents />}
    </>; 
})

const EntryPointView = React.memo(() => {

    const viewState = useRecoilValue(view.getAtom);

    if(viewState === view.posibleViews.LOGIN){
        return <FirebaseAuth />;
    }else if(viewState === view.posibleViews.CONTACTS){
        return <BodyApp />
    }
})

const App = () => {

    const dark = useRecoilValue(darkModeAtom);
    
    const notistackRef = React.createRef();
    const onClickDismiss = React.useCallback(key => {
        return () => {notistackRef.current.closeSnackbar(key)}
    }, [notistackRef])
    
    return (
        <Suspense fallback={
            <Backdrop style={{zIndex: 999999, color: '#fff'}} open={true} >
                <CircularProgress color="inherit" />
            </Backdrop>}
        >
        <ThemeProvider theme={dark ? themeDark : themeDefault}>       
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
                    <EntryPointView />
                </SnackbarProvider>
            </MainContainter>
        </ThemeProvider>
    </Suspense>   
     
    );
}

export default App;
