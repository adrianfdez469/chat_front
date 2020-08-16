import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItemIcon, IconButton, Badge, Divider, Menu, MenuItem } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import {DEFAULT_CONFIG} from '../../../conf/configuration';

import text from './idioma.json';
/*
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
}));*/


const StyledBadge = withStyles((theme) => ({
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

const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);


const ContactView = ({idioma, contact, handleMenu,
    handleClose, anchorEl}) => {


    const lastMsg = `The following npm package, @material-ui/icons, includes the 1,100+ official Material icons converted to SvgIcon components.`;

    

    const labelId = `checkbox-list-secondary-label-${contact.email}`;
    return (<React.Fragment key={contact.email}>
        <ListItem button>
            <ListItemAvatar>
                <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                >
                    <Badge color="secondary" badgeContent="5">
                        <Avatar
                            alt={`Avatar n°${contact.nickname}`}
                            src={`${DEFAULT_CONFIG.server}${contact.avatarUrl}`}
                        />
                    </Badge>
                </StyledBadge>
            </ListItemAvatar>
            <ListItemText
                id={labelId}
                primary={contact.nickname}
                secondary={`${lastMsg.slice(0, 55)}...`}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={handleMenu}>
                    <MoreVertIcon />
                </IconButton>
            </ListItemSecondaryAction>
            
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <ListItemIcon>
                        <SendIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <DraftsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" color="error"/>
                    </ListItemIcon>
                    <ListItemText primary={text.delete[idioma]} />
                </StyledMenuItem>
            </StyledMenu>


        </ListItem>
        <Divider variant="inset" component="li" />
        </React.Fragment>
    );

}
export default ContactView;