import React from 'react';
import StyledFirebaseAuth  from 'react-firebaseui/StyledFirebaseAuth';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import logo from '../../statics/logo192.png';

const FirebaseAuthView = ({uiConfig, auth, darkMode}) => {
    
    const darModeStyle = darkMode ? {
        backgroundColor: 'rgba(60,60,60)'
    } : {};

  
    return (
        <div style={{...darModeStyle, justifyContent: 'center', alignItems: 'center', height: '100%', display: 'flex', flexDirection: 'column'}}>
            
            <Card style={{width: '251px', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                <Avatar src={logo} style={{width: 60, height: 60, marginTop: 24, boxShadow: '0 0px 5px rgb(154,48,154'}}/>
                <Typography variant="h5" style={{marginTop: 12}}>Shut-app</Typography>
                
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>

            </Card>
        </div>
    );
}
export default FirebaseAuthView;