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
            setContactListState(contactList.filter(contact => contact._id !== data._id));
            if(conversation.active === data._id){
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