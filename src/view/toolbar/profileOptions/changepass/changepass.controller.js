import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {idiomaState} from '../../../../components/recoil/atoms';
import useLogout from '../../../../utils/useLogout';
import useAxiosHook from '../../../../utils/axiosHook';
import useNotificationHook from '../../../../components/uiComponents/notification/notification.hook';
import ChangepassView from './changepass.view';
import text from './idioma.json';

const ChangepassController = () => {

    const idioma = useRecoilValue(idiomaState);
    const logout = useLogout();
    const {postRequest} = useAxiosHook();
    const {openErrorNotification} = useNotificationHook();

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
                messageOnSuccess: text.passChangeOk[idioma],
                doFnAfterSuccess: resp => {
                    if(resp.status === 200){
                        logout();
                    }
                },
                doFnAfterError: err => {
                    if(!err.response){
                        openErrorNotification(text.connError[idioma]);
                    }else if(err.response.status === 403){
                        openErrorNotification(text.passChange403Error[idioma])
                    }else{
                        openErrorNotification(text.passChangeError[idioma])
                    }
                }
            });
        }
    }

    return <ChangepassView 
        text={text}
        idioma={idioma}

        oldPassState={oldPassState}
        passState={passState}
        pass2State={pass2State}

        onOldPassChange={onOldPassChange}
        onPassChange={onPassChange}
        onPass2Change={onPass2Change}
        submitPass={submitPass}
    />;

}

export default ChangepassController;