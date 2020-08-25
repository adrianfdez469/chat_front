import React from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {loginData, userAvatarState, idiomaState, darkModeAtom} from '../../../components/recoil/atoms';
import ProfileOptView from './profileOpt.view';
import useLogout from '../../../utils/useLogout';
import text from './idioma.json';
import useAxiosHook from '../../../utils/axiosHook';

const ProfileOptController = props => {

    const [idioma, setIdioma] = useRecoilState(idiomaState);
    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom);
    const userData = useRecoilValue(loginData);
    const avatarUrl = useRecoilValue(userAvatarState);
    const logout = useLogout();
    const {postRequest} = useAxiosHook();

    const changeTheme = () => {
        
        localStorage.setItem('darkMode', !darkMode);
        setDarkMode(oldMode => !oldMode);
    }

    const changeIdioma = ({target:{value}}) => {
        setIdioma(value);
        postRequest({
            url: '/users/changeUserLanguage',
            bodyParams: {
                lang: value
            }
        });
    }

    return <ProfileOptView  
        text={text}
        idioma={idioma}
        avatarUrl={avatarUrl}
        userData={userData}
        logout={logout}
        changeIdioma={changeIdioma}
        darkMode={darkMode}
        changeTheme={changeTheme}
    />;

}
export default ProfileOptController;