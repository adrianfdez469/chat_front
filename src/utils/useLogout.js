import {useSetRecoilState} from 'recoil';
import axios from 'axios';
import {loginData, userAvatarState, subscribeToEventsState, contactListState, friendsAtom} from '../components/recoil/atoms';
import { useCallback } from 'react';
import socketClient from './socket';

const useLogout = () => {

    const setLoginData = useSetRecoilState(loginData);
    const setUserAvatar = useSetRecoilState(userAvatarState);
    const setSubscribe = useSetRecoilState(subscribeToEventsState);
    const setContactList = useSetRecoilState(contactListState);
    const setFriends = useSetRecoilState(friendsAtom);
    const client = socketClient.getSocket();

    return useCallback(() => {
        
        setUserAvatar(null);
        setContactList([]);
        setFriends([]);
        client.emit('logout', {});
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('refresh_token_expires');
        localStorage.removeItem('token_expires');
        setSubscribe(false);
        setLoginData(null);
        
        
    });
}
export default useLogout;