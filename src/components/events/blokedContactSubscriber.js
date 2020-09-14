import socketClient from '../../utils/socket';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import {friendSelector} from '../recoil/selectors';
import {useSnackbar} from 'notistack';
import text from './idioma.json';
import {idiomaState} from '../recoil/atoms';
import useNotifications from '../uiComponents/notification/notification.hook';
import useAxiosHook from '../../utils/axiosHook';
import useBrowserVisibility from '../../utils/browserVisibility';
import OS_Notification from '../../utils/OS_NotificationPermission';
import logo from '../../statics/logo192-removebg-preview.png';


const useBlokedContactSubscriber = () => {

    const client = socketClient.getSocket();
    const friendDispatcher = useSetRecoilState(friendSelector);
    const { enqueueSnackbar } = useSnackbar();
    const idioma = useRecoilValue(idiomaState);
    const {openErrorNotification} = useNotifications();
    const {postRequest} = useAxiosHook();
    const isBrowserVisble = useBrowserVisibility();

    const subscribeBlokedContact = () => {
        client.on('blocked contact', ({blokerId, socketIdBloked}) => {
            
            postRequest({
                url: '/users/getFriendById',
                bodyParams:{
                    friendId: blokerId
                },
                doFnAfterSuccess: resp => {
                    if(resp.status === 200){
                        friendDispatcher({
                            action: 'update', 
                            payload: {
                                friend: {...resp.data.friend, socketId: socketIdBloked}
                            }});
                        const friend = resp.data.friend;
                        
                        if(OS_Notification.allowedNotifications() && !isBrowserVisble){
                            new Notification(friend.nickname, { body: `${friend.nickname} ${text.block[idioma]}`, icon: logo });
                        }else{
                            enqueueSnackbar(`${friend.nickname} ${text.block[idioma]}`, {variant: "error"});
                        }
                        
                    }
                },
                doFnAfterError: err => {
                    if(!err.response){
                        openErrorNotification(text.connError[idioma]);
                    }else {
                        openErrorNotification(text.errorLoadingFriends[idioma]);
                    }
                }
            });
        });
    }

    const unSubscribeBlokedContact = () => {
        client.off('bloked contact');
    }

    return {
        subscribeBlokedContact: subscribeBlokedContact,
        unSubscribeBlokedContact: unSubscribeBlokedContact
    };

}

export default useBlokedContactSubscriber;