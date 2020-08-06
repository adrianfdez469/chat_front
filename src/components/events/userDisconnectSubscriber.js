import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {contactListState, chatConversation} from '../recoil/atoms';
import socket from '../socket'

const UserSubscriber = props => {
    const [contactList, setContactListState] = useRecoilState(contactListState);
    const [conversation, setConversation] = useRecoilState(chatConversation);
    const client = socket.getSocket();

    useEffect(() => {
        
        client.on('user disconnect', data => {
            setContactListState(contactList.filter(contact => contact.socketId !== data.socketId));
            if(conversation.active === data.socketId){
                setConversation({...conversation, activeOnline: false});
            }
        });

        return () => client.off('user disconnect');
    }, [conversation]);

    return (
        <></>
    );

}
export default UserSubscriber;