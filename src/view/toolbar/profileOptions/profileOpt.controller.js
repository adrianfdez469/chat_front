import React from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {loginData, userAvatarState, idiomaState} from '../../../components/recoil/atoms';
import ProfileOptView from './profileOpt.view';
import useLogout from '../../../utils/useLogout';
import text from './idioma.json';
import useAxiosHook from '../../../utils/axiosHook';

const ProfileOptController = props => {

    const [idioma, setIdioma] = useRecoilState(idiomaState);
    const userData = useRecoilValue(loginData);
    const avatarUrl = useRecoilValue(userAvatarState);
    const logout = useLogout();
    const {postRequest} = useAxiosHook();

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
    />;

}
export default ProfileOptController;