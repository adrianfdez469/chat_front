
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

const activeChatWith = atom({
    key: 'activeChatWith',
    default: null
});

const getConversationWithContact = contactId => atom({
    key: `conversationWith_${contactId}`,
    default: []
});

const messagesAtom = atom({
    key: 'messagesAtom',
    default: null
});

export {idiomaState, loginData, chatConversation, view, contactListState, subscribeToEventsState, 
    backdropState, userAvatarState, addContactViewOpenState,
    friendsAtom, 
    clearUserDataSelector,
    activeChatWith, messagesAtom, getConversationWithContact
};