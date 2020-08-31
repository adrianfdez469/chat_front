//import React from 'react';
import axios from 'axios';
import {useRecoilValue} from 'recoil';
import authMidleware from '../authMiddleware';
import useNotificationHook from '../components/uiComponents/notification/notification.hook';
import {DEFAULT_CONFIG} from '../conf/configuration';
import {idiomaState} from '../components/recoil/atoms';
//import useBackdrop from '../components/uiComponents/backdrop/useBackdrop';

const useAxiosHook = () => {

    const {openErrorNotification, openSuccessNotification} = useNotificationHook();
    const {idioma} = useRecoilValue(idiomaState);
    //const {closeBackDrop, showBackDrop} = useBackdrop();

    const postRequest = ({url, bodyParams= {}, doFnAfterSuccess=null, doFnAfterError = null, messageOnSuccess=null, messageOnError=null}) => {
        
        const optimisticAction = token => {
            //showBackDrop();
            axios.post(`${DEFAULT_CONFIG.server}${url}`, 
                bodyParams, 
                {
                    headers: {
                        'Authorization': token
                    }
                })
                .then(resp => {
                    //closeBackDrop();
                    if(messageOnSuccess) openSuccessNotification(messageOnSuccess);
                    if(doFnAfterSuccess) doFnAfterSuccess(resp, token);
                })
                .catch(err => {
                    //closeBackDrop();
                    if(!err.status){
                        const connMsgError = {"es": "Error de conexión", "en": "Network error"};
                        openErrorNotification(connMsgError[idioma]);
                    }else if(messageOnError) openErrorNotification(messageOnError);

                    if(doFnAfterError) doFnAfterError(err);
                })
        }
        /*const pesimisticAction = () => {            
            clearUserData();
        }*/
        
        authMidleware(optimisticAction/*, pesimisticAction*/);
    };   


    return {postRequest};

}
export default useAxiosHook;