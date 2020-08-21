import React, {useState, useEffect, useRef} from 'react';
import {useRecoilValue, useRecoilState, useSetRecoilState} from 'recoil';
import axios from 'axios';
import useNotificationHook from '../../components/uiComponents/notification/notification.hook';
import {DEFAULT_CONFIG} from '../../conf/configuration';
import AddContactView from './addContact.view';
import authMiddleware from '../../authMiddleware';
import text from './idioma.json';
import {addContactViewOpenState, loginData/*, friendSelector*/} from '../../components/recoil/atoms';
import {friendSelector} from '../../components/recoil/selectors';

import {idiomaState} from '../../components/recoil/atoms'
import socketClient from '../../utils/socket';

const AddContactController = props => {
    const idioma = useRecoilValue(idiomaState); 
    const [addContactState, setAddContactState] = useRecoilState(addContactViewOpenState);
    const [users, setUsers] = useState([]);
    const {openErrorNotification} = useNotificationHook();
    const inputSearchRef = useRef({value: ''});
    const userData = useRecoilValue(loginData);

    //const addContact = useSetRecoilState(friendSelector);
    const friendDispatcher = useSetRecoilState(friendSelector);
    

    const buscarUsuarios = () => {
        
        const optimisticAction = (token) => {
            axios.post(`${DEFAULT_CONFIG.server}/users/searchContact`, {
                stringPattern: inputSearchRef.current.value,
                start: 0,
                limit: 20
            }, {
                headers: {
                    "Authorization": token
                }
            })
            .then(resp => {
                if(resp.status === 200){
                    setUsers(resp.data.users);
                }
            })
            .catch(err => {
                openErrorNotification(text.lbErrorLoadingUsers[idioma]);
            });
        }
        authMiddleware(optimisticAction);
    }

    useEffect(() => {
        buscarUsuarios();
    }, [])

    const sendFriendRequest = (userId) => {
        
        const optimisticAction = (token) => {
            axios.post(`${DEFAULT_CONFIG.server}/users/sendFriendRequest`, {
                userId: userId
            }, {
                headers: {
                    "Authorization": token
                }
            })
            .then(resp => {
                if(resp.status === 200){
                    setUsers(users => {
                        return users.filter(user => user.userId !== userId);
                    });

                    //addContact(resp.data.friend);
                    friendDispatcher({action: 'add', payload: {friend: resp.data.friend}});
                    
                }
            })
            .then(() => {
                const client = socketClient.getSocket();
                client.emit('request friendship', {
                    userIdRequester: userData.userId,
                    userIdRequested: userId,
                    token: token
                });
            })
            .catch(err => {
                openErrorNotification(text.lbErrorSendigFriendRequest[idioma]);
            });
        }
        authMiddleware(optimisticAction);
    }

    const closeAddContactWin = () => {
        setAddContactState(false);
    }

    return <AddContactView 
        idioma={idioma}
        closeAddContactWin={closeAddContactWin}
        open={addContactState}

        users={users}
        buscarUsuarios={buscarUsuarios}

        inputSearchRef={inputSearchRef} 
        sendFriendRequest={sendFriendRequest}
    />;

}
export default AddContactController;