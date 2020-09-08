import React from 'react';

import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
    container: {
      padding: 0,
      position: 'relative',
      height: '100vh',
      overflowY: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    background: {
        backgroundColor: theme.palette.background.default
    }
  }));

const MainView = props => {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <Container maxWidth="sm" className={classes.container} component="main">
                <CssBaseline />
                {props.children}
            </Container>
        </div>
    );

}
export default MainView;