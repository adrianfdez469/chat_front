import openSocket from 'socket.io-client'; 
import conf from '../conf.json';
let socket;

const socketClient = 
 {   
    getSocket: () => {
        if(!socket){
            socket = openSocket("http://localhost:3001");
            return socket;    
        }
        return socket;
    }
};

export default socketClient;