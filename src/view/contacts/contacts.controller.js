import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {DEFAULT_CONFIG} from '../../conf/configuration'
import authMiddleware from '../../authMiddleware';
import useNotificationHook from '../../components/uiComponents/notification/notification.hook';
import text from './idioma.json';
import {useRecoilValue, useRecoilState, useSetRecoilState} from 'recoil';
import {idiomaState, subscribeToEventsState/*friendSelector*/ /*, friendsAtom*/} from '../../components/recoil/atoms';
import {friendSelector} from '../../components/recoil/selectors';
import useAxiosHook from '../../utils/axiosHook';

import ContactsView from './contacs.view';



const ContactsController = props => {

    const setSubscribeToEvents = useSetRecoilState(subscribeToEventsState);
    const {openErrorNotification} = useNotificationHook();
    //const setContacts = useSetRecoilState(friendsAtom);
    const {postRequest} = useAxiosHook();
    
    //const [contacts, addContact] = useRecoilState(friendSelector);
    const [contacts, friendDispatcher] = useRecoilState(friendSelector);

    const idioma = useRecoilValue(idiomaState);

    const getFriendData = () => {
        postRequest({
            url: '/users/getContactData',
            messageOnError: text.errorLoadingFriendsData[idioma],
            doFnAfterSuccess: resp => {
                if(resp.status === 200){
                    friendDispatcher({
                        action: 'set_message_info',
                        payload: {
                            dataObj: resp.data.contactsData
                        }
                    });
                }
            }
        });
    }
    const searchFriends = () => {
        if(contacts.length === 0){
            postRequest({
                url: '/users/searchFirends',
                messageOnError: text.errorLoadingFriends[idioma],
                doFnAfterSuccess: resp => {
                    if(resp.status === 200){
                        friendDispatcher({
                            action: 'initialize', 
                            payload: {
                                friends: resp.data.friends
                            }});
                        setSubscribeToEvents(true);
                        if(resp.data.friends.length > 0){
                            getFriendData();
                        }
                    }
                }
            });
        }
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