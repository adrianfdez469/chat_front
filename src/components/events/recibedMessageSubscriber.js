import React, {useEffect} from 'react';
import {useSetRecoilState, useRecoilValue, useRecoilState} from 'recoil';
import socketClient from '../../utils/socket';
import {addMsgToConversationSelector, friendSelector, editMsgToStateSavedSelector, editAllMsgToReadedSelector} from '../recoil/selectors';
import {loginData, activeChatWith, idiomaState} from '../recoil/atoms';
import {useSnackbar} from 'notistack';
import text from './idioma.json';

const RecibedMessageSubscriber = props => {

    const client = socketClient.getSocket();
    const addMsgToConversation = useSetRecoilState(addMsgToConversationSelector);
    const editMsgToStateSaved = useSetRecoilState(editMsgToStateSavedSelector);
    const editAllMsgToReaded = useSetRecoilState(editAllMsgToReadedSelector);
    const userData = useRecoilValue(loginData);
    const activeChatContactId = useRecoilValue(activeChatWith);
    const {enqueueSnackbar} = useSnackbar();
    const [friends, friendDispatcher] = useRecoilState(friendSelector);
    const idioma = useRecoilValue(idiomaState);
    
    

    useEffect(() => {
        client.on('recived message', ({content, userOriginId, socketIdSender, messageId, datetime, consecutive}) => {
            
            const contact = friends.find(f => f.contactId === userOriginId);
            if(activeChatContactId !== userOriginId){                
                enqueueSnackbar(`${contact.nickname} ${text.writingYou[idioma]}`, {variant: 'info'});

                const dataObj = {
                    [userOriginId]: {
                        cantidad: 1,
                        lastMessage: content,
                        datetime: datetime
                    }
                };
                
                friendDispatcher({
                    action: 'set_message_info',
                    payload: {
                        dataObj: dataObj
                    }
                });

            }else{

                const dataObj = {
                    [userOriginId]: {
                        cantidad: 0,
                        lastMessage: content,
                        datetime: datetime
                    }
                };
                
                friendDispatcher({
                    action: 'set_message_info',
                    payload: {
                        dataObj: dataObj
                    }
                });

                const client = socketClient.getSocket();
                client.emit('read messages', {
                    userId: userData.userId,
                    contactId: contact.contactId,
                    notifyTo: contact.socketId,
                    token: localStorage.getItem('token')
                });
            }
            addMsgToConversation({
                contactId: userOriginId,
                messageId: messageId,
                content: content,
                datetime: datetime,
                state: 0
            });
        });

        client.on('saved message', ({contactId, messageId, datetime,consecutive,soketIdContact}) => {
            editMsgToStateSaved({
                contactId: contactId,
                messageId: messageId,
                datetime: datetime,
                consecutive: consecutive
            });
        });

        client.on('readed messages', ({contactId}) => {
            editAllMsgToReaded({contactId})
        });

        return () => {
            client.off('recived message');
            client.off('saved message');
            client.off('readed messages');
        };
    });

    return <></>;

}
export default RecibedMessageSubscriber;