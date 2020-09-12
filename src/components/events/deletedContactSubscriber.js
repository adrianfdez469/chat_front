import React, {useEffect} from 'react';
import socketClient from '../../utils/socket';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import {friendSelector} from '../recoil/selectors';
import {useSnackbar} from 'notistack';
import text from './idioma.json';
import {idiomaState} from '../recoil/atoms';
import useNotifications from '../uiComponents/notification/notification.hook';
import useAxios from '../../utils/axiosHook';
import useBrowserVisibility from '../../utils/browserVisibility';
import OS_Notification from '../../utils/OS_NotificationPermission';
import logo from '../../statics/logo192-removebg-preview.png';

const DeletedContactSubscriber = props => {

    const client = socketClient.getSocket();
    const friendDispatcher = useSetRecoilState(friendSelector);
    const { enqueueSnackbar } = useSnackbar();
    const idioma = useRecoilValue(idiomaState);
    const {openErrorNotification} = useNotifications();
    const {postRequest} = useAxios();
    const isBrowserVisble = useBrowserVisibility();

    useEffect(() => {
        
        client.on('deleted contact', ({deleterId, socketIdDeleter}) => {
            
            postRequest({
                url: "/users/getFriendById",
                bodyParams: {
                    friendId: deleterId
                },
                doFnAfterSuccess: resp => {
                    if(resp.status === 200){
                        
                        friendDispatcher({
                            action: 'update', 
                            payload: {
                                friend: {...resp.data.friend, socketId: socketIdDeleter}
                            }});
                        const friend = resp.data.friend;
                        if(OS_Notification.allowedNotifications() && !isBrowserVisble){
                            new Notification(friend.nickname, { body: `${friend.nickname} ${text.delete[idioma]}`, icon: logo });
                        }else{
                            enqueueSnackbar(`${friend.nickname} ${text.delete[idioma]}`, {variant: "error"});
                        }
                    }
                },
                doFnAfterError: err => {
                    if(!err.response){
                        openErrorNotification(text.connError[idioma]);
                    }else{
                        openErrorNotification(text.errorLoadingFriends[idioma]);
                    }
                }
            });
        });

        return () => client.off('deleted contact');
    }, [isBrowserVisble, idioma])



    return <></>;

}
export default DeletedContactSubscriber;