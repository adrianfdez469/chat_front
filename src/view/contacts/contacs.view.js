import React, { useCallback } from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import Contact from './contact';

const useStyles = makeStyles(theme => ({
    scroll: {
        position: 'relative',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        height: `calc(100% - ${theme.spacing(8)}px)`
    },
    offsetDown: {
        ...theme.mixins.toolbar, 
        bottom: 0,
        position: 'relative'
    }
}));


const ContactsView = ({idioma, text, contacts}) => {

    const classes = useStyles();

    return (
        <div className={classes.scroll}>
            <List>
                {contacts.length > 0 
                    ? contacts.map((contact) => <Contact contact={contact} key={contact.contactId}/>)
                    : <div style={{margin: '2em'}}>
                    <Divider/>
                        <Typography variant="h5" align='justify'>{text.goMakeFriends[idioma]}</Typography>
                        <Divider/>
                        <Typography variant="subtitle1" align='justify' style={{marginTop: '1em'}}>{text.beta[idioma]}</Typography>
                    </div>
                }
            </List>
            <div className={classes.offsetDown}/>
            <div className={classes.offsetDown}/>
        </div>
    );

}
export default ContactsView;