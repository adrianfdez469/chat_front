import React from 'react';
import {useRecoilState} from 'recoil';
import {Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


import {notificationAtom} from './notification.atom';




function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const NotificationView = () => {
    const [notificationState, setNotState] = useRecoilState(notificationAtom);
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setNotState({...notificationState, open: false});
    };

    return <Snackbar 
        open={notificationState.open}
        autoHideDuration={notificationState.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
    >
        <Alert
            onClose={handleClose}
            severity={notificationState.severity}
        >
            {notificationState.msg}
        </Alert>
    </Snackbar>;

}
export default NotificationView;