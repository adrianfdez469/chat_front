import React, {useEffect} from 'react';
import socketClient from '../../utils/socket';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import {friendSelector} from '../recoil/selectors';
import {useSnackbar} from 'notistack';
import text from './idioma.json';
import {idiomaState} from '../recoil/atoms';
import {DEFAULT_CONFIG} from '../../conf/configuration';
import axios from 'axios';
import useNotifications from '../uiComponents/notification/notification.hook';
import authMiddleware from '../../authMiddleware';


const BlokedContactSubscriber = props => {

    const client = socketClient.getSocket();
    const friendDispatcher = useSetRecoilState(friendSelector);
    const { enqueueSnackbar } = useSnackbar();
    const idioma = useRecoilValue(idiomaState);
    const {openErrorNotification} = useNotifications();

    useEffect(() => {
        
        client.on('blocked contact', ({blokerId, socketIdBloked}) => {
            
            const optimisticAction = token => {
                axios.post(`${DEFAULT_CONFIG.server}/users/getFriendById`,{
                    friendId: blokerId
                },{
                    headers: {
                        'Authorization': token
                    }
                })
                .then(resp => {
                    if(resp.status === 200){
                        
                        friendDispatcher({
                            action: 'update', 
                            payload: {
                                friend: {...resp.data.friend, socketId: socketIdBloked}
                            }});
                        return resp.data.friend;
                    }
                })
                .then(friend => {
                    enqueueSnackbar(`${friend.nickname} ${text.block[idioma]}`, {variant: "error"});
                })
                .catch(err => {
                    openErrorNotification(text.errorLoadingFriends[idioma])
                });
            }
            authMiddleware(optimisticAction);
        });

        return () => client.off('bloked contact');
    }, [])



    return <></>;

}
export default BlokedContactSubscriber;