import React from 'react';
//import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItemIcon, IconButton, Badge, Divider, Menu, MenuItem } from '@material-ui/core';
import  MenuItem from '@material-ui/core/MenuItem';
import  ListItemIcon from '@material-ui/core/ListItemIcon';
import  ListItemText from '@material-ui/core/ListItemText';
import HowToRegIcon from '@material-ui/icons/HowToReg';

import text from './idioma.json';

const AcceptInvActionView = ({idioma, onClick}) => {

    return ( 
        <MenuItem onClick={onClick}>
            <ListItemIcon>
                <HowToRegIcon fontSize="small" color="primary"/>
            </ListItemIcon>
            <ListItemText primary={text.acceptInv[idioma]} />
        </MenuItem>
    );

}
export default AcceptInvActionView;