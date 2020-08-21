import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {chatConversation} from '../recoil/atoms';
import socket from '../../utils/socket'
const IncomingMsgSubscriber = props => {

    const [conversation, setConvertation] = useRecoilState(chatConversation);
    const client = socket.getSocket();
    
    useEffect(() => {

        client.on('message', data => {
            const newStateObj = {...conversation};
            if(conversation[data.socketId]){
                newStateObj[data.socketId] = {...conversation[data.socketId]};
                if(conversation[data.socketId].text){
                    newStateObj[data.socketId].text = [...conversation[data.socketId].text, {myMsg: false, msg: data.msg}];
                    
                    

                    if(data.socketId !== newStateObj.active){
                        newStateObj[data.socketId].novistos = newStateObj[data.socketId].novistos + 1; 
                    }
                }else{
                    newStateObj[data.socketId].text = [];
                }
                
            }else{
                newStateObj[data.socketId] = {
                    text: [{myMsg: false, msg: data.msg}],
                    nickname: null,
                    socketId: null,
                    novistos: 1
                }
            }
            setConvertation(newStateObj);
        });

        return () => client.off('message');
    }, [conversation]);

    return (
        <></>
    );

}
export default IncomingMsgSubscriber;