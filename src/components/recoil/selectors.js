import {selector} from 'recoil';

import {friendsAtom, idiomaState, getConversationWithContact, activeChatWith} from './atoms';

const friendSelector = selector({
    key: 'friendSelector',
    get: ({get}) => {
        if(get(friendsAtom).length > 0){
            const friends = [...get(friendsAtom)];

            return friends.sort(
                (f1,f2) => {
                    
                    if(f1.friendShipStatus === 1 && f2.friendShipStatus === 1){
                        if(f1.socketId && !f2.socketId) return -1;
                        if(!f1.socketId && f2.socketId) return 1;    
                    }
                    if(f1.friendShipStatus < f2.friendShipStatus) return -1; 
                    if(f1.friendShipStatus > f2.friendShipStatus) return 1;
                    if(f1.email < f2.email) return -1; 
                    if(f1.email > f2.email) return 1; 
                }
            );
        }else{
            return [];
        }
        
    },
    set: async ({set, get}, {action, payload}) => {

        switch(action){
            case 'initialize': 
                set(friendsAtom, oldFriends => {
                    if(oldFriends.length === 0){
                        return payload.friends;
                    }
                    return oldFriends;
                });
                break;
            case 'add':
                set(friendsAtom, oldFriends => {
                    const friends = [...oldFriends];
                    friends.push(payload.friend);
                    return friends;
                });
                break;
            case 'update':
                set(friendsAtom, oldFriends => {
                    const fIndex = oldFriends.findIndex(f => f.contactId === payload.friend.contactId);
                    const friends = oldFriends.slice(0, fIndex)
                                            .concat([payload.friend])
                                            .concat(oldFriends.slice(fIndex+1));
                    return friends;
                });
                break;
            case 'reset_cant_no_leidos':
                set(friendsAtom, oldFriends => {
                    const index = oldFriends.findIndex(friend => friend.contactId === payload.contactId);
                    return oldFriends.slice(0, index).concat([{...oldFriends[index], unread: 0}]).concat(oldFriends.slice(index+1));
                });
                break;
            case 'set_message_info': // Para poner la cantidad de mensajes sin leer, el ultimo mensaje y la fecha del ultimo mensaje
                set(friendsAtom, oldFriends => {
                    const data = payload.dataObj;
                    const newFriends = oldFriends.map(friend => {
                        if(data[friend.contactId]){
                            let cantidad = 0;
                            if(friend.unread){
                                cantidad = friend.unread;
                            }
                            if(data[friend.contactId].cantidad){
                                cantidad += data[friend.contactId].cantidad; 
                            }
                            return {...friend, 
                                unread:  cantidad,
                                lastMsg: data[friend.contactId].lastMessage,
                                datetime: data[friend.contactId].datetime
                            }
                        }
                        return friend;
                    });
                    return newFriends;
                });
            break;
            case 'delete':
                const activeChatContactId = get(activeChatWith);
                if(activeChatContactId === payload.friendId){
                    set(activeChatWith, oldActive => {
                        return null;
                    });
                }
                set(friendsAtom, oldFriends => {
                    return oldFriends.filter(f => f.contactId !== payload.friendId);
                });
                break;
            case 'connect':                
                if(Array.isArray(payload.data)){
                    set(friendsAtom, oldFriends => {
                        return oldFriends.map(friend => {
                            const idx = payload.data.findIndex(dat => dat.userId === friend.contactId);
                            if(idx >= 0){
                                return {...friend, socketId: payload.data[idx].socketId};     
                            }
                            return {...friend};
                        });
                    }); 
                }else{

                    const {userId, socketId} = payload.data;
                    let conectedFriendName = null;
                    let friendShipStatus = 0;
                    
                    set(friendsAtom, oldFriends => {
                        const fIndex = oldFriends.findIndex(f => f.contactId === userId);
                        if(fIndex >= 0){
                            conectedFriendName = oldFriends[fIndex].nickname;
                            friendShipStatus = oldFriends[fIndex].friendShipStatus;
                            const updatedFriend = {...oldFriends[fIndex], socketId: socketId };
                        
                            const friends = oldFriends.slice(0, fIndex)
                                                    .concat([updatedFriend])
                                                    .concat(oldFriends.slice(fIndex+1));
                            return friends;
                        }
                        return oldFriends;
                    });
                    if(conectedFriendName && friendShipStatus === 1)
                        payload.notification(`${conectedFriendName} ${payload.msg[get(idiomaState)]}`, {variant: 'info'});
                }                
                break;
            case 'disconnect':
                let disconectedFriendName = null;
                let friendShipStatus = 0;
                
                set(friendsAtom, oldFriends => {
                    
                    const index = oldFriends.findIndex(friend => friend.socketId === payload.socketId);
                    if(index >= 0){
                        disconectedFriendName = oldFriends[index].nickname;
                        friendShipStatus = oldFriends[index].friendShipStatus;
                        return [...oldFriends].slice(0, index).concat([{...oldFriends[index], socketId: null}]).concat(oldFriends.slice(index+1));
                    }
                    return oldFriends;
                });
                if(disconectedFriendName && friendShipStatus === 1)
                    payload.notification(`${disconectedFriendName} ${payload.msg[get(idiomaState)]}`, {variant: 'warning'});
                break;
            
                default: break;
        }
    }
});



const messageStates = {
    'NINGUNO': 0, // Cuando no es enviado por el propio usuario, sino que se lo enviaron a el, por lo que los estados no tienen sentido para este tipo de mensajes
    'ENVIADO': 1,
    'GUARDADO': 2,
    'LEIDO': 3
};

const initConversationSelector = selector({
    key:'conversationSelector',
    set: ({set}, {contactId, conversation}) => {

        const getMessageState = (userOriginId, UserDestinyId, contactId, readed) => {

            if(userOriginId === contactId){
                return 0;
            }else if(UserDestinyId === contactId){
                return readed ? 3 : 2;
            }
        }

        set(getConversationWithContact(contactId), oldConversation => {
            return conversation.map(message => {
                return {
                    _id: message._id,
                    content: message.content,
                    datetime: message.datetime,
                    state: getMessageState(message.userOrigin, message.userDestiny, contactId, message.readed)
                };
            })
        });
    }
});

const addMsgToConversationSelector = selector({
    key: 'addMessageToConversation',
    set: ({set}, {contactId, messageId, content, datetime, state}) => {
        const newMessageObj = {
            _id: messageId,
            content: content,
            datetime: datetime,
            state: state
        };        
        
        set(getConversationWithContact(contactId), oldConversation => {
            return oldConversation.concat([newMessageObj]);
        });

    }
});


const editMsgToStateSavedSelector = selector({
    key: 'editMsgToStateSavedSelector',
    set: ({set}, {contactId, messageId, datetime, consecutive}) => {
        
        set(getConversationWithContact(contactId), oldConversation => {
            
            const index = oldConversation.findIndex(message => message._id === consecutive && message.state === 1);
            if(index >= 0){
                const modMessage = {...oldConversation[index], state: 2, _id: messageId, datetime: datetime};
                return oldConversation.slice(0, index).concat([modMessage]).concat(oldConversation.slice(index+1));
            }
            return oldConversation;
        });
    }
});

const editAllMsgToReadedSelector = selector({
    key: 'editAllMsgToSavedSelector',
    set: ({set}, {contactId}) => {
        set(getConversationWithContact(contactId), oldConversation => {
            return oldConversation
                .map(message => {
                    if(message.state !== 0)
                        return {...message, state: 3}
                    else
                        return message;
                });
        });
    }
});

export {friendSelector, initConversationSelector, addMsgToConversationSelector, editMsgToStateSavedSelector, editAllMsgToReadedSelector}