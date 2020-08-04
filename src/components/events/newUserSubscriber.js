import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {contactListState} from '../recoil/atoms';
import socket from '../socket'

const UserSubscriber = props => {
    const [contactList, setContactListState] = useRecoilState(contactListState);
    const client = socket.getSocket();

    useEffect(() => {

        client.on('new user', data => {
            setContactListState([...contactList, {nick: data.nickname, _id: data._id, socketId: data.socketId}]);
        });

        return () => client.off('new user');
    }, [contactList]);

    return (
        <></>
    );

}
export default UserSubscriber;