import {atom} from 'recoil';

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
const newAvatarState = atom({
    key: 'newAvatarState',
    default: null
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

let conversations = {};
const eraseConversationsWithContacts = () => {
    conversations = {};
}
const getConversationWithContact = contactId => {
    if(conversations[contactId]){
        return conversations[contactId];
    }
    
    const atomStore = atom({
        key: `conversationWith_${contactId}`,
        default: []
    });
    conversations[contactId] = atomStore;
    return atomStore;
}



const messagesAtom = atom({
    key: 'messagesAtom',
    default: null
});

const tokenTimeoutAtom = atom({
    key: 'tokenTimeoutAtom',
    default: {
        tokentimeout: 0
    }
});

const darkModeAtom = atom({
    key: 'themeAtom',
    default: localStorage.getItem('darkMode') === 'true' ? true : false
});

const firebaseCurrentUserState = atom({
    key: 'firebaseCurrentUser',
    'default': null
});
const firebaseCurrentTokenState = atom({
    key: 'firebaseCurrentTokenState',
    'default': null
});
/*
const anchorElMenuBtn = atom({
    key: 'anchorElMenuBtn',
    'default': null
});*/


const speedDialStateAtom = atom({
    key: 'speedDialStateAtom',
    'default': false
});





export {idiomaState, loginData, chatConversation, view, contactListState, subscribeToEventsState, 
    backdropState, userAvatarState, newAvatarState,addContactViewOpenState,
    friendsAtom, 
    activeChatWith, messagesAtom, getConversationWithContact, tokenTimeoutAtom, darkModeAtom, firebaseCurrentUserState, firebaseCurrentTokenState, 
    /*anchorElMenuBtn,*/ speedDialStateAtom, eraseConversationsWithContacts
};