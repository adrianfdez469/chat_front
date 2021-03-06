import socketClient from '../../utils/socket';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import {friendSelector} from '../recoil/selectors';
import {useSnackbar} from 'notistack';
import text from './idioma.json';
import {idiomaState} from '../recoil/atoms';
import useNotifications from '../uiComponents/notification/notification.hook';
import useAxiosHook from '../../utils/axiosHook';
import useBrowserVisibility from '../../utils/browserVisibility';
import OS_Notification from '../../utils/OS_NotificationPermission'
import logo from '../../statics/logo192-removebg-preview.png';


const useAcceptedFriendshipSubscriber = props => {
    
    const client = socketClient.getSocket();
    const friendDispatcher = useSetRecoilState(friendSelector);
    const { enqueueSnackbar } = useSnackbar();
    const idioma = useRecoilValue(idiomaState);
    const {openErrorNotification} = useNotifications();
    const {postRequest} = useAxiosHook();
    const isBrowserVisble = useBrowserVisibility();

    const subscribeAcceptedFriendship = () => {
        client.on('accepted friendship', ({accepterId, socketIdAccepter}) => {
            
            postRequest({
                url: '/users/getFriendById',
                bodyParams: {
                    friendId: accepterId
                },
                doFnAfterSuccess: resp => {
                    if(resp.status === 200){
                        friendDispatcher({
                            action: 'update', 
                            payload: {
                                friend: {...resp.data.friend, socketId: socketIdAccepter}
                            }});
                        const friend = resp.data.friend;

                        if(OS_Notification.allowedNotifications() && !isBrowserVisble){
                            new Notification(friend.nickname, { body: `${friend.nickname} ${text.accept[idioma]}`, icon: logo });
                        }else{
                            enqueueSnackbar(`${friend.nickname} ${text.accept[idioma]}`, {variant: "success"});
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
    };

    const unSubscribeAcceptedFriendship = () => {
        client.off('accepted friendship');
    };

    return {
        subscribeAcceptedFriendship: subscribeAcceptedFriendship,
        unSubscribeAcceptedFriendship: unSubscribeAcceptedFriendship
    }
}

export default useAcceptedFriendshipSubscriber;