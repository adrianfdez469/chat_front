import {useSetRecoilState} from 'recoil';
import socketClient from '../../utils/socket';
import { editMsgToStateSavedSelector} from '../recoil/selectors';


const useSavedMessageSubscriber = props => {

    const client = socketClient.getSocket();
    const editMsgToStateSaved = useSetRecoilState(editMsgToStateSavedSelector);
    

    const subscribeSavedMessage = () => {
        client.on('saved message', ({contactId, messageId, datetime,consecutive,soketIdContact}) => {
            editMsgToStateSaved({
                contactId: contactId,
                messageId: messageId,
                datetime: datetime,
                consecutive: consecutive
            });
        });
    }

    const unSubscribeSavedMessage = () => {
        client.off('saved message');
    }

    return {
        subscribeSavedMessage: subscribeSavedMessage,
        unSubscribeSavedMessage: unSubscribeSavedMessage
    };

}
export default useSavedMessageSubscriber;