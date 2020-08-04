import React, {useRef, useEffect} from 'react';
import {useRecoilValue, useRecoilState, useSetRecoilState} from 'recoil';
import {idiomaState, chatConversation, loginData, view} from '../recoil/atoms';
import text from './idioma.json';
import Message from './message';
import socket from '../socket';
import FriendHeader from './friendHeader/friendHeader';

const Chat = props => {

    const idioma = useRecoilValue(idiomaState);
    const loginDataUser = useRecoilValue(loginData);
    const [conversation, setConvertation] = useRecoilState(chatConversation);
    const refAreaTexto = useRef('');
    const setView = useSetRecoilState(view.getAtom);

    const client = socket.getSocket();
    
    const sendMsg = () => {
        
        const oldtext = refAreaTexto.current.innerText;
        const text = oldtext.replace(/^(\s*\r*)(.)(\s*\r*)$/, '$2');
        if(text !== ''){
            const newStateObj = {...conversation};
            newStateObj[newStateObj.active] = {...newStateObj[conversation.active]};
            newStateObj[newStateObj.active].text = [...newStateObj[newStateObj.active].text, {myMsg: true, msg: text}];
            setConvertation(newStateObj);
            client.emit('message', {from: loginDataUser._id, toUserId: conversation.active, toSocketId: conversation[conversation.active].socketId, msg: text});
            refAreaTexto.current.innerText = '';
            refAreaTexto.current.focus();
        }
        
    };

    useEffect(() => {
        var element = document.getElementById('chatConversation');
        if(element)
            element.scrollTop = element.scrollHeight;
    });

    

    const goBack = () => {
        setView(view.posibleViews.CONTACTS);
        setConvertation({...conversation, active: null});
    }

    const keyPress = (event) => {
        if(conversation.activeOnline){
            if(event.charCode === 13){
                sendMsg();
                
            }
        }
        
    }

    return (
        <div id="chatContainer">
            <FriendHeader backClick={goBack} nickname={conversation[conversation.active].nickname} online={conversation.activeOnline}/>
            
            <div id="chatConversation">
                {conversation[conversation.active].text.map((elem, idx, arr) => {
                    const style = {};

                    if(arr[idx + 1] && elem.myMsg === arr[idx+1].myMsg){
                        style.marginBottom = '-3px';
                        style.borderRadius = elem.myMsg ? "10px 0px 10px 10px" : "0 10px 10px 10px";
                    }
                    if(idx > 0 && elem.myMsg === arr[idx-1].myMsg){
                        style.borderRadius = elem.myMsg ? "10px 10px 10px 10px" : "10px 10px 10px 10px";
                    }
                    
                    return <Message {...elem} key={idx} style={style}/>
                })}
            </div>

            <div id="editor"> 
                <div id="textarea" role="textbox" contentEditable={conversation.activeOnline} ref={refAreaTexto} onKeyPress={keyPress}></div>
                <button id="sendButton" disabled={!conversation.activeOnline} onClick={sendMsg}>{text.btnSend[idioma]}</button>
            </div>

        </div>
    );

}
export default Chat;