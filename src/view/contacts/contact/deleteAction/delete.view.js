import React from 'react';
//import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItemIcon, IconButton, Badge, Divider, Menu, MenuItem } from '@material-ui/core';
import  MenuItem from '@material-ui/core/MenuItem';
import  ListItemIcon from '@material-ui/core/ListItemIcon';
import  ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteActionView = ({idioma, onClick, text}) => {

    return ( 
        <MenuItem onClick={onClick}>
            <ListItemIcon>
                <DeleteIcon fontSize="small" color="error"/>
            </ListItemIcon>
            <ListItemText primary={text.delete[idioma]} />
        </MenuItem>
    );

}
export default DeleteActionView;