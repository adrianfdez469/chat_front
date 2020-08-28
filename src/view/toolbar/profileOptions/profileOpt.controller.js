import React, {useState} from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {loginData, userAvatarState, idiomaState, darkModeAtom} from '../../../components/recoil/atoms';
import ProfileOptView from './profileOpt.view';
import useLogout from '../../../utils/useLogout';
import text from './idioma.json';
import useAxiosHook from '../../../utils/axiosHook';

const ProfileOptController = props => {

    const [changePass, setChangePassword] = useState(false);
    const setChangePass  = () => {
        setChangePassword(oldState => !oldState);
    }
    const [changeAvatar, setChangeAvat] = useState(false);
    const setChangeAvatar  = () => {
        setChangeAvat(oldState => !oldState);
    }
    const [editProfile, setEditProfileState] = useState(false);
    const setChangeProfile  = () => {
        setEditProfileState(oldState => !oldState);
    }
    const [shareApp, setShareAppState] = useState(false);
    const setShareApp  = () => {
        setShareAppState(oldState => !oldState);
    }
    const [feedback, setFeedbackState] = useState(false);
    const setFeedback  = () => {
        setFeedbackState(oldState => !oldState);
    }
    
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

    return <> 
            <ProfileOptView  
                text={text}
                idioma={idioma}
                avatarUrl={avatarUrl}
                userData={userData}
                logout={logout}
                changeIdioma={changeIdioma}
                darkMode={darkMode}
                changeTheme={changeTheme}
                
                changePass={changePass}
                setChangePass={setChangePass}

                changeAvatar={changeAvatar}
                setChangeAvatar={setChangeAvatar}

                editProfile={editProfile}
                setChangeProfile={setChangeProfile}

                shareApp={shareApp}
                setShareApp={setShareApp}

                feedback={feedback}
                setFeedback={setFeedback}
            />
        </>
        ;

}
export default ProfileOptController;