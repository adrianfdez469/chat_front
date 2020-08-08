import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import {makeStyles} from '@material-ui/core/styles';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(0.5),
    },
    title: {
        display: 'block',
        //display: 'none',
        /*[theme.breakpoints.up('xs')]: {
          display: 'block',
        },*/

        marginLeft: theme.spacing(1)
        
    },
    customAppBar: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: theme.breakpoints.values.sm,
        },
        right: 'auto'
    }
}));


const ChatHeaderView = props => {

    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.customAppBar}>
            <ToolBar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <ArrowBackIcon />
                </IconButton>
                    <Avatar
                        alt={`Avatar n°${1}`}
                        src={`/static/images/avatar/${1}.jpg`}
                    />
                <Typography className={classes.title} variant="h6" noWrap>
                    Usuario
                </Typography>
                <div className={classes.grow} />
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <MoreVertIcon />
                </IconButton>
            </ToolBar>
        </AppBar>
    );

}
export default ChatHeaderView;