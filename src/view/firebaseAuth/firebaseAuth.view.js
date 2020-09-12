import React, { Profiler } from 'react';
import { useRecoilValue } from 'recoil';
import { darkModeAtom } from '../../components/recoil/atoms';
import StyledFirebaseAuth  from 'react-firebaseui/StyledFirebaseAuth';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import logo from '../../statics/logo192-removebg-preview.png';

const FirebaseAuthView = React.memo(({uiConfig, auth, isSignedIn, netError}) => {
    
    const darkMode = useRecoilValue(darkModeAtom);
    const darModeStyle = darkMode ? {
        backgroundColor: 'rgba(60,60,60)'
    } : {};

  
    return (
        <div style={{...darModeStyle, justifyContent: 'center', alignItems: 'center', height: '100%', display: 'flex', flexDirection: 'column'}}>
            
            <Avatar src={logo} style={{width: 60, height: 60, marginTop: 24, boxShadow: '0 0px 5px rgb(154,48,154'}}/>
            <Typography variant="h5" style={{marginTop: 12}}>Shut-app</Typography>
            {isSignedIn 
                ? netError 
                    ? <WifiOffIcon color="secondary" style={{fontSize:"3em"}}/>
                    : <CircularProgress color="secondary" /> 
                : <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>}

        </div>
    );
})
export default FirebaseAuthView;