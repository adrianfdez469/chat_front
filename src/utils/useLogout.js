import {useSetRecoilState} from 'recoil';
import axios from 'axios';
import {loginData, userAvatarState, subscribeToEventsState} from '../components/recoil/atoms';
import { useCallback } from 'react';
import socketClient from './socket';

const useLogout = () => {

    const setLoginData = useSetRecoilState(loginData);
    const setUserAvatar = useSetRecoilState(userAvatarState);
    const setSubscribe = useSetRecoilState(subscribeToEventsState);
    

    return useCallback(() => {

        socketClient.close();
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('refresh_token_expires');
        localStorage.removeItem('token_expires');
        setSubscribe(false);
        setLoginData(null);
        setUserAvatar(null);
    });
}
export default useLogout;