import React, {useRef, useEffect, useState} from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {loginData, activeChatWith, idiomaState} from '../../../components/recoil/atoms';
import {friendSelector, addMsgToConversationSelector} from '../../../components/recoil/selectors';
import useNotification from '../../../components/uiComponents/notification/notification.hook';
import ChatEditorView from './chatEditor.view';
import socketClient from '../../../utils/socket';
import text from './idioma.json';

const ChatEditorController = props => {

    const {openWarningNotification} = useNotification();
    const userData = useRecoilValue(loginData);
    const idioma = useRecoilValue(idiomaState);
    const addMsgToConversation = useSetRecoilState(addMsgToConversationSelector);
    const idContact = useRecoilValue(activeChatWith);
    const friends = useRecoilValue(friendSelector);
    const contact = friends.find(f => f.contactId === idContact);
    const refAreaTexto = useRef('');
    const [consecutive, setConsecutive] = useState(0);


    const sendMessage = () => {

        const oldtext = refAreaTexto.current.innerText;
        const text = oldtext.replace(/^(\s*\r*)(.)(\s*\r*)$/, '$2');
        if(text !== ''){
            addMsgToConversation({
                contactId: contact.contactId,
                messageId: consecutive,//messageId,
                content: refAreaTexto.current.innerText,
                datetime: new Date(),
                state: 1
            });
            setConsecutive(prev => prev + 1);

            const client = socketClient.getSocket();
            client.emit('send message', {
                content: refAreaTexto.current.innerText,
                userOriginId: userData.userId,
                userDestinyId: idContact,
                toSocketId: contact.socketId,
                token: localStorage.getItem('token'),
                consecutive: consecutive
            });

            refAreaTexto.current.innerText = '';
            refAreaTexto.current.focus();
        }
    }

    const keyPress = (event) => {
        
        if(event.charCode === 13){
            event.preventDefault();
            sendMessage();
        }
    }

    useEffect(() => {
        contact.friendShipStatus === 1 ? refAreaTexto.current.focus() : openWarningNotification(text.notEditable[idioma]);
    }, []);

    return contact.friendShipStatus === 1 ? <ChatEditorView 
        sendMessage={sendMessage}
        keyPress={keyPress}
        refAreaTexto={refAreaTexto}
    /> : null;

}
export default ChatEditorController;