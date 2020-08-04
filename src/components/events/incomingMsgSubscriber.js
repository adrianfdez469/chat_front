import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {chatConversation} from '../recoil/atoms';
import socket from '../socket'
const IncomingMsgSubscriber = props => {

    const [conversation, setConvertation] = useRecoilState(chatConversation);
    const client = socket.getSocket();
    
    useEffect(() => {

        client.on('message', data => {
            const newStateObj = {...conversation};
            if(conversation[data._id]){
                newStateObj[data._id] = {...conversation[data._id]};
                if(conversation[data._id].text){
                    newStateObj[data._id].text = [...conversation[data._id].text, {myMsg: false, msg: data.msg}];
                    
                    

                    if(data._id !== newStateObj.active){
                        newStateObj[data._id].novistos = newStateObj[data._id].novistos + 1; 
                    }
                }else{
                    newStateObj[data._id].text = [];
                }
                
            }else{
                newStateObj[data._id] = {
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