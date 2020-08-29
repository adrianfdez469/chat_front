import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import {makeStyles, withStyles} from '@material-ui/core/styles';
import {blue, pink} from '@material-ui/core/colors';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {DEFAULT_CONFIG} from '../../../conf/configuration'


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
    },
    avatarMan: {
      color: theme.palette.getContrastText(blue[400]),
      backgroundColor: blue[400],
    },
    avatarWoman: {
      color: theme.palette.getContrastText(pink[300]),
      backgroundColor: pink[300],
    }
}));


const OnlineStyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const OfflineStyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: theme.palette.grey[500],
        color: theme.palette.grey[500],
        
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const OnlineBadge = props => {
    
    if(props.contact.socketId && props.contact.friendShipStatus === 1){
        return (<OnlineStyledBadge
                overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                >
                    {props.children}
                </OnlineStyledBadge>)
            ;
    }
    else {
        return (<OfflineStyledBadge
            overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            >
                {props.children}
            </OfflineStyledBadge>)
        ;
    }
}

const ChatHeaderView = ({closeChat, contact}) => {

    const classes = useStyles();

    const avatarUrl = contact.avatarUrl ? DEFAULT_CONFIG.server + contact.avatarUrl : null;
    const avatarGender = contact.gender === "M" ? 'avatarMan' : "avatarWoman";

    return (
        <AppBar position="fixed" className={classes.customAppBar}>
            <ToolBar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={closeChat}
                >
                    <ArrowBackIcon />
                </IconButton>
                    <OnlineBadge contact={contact}>
                        <Avatar
                            src={avatarUrl}
                            className={contact.gender && avatarGender}
                        />
                    </OnlineBadge>
                <Typography className={classes.title} variant="h5" noWrap>
                    {contact.nickname}
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