import React, {useEffect} from 'react';
import socketClient from '../../utils/socket';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import {friendSelector} from '../recoil/selectors';
import {useSnackbar} from 'notistack';
import text from './idioma.json';
import {loginData, idiomaState} from '../recoil/atoms';
import {DEFAULT_CONFIG} from '../../conf/configuration';
import axios from 'axios';
import useNotifications from '../uiComponents/notification/notification.hook';
import authMiddleware from '../../authMiddleware';


const DeclinedFriendshipSubscriber = props => {

    const client = socketClient.getSocket();
    const friendDispatcher = useSetRecoilState(friendSelector);
    const { enqueueSnackbar } = useSnackbar();
    const userData = useRecoilValue(loginData);
    const idioma = useRecoilValue(idiomaState);
    const {openErrorNotification} = useNotifications();

    useEffect(() => {
        
        client.on('declined friendship', ({declinerId, declinedId, socketIdDecliner, socketIdDeclined}) => {
            
            const optimisticAction = token => {
                axios.post(`${DEFAULT_CONFIG.server}/users/getFriendById`,{
                    friendId: declinerId
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
                                friend: {...resp.data.friend, socketId: socketIdDecliner}
                            }});
                        return resp.data.friend;
                    }
                })
                .then(friend => {
                    enqueueSnackbar(`${friend.nickname} ${text.declinedInv[idioma]}`, {variant: "warning"});
                })
                .catch(err => {
                    if(!err.response){
                        openErrorNotification(text.connError[idioma]);
                    }else if(err.response.status === 404){
                        friendDispatcher({
                            action: 'delete', 
                            payload: {
                                friendId: declinerId
                            }});
                    }
                });
            }
            authMiddleware(optimisticAction);
                
            
        });

        return () => client.off('declined friendship');
    }, [])



    return <></>;

}
export default DeclinedFriendshipSubscriber;