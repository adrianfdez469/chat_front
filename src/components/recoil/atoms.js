import {atom} from 'recoil';

const idiomaState = atom({
    key: 'idiomaState',
    default: 'es'
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

const subscribeToEventsState = atom({
    key: 'subscribeToEventsState',
    default: false
})

export {idiomaState, loginData, chatConversation, view, contactListState, subscribeToEventsState};