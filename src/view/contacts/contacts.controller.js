import React, { useEffect} from 'react';
import text from './idioma.json';
import {useRecoilValue, useRecoilState, useSetRecoilState} from 'recoil';
import {idiomaState, subscribeToEventsState/*friendSelector*/ /*, friendsAtom*/} from '../../components/recoil/atoms';
import {friendSelector} from '../../components/recoil/selectors';
import useAxiosHook from '../../utils/axiosHook';

import ContactsView from './contacs.view';



const ContactsController = props => {

    const setSubscribeToEvents = useSetRecoilState(subscribeToEventsState);
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
        }else{
            console.log('NO LOS MANDA A BUSCAR');
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