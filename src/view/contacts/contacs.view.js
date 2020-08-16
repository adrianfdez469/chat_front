import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Badge, Divider } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {DEFAULT_CONFIG} from '../../conf/configuration';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
}));


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

const ContactsView = ({idioma, contacts}) => {
    const classes = useStyles();

    const lastMsg = `The following npm package, @material-ui/icons, includes the 1,100+ official Material icons converted to SvgIcon components.`;


    return (
        <List className={classes}>
            {contacts.map((contact) => {
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
                            <IconButton edge="end" aria-label="delete">
                                <MoreVertIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </React.Fragment>
                );
            })}
        </List>
    );

}
export default ContactsView;