import {useSetRecoilState} from 'recoil';
import {loginData, userAvatarState, subscribeToEventsState} from '../components/recoil/atoms';


const useLogout = () => {

    const setLoginData = useSetRecoilState(loginData);
    const setUserAvatar = useSetRecoilState(userAvatarState);
    const setSubscribe = useSetRecoilState(subscribeToEventsState);
    

    return () => {
        console.log('Logout')
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('refresh_token_expires');
        localStorage.removeItem('token_expires');
        setSubscribe(false);
        setLoginData(null);
        setUserAvatar(null);
    } 
}
export default useLogout;