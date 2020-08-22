import React, {useEffect} from 'react';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import socketClient from '../../utils/socket';
import {addMsgToConversationSelector, friendSelector} from '../recoil/selectors';
import {loginData, activeChatWith, idiomaState} from '../recoil/atoms';
import {useSnackbar} from 'notistack';
import text from './idioma.json';

const RecibedMessageSubscriber = props => {

    const client = socketClient.getSocket();
    const addMsgToConversation = useSetRecoilState(addMsgToConversationSelector);
    const userData = useRecoilValue(loginData);
    const activeChatContactId = useRecoilValue(activeChatWith);
    const {enqueueSnackbar} = useSnackbar();
    const friends = useRecoilValue(friendSelector);
    const idioma = useRecoilValue(idiomaState);
    
    

    useEffect(() => {
        client.on('recived message', ({content, userOriginId, socketIdSender, messageId, datetime, state, sender}) => {
            if(!sender && activeChatContactId !== userOriginId){                
                const contact = friends.find(f => f.contactId === userOriginId);
                enqueueSnackbar(`${contact.nickname} ${text.writingYou[idioma]}`, {variant: 'info'});
            }

            addMsgToConversation({
                contactId: userOriginId,
                messageId: messageId,
                content: content,
                datetime: datetime,
                state: state
            });

            

        });

        return () => client.off('recived message');
    });

    return <></>;

}
export default RecibedMessageSubscriber;