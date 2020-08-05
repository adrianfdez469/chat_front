import openSocket from 'socket.io-client'; 
let socket;

const socketClient = 
 {   
    getSocket: () => {
        if(!socket){
            socket = openSocket("http://localhost:3001");
            //socket = openSocket("https://shut-upp-back.herokuapp.com");
            return socket;    
        }
        return socket;
    }
};

export default socketClient;