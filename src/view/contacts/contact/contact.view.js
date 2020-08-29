import React from 'react';
import { formatRelative } from 'date-fns';
import { es } from 'date-fns/locale';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Badge, Divider, Menu, Tooltip, Typography } from '@material-ui/core';
import { red, green, blue, pink } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InfoIcon from '@material-ui/icons/Info';
import {DEFAULT_CONFIG} from '../../../conf/configuration';

import text from './idioma.json';

import ActionProxy from './contactAction.proxy';

const useStyle = makeStyles((theme) => ({
    infoIcon: {
        marginRight: '-12px',
        overflow: 'visible',
        textAlign: 'center',
        flex: '0 0 auto',
        
        color: 'rgba(0, 0, 0, 0.54)',
        padding: '12px',
        fontSize: '1.5rem',
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        borderRadius: '50%',

        
        border: 0,
        cursor: 'pointer',
        margin: 0,
        display: 'inline-flex',
        outline: 0,
        
        position: 'relative',
        alignItems: 'center',
        userSelect: 'none',
        
        verticalAlign: 'middle',
        
        justifyContent: 'center',
        textDecoration: 'none'
    },
    listItemText: {
        paddingRight: theme.spacing(10)
    },
    primaryText: {
        color: theme.palette.text.primary
    },
    secondaryText: {
        color: theme.palette.text.secondary
    },avatarMan: {
        color: theme.palette.getContrastText(blue[400]),
        backgroundColor: blue[400],
    },
    avatarWoman: {
        color: theme.palette.getContrastText(pink[300]),
        backgroundColor: pink[300],
    },
}));

const OnlineStyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px white`,
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

        
        
        boxShadow: `0 0 0 2px white`,
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

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
const useCustomTooltipGreenStyle = makeStyles((theme) => ({
    arrow: {
      color: green[500]
    },
    tooltip: {
      backgroundColor: green[500]
    },
  }));
  const useCustomTooltipRedStyle = makeStyles((theme) => ({
    arrow: {
      color: red[500]
    },
    tooltip: {
      backgroundColor: red[500]
    },
  }));
const CustomTooltip = props => {
    const classesRed = useCustomTooltipRedStyle();
    const classesGreen = useCustomTooltipGreenStyle();

    return <Tooltip arrow classes={props.color === 'red' ? classesRed : classesGreen} {...props} />;
}


const ContactView = React.memo(
    ({idioma, contact, handleMenu,
    handleClose, anchorEl, openChat}) => {
    const lastMsg = contact.lastMsg ? contact.lastMsg : '' ;
    
    const options = idioma === 'es' ? { locale: es } : {};
    const lastMsgTime = contact.datetime ? formatRelative(new Date(contact.datetime), new Date(), options) : '';
    console.log(contact);
    
    
    const classes = useStyle();
    const avatarUrl = contact.avatarUrl ? `${DEFAULT_CONFIG.server}${contact.avatarUrl}` : null;

    const avatarGender = contact.gender === "M" ? 'avatarMan' : "avatarWoman";

    return (<>
        <ListItem button onClick={openChat}>
            <ListItemAvatar>
                <OnlineBadge contact={contact}>
                    {contact.unread && contact.unread > 0 
                    ? <Badge color="secondary" badgeContent={contact.unread}>
                        <Avatar
                            src={avatarUrl}
                            className={contact.gender && classes[avatarGender]}
                        />
                    </Badge>
                    : <Avatar
                            src={avatarUrl}
                            className={contact.gender && classes[avatarGender]}
                        />
                    }
                </OnlineBadge>
            </ListItemAvatar>
                <ListItemText
                    primary={contact.nickname}
                    
                    secondary={contact.friendShipStatus > 1 ? text[contact.friendShipStatusCode][idioma] : `${lastMsg.slice(0, 55)}... ${lastMsgTime}`}
                    secondaryTypographyProps={contact.friendShipStatus > 3 
                        ? {
                            style: {color: `${red[500]}`}

                        } 
                        : contact.friendShipStatus < 4 && contact.friendShipStatus > 1 ? {
                            style: {color: `${green[500]}`}
                        } : {}
                    }
                    className={classes.listItemText}
                    classes={{
                        primary: classes.primaryText,
                        secondary: classes.secondaryText
                    }}
                />
                
                {contact.friendShipStatus > 1 ?
                    <CustomTooltip title={text[`desc${contact.friendShipStatusCode}`][idioma]} color={contact.friendShipStatus > 3 ? 'red' : 'geen'}>
                        <div className={classes.infoIcon}>
                            <InfoIcon fontSize="small" style={{color: contact.friendShipStatus > 3 ? red[500] : green[500]}}/>
                        </div>
                    </CustomTooltip>
                : null }
            
            <ListItemSecondaryAction>
                
                
                <IconButton edge="end" aria-label="delete" onClick={handleMenu}>
                    <MoreVertIcon fontSize="default"/>
                </IconButton>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >   
                    <ActionProxy handleClose={handleClose} contact={contact}/>
                </StyledMenu>
            </ListItemSecondaryAction>
            
        </ListItem>
        <Divider variant="inset" component="li" />
        </>
    );
})


export default ContactView;