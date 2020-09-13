
import {useSetRecoilState} from 'recoil';
import socketClient from '../../utils/socket';
import {editAllMsgToReadedSelector} from '../recoil/selectors';

const useReadedMessageSubscriber = props => {

    const client = socketClient.getSocket();
    const editAllMsgToReaded = useSetRecoilState(editAllMsgToReadedSelector);

    const subscribeReadedMessage = () => {
        client.on('readed messages', ({contactId}) => {
            editAllMsgToReaded({contactId})
        });
    }

    const unSubscribeReadedMessage = () => {
        client.off('readed messages');
    }



    return {
        subscribeReadedMessage: subscribeReadedMessage,
        unSubscribeReadedMessage: unSubscribeReadedMessage
    };

}
export default useReadedMessageSubscriber;