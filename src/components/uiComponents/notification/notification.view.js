import React from 'react';
import {useRecoilState} from 'recoil';
import {Snackbar } from '@material-ui/core';
import {makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';


import {notificationAtom} from './notification.atom';


const useStyles = makeStyles(theme => {
    console.log(theme.overrides.MuiSnackbar);
    return {
    snackbar: {
        /*top: 0,
        display: 'block',
        marginTop: theme.spacing(2)*/
    }
}});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const NotificationView = () => {
    const [notificationState, setNotState] = useRecoilState(notificationAtom);
    const classes = useStyles();

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
        className={classes.snackbar}
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