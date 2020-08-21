import React from 'react';
import axios from 'axios';
import {useSetRecoilState} from 'recoil';
import authMidleware from '../authMiddleware';
import useNotificationHook from '../components/uiComponents/notification/notification.hook';
import {DEFAULT_CONFIG} from '../conf/configuration';
import {clearUserDataSelector} from '../components/recoil/atoms';

const useAxiosHook = () => {

    const {openErrorNotification, openSuccessNotification} = useNotificationHook();
    const clearUserData = useSetRecoilState(clearUserDataSelector);

    const postRequest = ({url, bodyParams= {}, doFnAfterSuccess=null, doFnAfterError = null, messageOnSuccess=null, messageOnError=null}) => {
        
        const optimisticAction = token => {
            axios.post(`${DEFAULT_CONFIG.server}${url}`, 
                bodyParams, 
                {
                    headers: {
                        'Authorization': token
                    }
                })
                .then(resp => {
                    if(messageOnSuccess) openSuccessNotification(messageOnSuccess);
                    if(doFnAfterSuccess) doFnAfterSuccess(resp, token);
                })
                .catch(err => {
                    if(messageOnError) openErrorNotification(messageOnError);
                    if(doFnAfterError) doFnAfterError(err);
                })
        }
        const pesimisticAction = () => {            
            clearUserData();
        }
        
        authMidleware(optimisticAction, pesimisticAction);
    };   


    return {postRequest};

}
export default useAxiosHook;