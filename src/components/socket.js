import openSocket from 'socket.io-client'; 
import {DEFAULT_CONFIG} from '../conf/configuration';
let socket;

const socketClient = 
 {   
    getSocket: () => {
        if(!socket){
            socket = openSocket(DEFAULT_CONFIG.server);
            //socket = openSocket("https://shut-upp-back.herokuapp.com");
            return socket;    
        }
        return socket;
    }
};

export default socketClient;