import React, {useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {idiomaState, activeChatWith, loginData} from '../../../components/recoil/atoms';
import {friendSelector} from '../../../components/recoil/selectors';
import ContactView from './contact.view';
import socketClient from '../../../utils/socket';

const ContactContrller = ({contact}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const idioma = useRecoilValue(idiomaState);
    const userData = useRecoilValue(loginData);
    const setActiveChat = useSetRecoilState(activeChatWith);
    const friendDispatcher = useSetRecoilState(friendSelector);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const openChat = () => {        
        setActiveChat(contact.contactId);

        // Poner el estado en leidos
        friendDispatcher({
            action: 'reset_cant_no_leidos',
            payload: {
                contactId: contact.contactId,
            }
        });
        // Emit como leidos
        const client = socketClient.getSocket();
        client.emit('read messages', {
            userId: userData.userId,
            contactId: contact.contactId,
            notifyTo: contact.socketId,
            token: localStorage.getItem('token')
        });
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