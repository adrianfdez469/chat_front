//import React from 'react';
import {useSetRecoilState} from 'recoil';
import axios from 'axios';
import {tokenTimeoutAtom} from '../components/recoil/atoms';
import useLogout from './useLogout';
import {DEFAULT_CONFIG} from '../conf/configuration'

const useRefreshToken = () => {

    const setTokenTimeout = useSetRecoilState(tokenTimeoutAtom);
    const logout = useLogout();

    const token = localStorage.getItem('token');
    const refresh_token = localStorage.getItem('refresh_token');
    const refresh_token_expires = localStorage.getItem('refresh_token_expires');
    
    const refreshToken = () => {
        if (refresh_token && refresh_token_expires && new Date(refresh_token_expires).getTime() > new Date().getTime()) {
            console.log('Antes de llamar al endpoint refreshtoken');
            
            return axios.post(`${DEFAULT_CONFIG.server}/users/refreshtoken`, {
                token: token, refresh_token: refresh_token
              })
              .then(resp => {
                if(resp.status === 200){
                  const {new_token, new_refresh_token, new_token_expires, new_refresh_token_expires} = resp.data;
                  localStorage.setItem('token', new_token);
                  localStorage.setItem('refresh_token', new_refresh_token);
                  localStorage.setItem('token_expires', new_token_expires);
                  localStorage.setItem('refresh_token_expires', new_refresh_token_expires);
                  setTokenTimeout({
                        timeleft: new_token_expires
                  })
                  console.log('token refrescado');
                  
                }          
              })
              .catch(err => {
                  console.log('Error que dio el endpoint');
                  
                  logout();
              });
    
        }else{
            console.log('Las condiciones del if no se cumplieron');
            
            logout();
        }
    }
    
    return refreshToken;
  }

  export default useRefreshToken;