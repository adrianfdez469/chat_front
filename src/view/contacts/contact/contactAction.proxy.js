import React from 'react';

import AcceptInv from './acceptInvAction';
import DeclineInv from './declineInvAction';
import DeleteFriend from './deleteAction';
import BlockContact from './blockAction';
/*
    1- ACEPTED -> Eliminar, Bloquear
    2- REQUESTED -> Cancelar, Bloquear
    3- ASKED -> Aceptar, Cancelar, bloquear
    4- DECLINED -> Cancelar, Bloquear
    5- Blocked -> Eliminar
    6- Deleted -> Eliminar
*/

const ContactActionProxy = ({handleClose, contact}) => {
    

    const preAction = () => {
        handleClose()
    }

    
    
    switch(contact.friendShipStatus){
        case 1: return (
            <>
                <DeleteFriend  preAction={preAction} contact={contact}/>
                <BlockContact  preAction={preAction} contact={contact}/>
            </>
            );
        case 2: return (
            <>
                <DeclineInv preAction={preAction} contact={contact}/>
                <BlockContact preAction={preAction} contact={contact}/>
            </>
        ); 
        case 3: return (
            <>
                <AcceptInv  preAction={preAction} contact={contact}/>
                <DeclineInv  preAction={preAction} contact={contact}/>
                <BlockContact  preAction={preAction} contact={contact}/>
            </>
        );
        case 4: return (
            <>
                <DeleteFriend  preAction={preAction} contact={contact}/>
                <BlockContact  preAction={preAction} contact={contact}/>
            </>
        );
        case 5: return <DeleteFriend  preAction={preAction} contact={contact}/>;
        case 6: return <DeleteFriend  preAction={preAction} contact={contact}/>;
        default: return null;
    }
}

export default ContactActionProxy;