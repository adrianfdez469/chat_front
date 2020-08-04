import React from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {chatConversation, view} from '../recoil/atoms';
import VisualAvatar from './avatar';

const Contact = ({nickname, _id, socketId}) => {
    const [conversation, setConversation] = useRecoilState(chatConversation);
    const setView = useSetRecoilState(view.getAtom);
    
    const cantidad = conversation[_id]?.novistos ? conversation[_id].novistos : 0;
    let lastMessage = '';
    if(conversation[_id] && conversation[_id].text){        
        lastMessage = conversation[_id].text[conversation[_id].text.length-1]?.msg ? conversation[_id].text[conversation[_id].text.length-1].msg : '';
    }
    

    const startConvertation = () => {
        
        const newConversation = {...conversation, active: _id, activeOnline: true};
        if(!newConversation[_id]) {
            newConversation[_id] = {
                nickname: nickname,
                text: [],
                socketId: socketId,
                novistos: 0
            };            
        }else{
            newConversation[_id] = {
                nickname: nickname,
                socketId: socketId,
                text: [...conversation[_id].text],
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

            {/*<button className={classes.options}>...</button>*/}
        </div>
    );

}
export default Contact;