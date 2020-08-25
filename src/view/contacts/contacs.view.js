import React from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Contact from './contact';

const ContactsView = ({idioma, text, contacts}) => {

    return (
        <List>
            {contacts.length > 0 
                ? contacts.map((contact) => <Contact contact={contact} key={contact.contactId}/>)
                : <>
                <Divider/>
                    <Typography variant="h5" align='justify'>{text.goMakeFriends[idioma]}</Typography>
                    <Divider/>
                    <Typography variant="subtitle1" align='justify' >{text.beta[idioma]}</Typography>
                </>
            }
        </List>
    );

}
export default ContactsView;