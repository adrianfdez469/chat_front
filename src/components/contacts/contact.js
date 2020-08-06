import React from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {chatConversation, view} from '../recoil/atoms';
import VisualAvatar from './avatar';

const Contact = ({nickname, socketId}) => {
    const [conversation, setConversation] = useRecoilState(chatConversation);
    const setView = useSetRecoilState(view.getAtom);
    
    const cantidad = conversation[socketId]?.novistos ? conversation[socketId].novistos : 0;
    let lastMessage = '';
    if(conversation[socketId] && conversation[socketId].text){        
        lastMessage = conversation[socketId].text[conversation[socketId].text.length-1]?.msg ? conversation[socketId].text[conversation[socketId].text.length-1].msg : '';
    }
    

    const startConvertation = () => {
        
        const newConversation = {...conversation, active: socketId, activeOnline: true};
        if(!newConversation[socketId]) {
            newConversation[socketId] = {
                nickname: nickname,
                text: [],
                socketId: socketId,
                novistos: 0
            };            
        }else{
            newConversation[socketId] = {
                nickname: nickname,
                socketId: socketId,
                text: [...conversation[socketId].text],
                novistos: 0
            }
        }
        setConversation(newConversation);
        setView(view.posibleViews.CHAT);
    };  

    return (
        <div className='contact contact-item' onClick={startConvertation}>
            <VisualAvatar novistos={cantidad}/>
            <div className='contactBody'>
                <div className='status'>
                    <span className="nickname">{nickname}</span>
                    <span className="connectionStatus"></span>
                </div>
                <div className="lastMsg">{lastMessage}</div>
            </div>
        </div>
    );

}
export default Contact;