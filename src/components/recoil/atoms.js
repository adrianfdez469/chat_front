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
})

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

const userAvatarState = atom({
    key: 'userAvatarState',
    default: null
});

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
})


export {idiomaState, loginData, chatConversation, view, contactListState, subscribeToEventsState, 
    backdropState, userAvatarState, addContactViewOpenState,
    friendsAtom, friendSelector
};