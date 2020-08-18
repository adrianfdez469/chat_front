import React from 'react';
//import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItemIcon, IconButton, Badge, Divider, Menu, MenuItem } from '@material-ui/core';
import  MenuItem from '@material-ui/core/MenuItem';
import  ListItemIcon from '@material-ui/core/ListItemIcon';
import  ListItemText from '@material-ui/core/ListItemText';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

const DeclineInvActionView = ({idioma, text, onClick}) => {

    return ( 
        <MenuItem onClick={onClick}>
            <ListItemIcon>
                <ThumbDownAltIcon fontSize="small" color="error"/>
            </ListItemIcon>
            <ListItemText primary={text.decline[idioma]} />
        </MenuItem>
    );

}
export default DeclineInvActionView;