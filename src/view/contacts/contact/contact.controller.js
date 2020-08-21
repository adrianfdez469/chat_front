import React, {useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {idiomaState, activeChatWith} from '../../../components/recoil/atoms';
import ContactView from './contact.view';


const ContactContrller = ({contact}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const idioma = useRecoilValue(idiomaState);
    const setActiveChat = useSetRecoilState(activeChatWith);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const openChat = () => {
        setActiveChat(contact.contactId);
    }

    return <ContactView 
        handleMenu={handleMenu}
        handleClose={handleClose}
        contact={contact}
        anchorEl={anchorEl}
        idioma={idioma}
        openChat={openChat}
    />;

}
export default ContactContrller;