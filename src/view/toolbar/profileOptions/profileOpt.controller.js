import React from 'react';
import {useRecoilValue} from 'recoil';
import {loginData, userAvatarState, idiomaState} from '../../../components/recoil/atoms';
import ProfileOptView from './profileOpt.view';
import useLogout from '../../../utils/useLogout';
import text from './idioma.json';

const ProfileOptController = props => {

    const idioma = useRecoilValue(idiomaState);
    const userData = useRecoilValue(loginData);
    const avatarUrl = useRecoilValue(userAvatarState);
    const logout = useLogout();


    return <ProfileOptView  
        text={text}
        idioma={idioma}
        avatarUrl={avatarUrl}
        userData={userData}
        logout={logout}
    />;

}
export default ProfileOptController;