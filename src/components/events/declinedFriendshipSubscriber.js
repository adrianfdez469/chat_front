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


const useDeclinedFriendship = () => {

    const client = socketClient.getSocket();
    const friendDispatcher = useSetRecoilState(friendSelector);
    const { enqueueSnackbar } = useSnackbar();
    const idioma = useRecoilValue(idiomaState);
    const {openErrorNotification} = useNotifications();
    const {postRequest} = useAxios();
    const isBrowserVisble = useBrowserVisibility();


    const subscribeDeclinedFriendship = () => {
        client.on('declined friendship', ({declinerId, declinedId, socketIdDecliner, socketIdDeclined}) => {
            
            postRequest({
                url: "/users/getFriendById",
                bodyParams: {
                    friendId: declinerId
                },
                doFnAfterSuccess: resp => {
                    if(resp.status === 200){
                        
                        friendDispatcher({
                            action: 'update', 
                            payload: {
                                friend: {...resp.data.friend, socketId: socketIdDecliner}
                            }});
                        const friend = resp.data.friend;
                        
                        if(OS_Notification.allowedNotifications() && !isBrowserVisble){
                            new Notification(friend.nickname, { body: `${friend.nickname} ${text.declinedInv[idioma]}`, icon: logo });
                        }else{
                            enqueueSnackbar(`${friend.nickname} ${text.declinedInv[idioma]}`, {variant: "warning"});
                        }
                    }
                },
                doFnAfterError: err => {
                    if(!err.response){
                        openErrorNotification(text.connError[idioma]);
                    }else if(err.response.status === 404){
                        friendDispatcher({
                            action: 'delete', 
                            payload: {
                                friendId: declinerId
                        }})
                    }
                }
            });
        });
    }

    const unSubscribeDeclinedFriendship = () => {
        client.off('declined friendship');
    }

    return {
        subscribeDeclinedFriendship: subscribeDeclinedFriendship,
        unSubscribeDeclinedFriendship: unSubscribeDeclinedFriendship
    };

}

export default useDeclinedFriendship;