import React from 'react';

import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
    container: {
      padding: 0,
      position: 'relative',
      height: '100vh',
      overflowY: 'hidden'
    }
  }));

const MainView = props => {
    const classes = useStyles();

    return (
        <Container maxWidth="sm" className={classes.container} component="main">
            <CssBaseline />
            {props.children}
        </Container>
    );

}
export default MainView;