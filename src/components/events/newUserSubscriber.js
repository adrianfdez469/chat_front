import React, {useEffect} from 'react';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import {friendSelector} from '../recoil/selectors';
import socket from '../../utils/socket'
import {loginData} from '../recoil/atoms';
import {useSnackbar} from 'notistack';
import text from './idioma.json';
import useBrowserVisibility from '../../utils/browserVisibility';
import OS_Notification from '../../utils/OS_NotificationPermission';
import logo from '../../statics/logo192-removebg-preview.png';

const UserSubscriber = props => {   
    const client = socket.getSocket();
    const friendDispatcher = useSetRecoilState(friendSelector);
    const userData = useRecoilValue(loginData);
    const { enqueueSnackbar } = useSnackbar();
    const isBrowserVisble = useBrowserVisibility();

    useEffect(() => {

        client.on('new user', data => {

            let payload = {
                data:data,
                msg: text.connected
            };
            if(OS_Notification.allowedNotifications() && !isBrowserVisble){
                payload.OSNotification = (nickname, content) => {
                    new Notification(nickname, { body: content, icon: logo });
                }
            }else{
                payload.notification = enqueueSnackbar
            }
            
            friendDispatcher({
                action: 'connect', 
                payload: payload
            });
        });
        
        if(userData)
            client.emit('new user', {userId: userData.userId});

        return () => client.off('new user');
    }, [friendDispatcher, client, userData, isBrowserVisble]);

    return (
        <></>
    );

}
export default UserSubscriber;