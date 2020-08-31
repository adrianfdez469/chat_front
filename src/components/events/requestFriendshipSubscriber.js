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


const RequestFriendSubscriber = props => {

    const client = socketClient.getSocket();
    const friendDispatcher = useSetRecoilState(friendSelector);
    const { enqueueSnackbar } = useSnackbar();
    const userData = useRecoilValue(loginData);
    const idioma = useRecoilValue(idiomaState);
    const {openErrorNotification} = useNotifications();

    useEffect(() => {
        
        client.on('requested friendship', ({userIdRequester, userIdRequested, socketIdRequester}) => {
            if(userIdRequested === userData.userId){
                
                
                const optimisticAction = token => {
                    axios.post(`${DEFAULT_CONFIG.server}/users/getFriendById`,{
                        friendId: userIdRequester
                    },{
                        headers: {
                            'Authorization': token
                        }
                    })
                    .then(resp => {
                        if(resp.status === 200){
                            
                            friendDispatcher({
                                action: 'add', 
                                payload: {
                                    friend: {...resp.data.friend, socketId: socketIdRequester}
                                }});
                            return resp.data.friend;
                        }
                    })
                    .then(friend => {
                        enqueueSnackbar(`${friend.nickname} ${text.requestedInv[idioma]}`, {variant: "success"});
                    })
                    .catch(err => {
                        if(!err.response){
                            openErrorNotification(text.connError[idioma]);
                        }else{
                            openErrorNotification(text.errorLoadingFriends[idioma]);
                        }
                    });
                }
                authMiddleware(optimisticAction);
                
            }
        });

        return () => client.off('requested friendship');
    }, [])



    return <></>;

}
export default RequestFriendSubscriber;