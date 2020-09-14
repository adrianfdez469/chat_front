import React from 'react';

// Eventos
import useNewUserSubscriber from './newUserSubscriber';
import useUserDisconnectSubscriber from './userDisconnectSubscriber';
import useRequestFriendSubscriber from './requestFriendshipSubscriber';
import useAcceptFriendshipSubscriber from './acceptedFriendshipSubscriber';
import useDeclinedFriendshipSubscriber from './declinedFriendshipSubscriber';
import useDeletedContactSubscriber from './deletedContactSubscriber';

import useRecibedMessageSubscriber from './recibedMessageSubscriber';
import useSavedMessageSubscriber from './savedMessageSubscriber';
import useReadedMessageSubscriber from './readedMessageSubscriber';
import useBlokedContactSubscriber from './blokedContactSubscriber';


/*
import IncomingMsgSubscriber from './incomingMsgSubscriber';

*/

const useEvents = props => {

    const {subscribeNewUser, unsSubscribeNewUser} = useNewUserSubscriber();
    const {subscribeDisconnect, unSubscribeDisconnect} = useUserDisconnectSubscriber();
    const {subscribeRequestFriend, unSubscribeRequestFriend} = useRequestFriendSubscriber();
    const {subscribeAcceptedFriendship, unSubscribeAcceptedFriendship} = useAcceptFriendshipSubscriber();
    const {subscribeDeclinedFriendship, unSubscribeDeclinedFriendship} = useDeclinedFriendshipSubscriber();
    const {subscribeDeleteContatct, unSubscribeDeleteContatct} = useDeletedContactSubscriber();
    const {subscribeRecibedMessage, unSubscribeRecibedMessage} = useRecibedMessageSubscriber();
    const {subscribeSavedMessage, unSubscribeSavedMessage} = useSavedMessageSubscriber();
    const {subscribeReadedMessage, unSubscribeReadedMessage} = useReadedMessageSubscriber();
    const {subscribeBlokedContact, unSubscribeBlokedContact} = useBlokedContactSubscriber();



    const subscribeAll = React.useCallback(() => {
        subscribeNewUser();
        subscribeDisconnect();
        subscribeRequestFriend();
        subscribeAcceptedFriendship();
        subscribeDeclinedFriendship();
        subscribeDeleteContatct();
        subscribeRecibedMessage();
        subscribeSavedMessage();
        subscribeReadedMessage();
        subscribeBlokedContact();
    },[]);

    const unSubscribeAll = React.useCallback(() => {
        unsSubscribeNewUser();
        unSubscribeDisconnect();
        unSubscribeRequestFriend();
        unSubscribeAcceptedFriendship();
        unSubscribeDeclinedFriendship();
        unSubscribeDeleteContatct();
        unSubscribeRecibedMessage();
        unSubscribeSavedMessage();
        unSubscribeReadedMessage();
        unSubscribeBlokedContact();
    },[]);



    return {
        subscribeAll: subscribeAll,
        unSubscribeAll: unSubscribeAll
    };

}
export default useEvents;