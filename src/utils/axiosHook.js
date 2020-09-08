//import React from 'react';
import axios from 'axios';
import {useRecoilValue} from 'recoil';
import useNotificationHook from '../components/uiComponents/notification/notification.hook';
import {DEFAULT_CONFIG} from '../conf/configuration';
import {idiomaState, firebaseCurrentTokenState} from '../components/recoil/atoms';
import firebase from './firebase';
import useLogout from './useLogout';

const text = {
    errConn: {
        es: "Error de conexión",
        en: "Network error"
    },
    getTokenIdError: {
        es: "Su sesión ha expirado",
        en: "Expired session"
    }
}

const useAxiosHook = () => {

    const {openErrorNotification, openSuccessNotification} = useNotificationHook();
    const idioma = useRecoilValue(idiomaState);
    const firebaseCurrentToken = useRecoilValue(firebaseCurrentTokenState);
    const logout = useLogout();
    //const {closeBackDrop, showBackDrop} = useBackdrop();

    const postRequest = ({url, bodyParams= {}, doFnAfterSuccess=null, doFnAfterError = null, messageOnSuccess=null, messageOnError=null}) => {
        
        const getAxiosRequest = idToken => axios.post(`${DEFAULT_CONFIG.server}${url}`, 
            bodyParams, 
            {
                headers: {
                    'Authorization': idToken
                }
            })
            .then(resp => {
                if(messageOnSuccess) openSuccessNotification(messageOnSuccess);
                if(doFnAfterSuccess) doFnAfterSuccess(resp, idToken);
                return resp;
            })
            .catch(err => {
                if(!err.response){
                    openErrorNotification(text.errConn[idioma]);                       
                }else if(messageOnError) openErrorNotification(messageOnError);

                if(doFnAfterError) doFnAfterError(err);
                return err;
            })
    

        if(firebaseCurrentToken){
            return getAxiosRequest(firebaseCurrentToken)
                .catch(err => {
                    console.log('Error al realizar la peticion con el token guardado en recoil state, asi que intentamos usando firebase');
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return getAxiosRequest(idToken);
                        })
                        .catch(err => {
                            console.log('Error al realizar la peticion con el token proveniente de firebase');
                            logout();
                            return err;
                        });
                })
        }
    };   

    return {postRequest};

}
export default useAxiosHook;