import axios from 'axios';
import {DEFAULT_CONFIG} from './conf/configuration'
import {useSetRecoilState} from 'recoil';
import { loginData} from './components/recoil/atoms';

/*                                                       VERIFICO SI HAY UN AUTH TOKEN VALIDO 
                                                                 /                       \
                                                                /                         \
                                                               SI                         NO
                                                              /                             \
                                                             /                               \
                                                BUSCO DATOS DEL USUARIO         VERIFICO SI SE PUEDE BUSCAR UNO
                                           Y SIGO EL FLUJO SIN AUTENTICACION      A PARTIR DE UN REFRESH TOKEN   
                                                                                    /                      \
                                                                                   /                        \
                                                                                  NO                        SI
                                                                                 /                            \
                                                                                /                              \
                                                                             LOGIN                    OBTENGO EL AUTH TOKEN
                                                                                                                 \
                                                                                                                  \
                                                                                                          BUSCO DATOS DEL USUARIO
                                                                                                    Y SIGO EL FLUJO SIN AUTENTICACION


  */

const AuthMiddleware = (nextOptimisticAction, nextPesimisticAction = null) => {
    // Revisar si el token esta en timepo
    const token = localStorage.getItem('token');
    const token_expires = localStorage.getItem('token_expires');

    

    if (token && token_expires && new Date(token_expires).getTime() > new Date().getTime()) {
      console.log('ejecuta optimistic 1');
      return nextOptimisticAction(token);
    } else {
      const refresh_token = localStorage.getItem('refresh_token');
      const refresh_token_expires = localStorage.getItem('refresh_token_expires');
      if (refresh_token && refresh_token_expires && new Date(refresh_token_expires).getTime() > new Date().getTime()) {
        console.log('ejecuta optimistic 2');
        return axios.post(`${DEFAULT_CONFIG.server}/users/refreshtoken`, {
          expiredToken: token, refresh_token: refresh_token
        })
        .then(resp => {
          if(resp.status === 200){
            const {new_token, new_refresh_token, new_token_expires, new_refresh_token_expires} = resp.data;
            localStorage.setItem('token', new_token);
            localStorage.setItem('refresh_token', new_refresh_token);
            localStorage.setItem('token_expires', new_token_expires);
            localStorage.setItem('refresh_token_expires', new_refresh_token_expires);
            return nextOptimisticAction(new_token);
          }          
        })
        .catch(err => {
            if(nextPesimisticAction)
                return nextPesimisticAction();
            
        });
      } else {
            if(nextPesimisticAction)
                return nextPesimisticAction();
            
      }
    }
  }
  
  export default AuthMiddleware;