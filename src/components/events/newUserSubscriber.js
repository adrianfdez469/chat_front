import React, {useEffect} from 'react';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import {friendSelector} from '../recoil/selectors';
import socket from '../../utils/socket'
import {loginData} from '../recoil/atoms';
import {useSnackbar} from 'notistack';
import text from './idioma.json';


const UserSubscriber = props => {   
    const client = socket.getSocket();
    const friendDispatcher = useSetRecoilState(friendSelector);
    const userData = useRecoilValue(loginData);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        client.on('new user', data => {
            friendDispatcher({
                action: 'connect', 
                payload: {
                    data:data,
                    notification: enqueueSnackbar,
                    msg: text.connected
                }
            });
        });

        client.emit('new user', {userId: userData.userId});

        return () => client.off('new user');
    }, [friendDispatcher, client, userData]);

    return (
        <></>
    );

}
export default UserSubscriber;