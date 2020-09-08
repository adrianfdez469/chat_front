import React from 'react';
//import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItemIcon, IconButton, Badge, Divider, Menu, MenuItem } from '@material-ui/core';
import  MenuItem from '@material-ui/core/MenuItem';
import  ListItemIcon from '@material-ui/core/ListItemIcon';
import  ListItemText from '@material-ui/core/ListItemText';
import VoiceOverOffIcon from '@material-ui/icons/VoiceOverOff';

import text from './idioma.json';

const BlockActionView = ({idioma, onClick}) => {

    return ( 
        <MenuItem onClick={onClick}>
            <ListItemIcon>
                <VoiceOverOffIcon fontSize="small" color="error"/>
            </ListItemIcon>
            <ListItemText primary={text.block[idioma]} />
        </MenuItem>
    );

}
export default BlockActionView;