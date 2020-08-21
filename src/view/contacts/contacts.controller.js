import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {DEFAULT_CONFIG} from '../../conf/configuration'
import authMiddleware from '../../authMiddleware';
import useNotificationHook from '../../components/uiComponents/notification/notification.hook';
import text from './idioma.json';
import {useRecoilValue, useRecoilState, useSetRecoilState} from 'recoil';
import {idiomaState, subscribeToEventsState/*friendSelector*/ /*, friendsAtom*/} from '../../components/recoil/atoms';
import {friendSelector} from '../../components/recoil/selectors';

import ContactsView from './contacs.view';



const ContactsController = props => {

    const setSubscribeToEvents = useSetRecoilState(subscribeToEventsState);
    const {openErrorNotification} = useNotificationHook();
    //const setContacts = useSetRecoilState(friendsAtom);
    
    //const [contacts, addContact] = useRecoilState(friendSelector);
    const [contacts, friendDispatcher] = useRecoilState(friendSelector);

    const idioma = useRecoilValue(idiomaState);


    const searchFriends = () => {
        console.log('Cargando listado de amigos...');
        
        const optimisticAction = token => {
            axios.post(`${DEFAULT_CONFIG.server}/users/searchFirends`,{},
            {
                headers: {
                    'Authorization': token
                }
            })
            .then(resp => {
                if(resp.status === 200){
                    friendDispatcher({
                        action: 'initialize', 
                        payload: {
                            friends: resp.data.friends
                        }});
                }
            })
            .then(() => {
                setSubscribeToEvents(true);
            })
            .catch(err => {
                openErrorNotification(text.errorLoadingFriends[idioma])
            });
        }
        authMiddleware(optimisticAction);
    }

    useEffect(() => {
        searchFriends();
    }, []);

    return <ContactsView 
        idioma={idioma}
        contacts={contacts}
        text={text}

    />;

}

export default ContactsController;