import React from 'react';
import { useRecoilValue } from 'recoil';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import backdropStateAtom from './backdrop.atom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MyBackdrop = props => {

    const classes = useStyles();
    const open = useRecoilValue(backdropStateAtom);


    return <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>;

}
export default MyBackdrop;