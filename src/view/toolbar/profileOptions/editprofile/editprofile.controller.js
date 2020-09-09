import React, {useState} from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {loginData, idiomaState, userAvatarState} from '../../../../components/recoil/atoms';
import useAxiosHook from '../../../../utils/axiosHook';
import useNotification from '../../../../components/uiComponents/notification/notification.hook';
import EditProfileView from './editprofile.view';
import text from './idioma.json'; 

const EditProfileController = ({close}) => {

    const idioma = useRecoilValue(idiomaState);
    const avatarSrc = useRecoilValue(userAvatarState);
    const [userData, setUserData] = useRecoilState(loginData);
    const {postRequest} = useAxiosHook();
    const {openErrorNotification} = useNotification();

    const [emailState, setEmailState] = useState({value: userData.email, valid: true});
    const [nicknameState, setNickNameState] = useState({value: userData.nickname, valid: true});    
    const [nameState, setNameState] = useState({value: userData.firstName, valid: true});  
    const [lastName, setLastName] = useState({value: userData.lastName, valid: true});
    const [gender, setGender] = useState(userData.gender === "F" ? true : false);  
    
    
    const onNameChange = ({target: {value}}) => {
        setNameState(oldState => ({...oldState, value: value, valid: true}));
    };
    const onLastNameChange = ({target: {value}}) => {
        setLastName(oldState => ({...oldState, value: value, valid: true}));
    };
    const onEmailChange = ({target:{value}}) => {
        setEmailState(oldState => ({...oldState, value: value, valid: true}));
    }
    const onNickNameChange = ({target: {value}}) => {
        setNickNameState(oldState => ({...oldState, value: value, valid: true}));
    }
    const onSwitchGender = ({target: {checked}}) => {
        setGender(oldState => !oldState);
    }

    const onSave =(event) => {
        event.preventDefault();
        if(!/^[a-zA-Z\']+$/.test(nameState.value)){
            setNameState({...nameState, valid: false, msg: 'nameInvalid'});
        }else
        if(nameState.value.length < 2){
            setNameState({...nameState, valid: false, msg: 'nameShort'});
        }else
        if(nameState.value.length >= 20){
            setNameState({...nameState, valid: false, msg: 'nameLong'});
        }else
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailState.value)){
            setEmailState({...emailState, valid: false});
        }else
        if(nicknameState.value.length === 0){
            setNickNameState({...nicknameState, valid: false, msg: 'nicknameNull'});
        }else
        {
            const newUserData = {
                firstName: nameState.value,
                lastName: lastName.value,
                nickname: nicknameState.value,
                email: emailState.value,
                gender: gender ? 'F' : 'M'
            }; 

            postRequest({
                url: '/users/editprofile',
                bodyParams: newUserData,
                messageOnSuccess: text.onSaveSuccess[idioma],
                doFnAfterError: err => {
                    if(!err.response){
                        openErrorNotification(text.connError[idioma]);
                    }
                    else if(err.response.status === 409){
                        openErrorNotification(text.duplicated[idioma]);
                    }else{
                        openErrorNotification(text.error[idioma]);
                    }
                },
                doFnAfterSuccess: resp => {
                    setUserData({...userData, ...newUserData});
                    close();
                }
            })
        }
    }


    return <EditProfileView 
        userData={userData}
        text={text}
        idioma={idioma}

        lastName={lastName}
        nameState={nameState}
        nicknameState={nicknameState}
        emailState={emailState}
        gender={gender}
        
        onNameChange={onNameChange}
        onEmailChange={onEmailChange}
        onNickNameChange={onNickNameChange}
        onLastNameChange={onLastNameChange}
        onSwitchGender={onSwitchGender}

        avatarSrc={avatarSrc}

        onSave={onSave}

    />;
}
export default EditProfileController;