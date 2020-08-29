import React from 'react';

// Eventos
import NewUserSubscriber from './newUserSubscriber';
import UserDisconnectSubscriber from './userDisconnectSubscriber';
import IncomingMsgSubscriber from './incomingMsgSubscriber';
import DeclinedFriendshipSubscriber from './declinedFriendshipSubscriber';
import RequestFriendSubscriber from './requestFriendshipSubscriber';
import AcceptFriendshipSubscriber from './acceptedFriendshipSubscriber';
import DeletedContactSubscriber from './deletedContactSubscriber';
import BlokedContactSubscriber from './blokedContactSubscriber';
import RecibedMessageSubscriber from './recibedMessageSubscriber';


const Events = props => {

    return <>
    <NewUserSubscriber />
    <UserDisconnectSubscriber />
    <IncomingMsgSubscriber />
    <RequestFriendSubscriber />
    <DeclinedFriendshipSubscriber />
    <AcceptFriendshipSubscriber />
    <DeletedContactSubscriber />
    <BlokedContactSubscriber />
    <RecibedMessageSubscriber />
</>;

}
export default Events;