import React, {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {friendSelector} from '../recoil/selectors';
import socket from '../../utils/socket';
import {useSnackbar} from 'notistack';
import text from './idioma.json';

const UserSubscriber = props => {
    const friendDispatcher = useSetRecoilState(friendSelector);
    const client = socket.getSocket();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        
        client.on('user disconnect', data => {
            friendDispatcher({
                action: 'disconnect', 
                payload: {
                    socketId: data.socketId,
                    notification: enqueueSnackbar,
                    msg: text.disconnected
                }
            })
        });

        return () => client.off('user disconnect');
    }, []);

    return (
        <></>
    );

}
export default UserSubscriber;