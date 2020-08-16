import React from 'react';
import List from '@material-ui/core/List';

import Contact from './contact';

const ContactsView = ({idioma, contacts}) => {
    

    

    return (
        <List>
            {contacts.map((contact) => {
                return <Contact contact={contact}/>
            })}
        </List>
    );

}
export default ContactsView;