import openSocket from 'socket.io-client'; 
import {DEFAULT_CONFIG} from '../conf/configuration';
let socket;

const socketClient = 
 {   
    getSocket: () => {
        if(!socket){
            socket = openSocket(DEFAULT_CONFIG.server);
            return socket;    
        }
        return socket;
    },
    close: () => {
        socket.close();
    }
};

export default socketClient;