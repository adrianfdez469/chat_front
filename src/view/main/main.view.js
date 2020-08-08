import React from 'react';

import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
      padding: 0
    }
  }));

const MainView = props => {
    const classes = useStyles();

    return (
        <Container maxWidth="sm" className={classes.container}>
            {props.children}
        </Container>
    );

}
export default MainView;