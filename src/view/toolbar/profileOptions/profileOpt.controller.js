import React, {useState} from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {loginData, userAvatarState, idiomaState, darkModeAtom} from '../../../components/recoil/atoms';
import ProfileOptView, {DialogPass} from './profileOpt.view';
import useLogout from '../../../utils/useLogout';
import text from './idioma.json';
import useAxiosHook from '../../../utils/axiosHook';
import useNotificationHook from '../../../components/uiComponents/notification/notification.hook';

const ProfileOptController = props => {

    const [changePass, setChangePassword] = useState(false);
    const [idioma, setIdioma] = useRecoilState(idiomaState);
    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom);
    const userData = useRecoilValue(loginData);
    const avatarUrl = useRecoilValue(userAvatarState);
    const logout = useLogout();
    const {postRequest} = useAxiosHook();
    const {openErrorNotification} = useNotificationHook();

    const changeTheme = () => {
        
        localStorage.setItem('darkMode', !darkMode);
        setDarkMode(oldMode => !oldMode);
    }


    const setChangePass  = () => {
        setChangePassword(oldState => !oldState);
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


    const [oldPassState, setOldPassState] = useState({value: "", valid: true});
    const [passState, setPassState] = useState({value: "", valid: true});
    const [pass2State, setPass2State] = useState({value: "", valid: true});

    const onOldPassChange = ({target: {value}}) => {
        setOldPassState({...passState, value: value, valid: true});
    }
    const onPassChange = ({target: {value}}) => {
        setPassState({...passState, value: value, valid: true});
        setPass2State({...pass2State, valid: true});
    }
    const onPass2Change = ({target: {value}}) => {
        setPass2State({...pass2State, value: value, valid: true});
    }

    const submitPass = (event) => {
        event.preventDefault();
        if(oldPassState.value.length === 0){
            setOldPassState({...oldPassState, valid: false})
        } else if(passState.value.length < 8){
            setPassState({...passState, valid: false});
        }else if(pass2State.value !== passState.value){
            setPass2State({...pass2State, valid: false});
        }else {

            postRequest({
                url: '/users/changePassword',
                bodyParams: {
                    oldPassword: oldPassState.value, 
                    password: passState.value
                },
                //messageOnError: text.passChangeError[idioma],
                messageOnSuccess: text.passChangeOk[idioma],
                doFnAfterSuccess: resp => {
                    if(resp.status === 200){
                        logout();
                    }
                },
                doFnAfterError: err => {
                    console.log(err.response);
                    if(err.response.status === 403){
                        openErrorNotification(text.passChange403Error[idioma])
                    }else{
                        openErrorNotification(text.passChangeError[idioma])
                    }
                }
            });
        }
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
                setChangePass={setChangePass}
            />
            <DialogPass 
                text={text}
                idioma={idioma}
                open={changePass}
                onClose={setChangePass}

                oldPassState={oldPassState}
                passState={passState}
                pass2State={pass2State}

                onOldPassChange={onOldPassChange}
                onPassChange={onPassChange}
                onPass2Change={onPass2Change}
                submitPass={submitPass}
            />
        </>
        ;

}
export default ProfileOptController;