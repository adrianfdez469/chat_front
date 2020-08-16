import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {DEFAULT_CONFIG} from '../../conf/configuration'
import authMiddleware from '../../authMiddleware';
import useNotificationHook from '../../components/uiComponents/notification/notification.hook';
import text from './idioma.json';
import {useRecoilValue} from 'recoil';
import {idiomaState} from '../../components/recoil/atoms';


import ContactsView from './contacs.view';



const ContactsController = props => {

    const {openErrorNotification} = useNotificationHook();
    const [contacts, setContacts] = useState([]);
    const idioma = useRecoilValue(idiomaState);


    const searchFriends = () => {
        const optimisticAction = token => {
            axios.post(`${DEFAULT_CONFIG.server}/users/searchFirends`,{

            },{
                headers: {
                    'Authorization': token
                }
            })
            .then(resp => {
                console.log(resp.data.friends);
                if(resp.status === 200){
                    setContacts(resp.data.friends);
                }
            })
            .catch(err => {
                openErrorNotification(text.errorLoadingFriends[idioma])
            });
        }
        authMiddleware(optimisticAction);
    }

    useEffect(() => {
        searchFriends();        
    }, [])

    return <ContactsView 
        idioma={idioma}
        contacts={contacts}
    />;

}
export default ContactsController;