import {atom, selector} from 'recoil';

const getDefaultLanguage= () => {
    let idioma = 'en';
    var userLang = navigator.language || navigator.userLanguage;
    if(/^(es-).+/.test(userLang)){
        idioma = 'es';
    }
    return idioma;
}

const idiomaState = atom({
    key: 'idiomaState',
    default: getDefaultLanguage()
});

const loginData = atom({
    key: 'loginData',
    default: null
});
const userAvatarState = atom({
    key: 'userAvatarState',
    default: null
});
const clearUserDataSelector = selector({
    key: 'clearUserDataSelector',
    set: ({set}) => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_expires');
        localStorage.removeItem('refresh_token_expires');
        set(userAvatarState, null);
        set(loginData, null)
    }
}); 


const chatConversation = atom({
    key: 'chatConversation',
    default: {
        'active': false
    }
});

const contactListState = atom({
    key: 'contactListState',
    default: []
});


const view = {
    posibleViews: {
        LOGIN: 'LOGIN',
        CONTACTS: 'CONTACTS',
        CHAT: 'CHAT'
    },
    getAtom: atom({
        key: 'view',
        default: 'LOGIN'
    })
};

const backdropState = atom({
    key: 'backdropState',
    default: false
});

const subscribeToEventsState = atom({
    key: 'subscribeToEventsState',
    default: false
})



const addContactViewOpenState = atom({
    key: 'addContactViewOpenState',
    default: false
});


const friendsAtom = atom({
    key: 'friendsAtom',
    default: []
});

const friendSelector = selector({
    key: 'friendSelector',
    get: ({get}) => {
        const friends = [...get(friendsAtom)];
        return friends.sort(
            (f1,f2) => {
                if(f1.friendShipStatus < f2.friendShipStatus) return -1; 
                if(f1.friendShipStatus > f2.friendShipStatus) return 1;
                if(f1.email < f2.email) return -1; 
                if(f1.email > f2.email) return 1; 
            }
        );
    },
    set: ({set}, friend) => {
        set(friendsAtom, oldFriends => {
            const friends = [...oldFriends];
            friends.push(friend);
            return friends;
        });
    }
});

const updateFriendSelector = selector({
    key: 'updateFriendSelector',
    set: ({set}, friend) => {
        set(friendsAtom, oldFriends => {
            const fIndex = oldFriends.findIndex(f => f.contactId === friend.contactId);
            const friends = oldFriends.slice(0, fIndex)
                                    .concat([friend])
                                    .concat(oldFriends.slice(fIndex+1));
            return friends;
        });
    }
});

const deleteFriendSelector = selector({
    key: 'deleteFriendSelector',
    set: ({set}, friendId) => {
        set(friendsAtom, oldFriends => {
            return oldFriends.filter(f => f.contactId !== friendId);
        });
    }
});




export {idiomaState, loginData, chatConversation, view, contactListState, subscribeToEventsState, 
    backdropState, userAvatarState, addContactViewOpenState,
    friendsAtom, friendSelector,updateFriendSelector, deleteFriendSelector,
    clearUserDataSelector
};