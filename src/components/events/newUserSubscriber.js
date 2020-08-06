import React, {useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {contactListState, loginData} from '../recoil/atoms';
import socket from '../socket'

const UserSubscriber = props => {
    const [contactList, setContactListState] = useRecoilState(contactListState);    
    const setLoginData = useSetRecoilState(loginData);
    const client = socket.getSocket();

    useEffect(() => {

        client.on('new user', data => {
            if(Array.isArray(data)){
                setContactListState(data.filter(socket => socket.socketId !== client.id));
                setLoginData(data.find(socket => socket.socketId === client.id));
            }  
            else
                setContactListState([...contactList, {nick: data.nickname, _id: data._id, socketId: data.socketId}]);
        });

        return () => client.off('new user');
    }, [contactList]);

    return (
        <></>
    );

}
export default UserSubscriber;