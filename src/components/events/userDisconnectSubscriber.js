import {useSetRecoilState} from 'recoil';
import {friendSelector} from '../recoil/selectors';
import socket from '../../utils/socket';
import {useSnackbar} from 'notistack';
import text from './idioma.json';

const useDisconnectSubscriber = () => {
    const friendDispatcher = useSetRecoilState(friendSelector);
    const client = socket.getSocket();
    const { enqueueSnackbar } = useSnackbar();

    const subscribeDisconnect = () => {
        client.on('user disconnect', data => {
            friendDispatcher({
                action: 'disconnect', 
                payload: {
                    socketId: data.socketId,
                    notification: enqueueSnackbar,
                    msg: text.disconnected
                }
            })
        });
    };

    const unSubscribeDisconnect = () => {
        client.off('user disconnect')
    };

    return {
        subscribeDisconnect: subscribeDisconnect,
        unSubscribeDisconnect: unSubscribeDisconnect
    };

}

export default useDisconnectSubscriber;