import React, {useState, useEffect, useRef} from 'react';
import {useRecoilValue, useRecoilState, useSetRecoilState} from 'recoil';
import AddContactView from './addContact.view';
import text from './idioma.json';
import {addContactViewOpenState, loginData/*, friendSelector*/} from '../../components/recoil/atoms';
import {tourAtom} from '../tour/tour.atoms';
import {friendSelector} from '../../components/recoil/selectors';
import useAxiosHook from '../../utils/axiosHook';

import {idiomaState} from '../../components/recoil/atoms'
import socketClient from '../../utils/socket';

const AddContactController = props => {
    const idioma = useRecoilValue(idiomaState); 
    const [addContactState, setAddContactState] = useRecoilState(addContactViewOpenState);
    const [users, setUsers] = useState([]);
    const inputSearchRef = useRef({value: ''});
    const userData = useRecoilValue(loginData);
    const {postRequest} = useAxiosHook();
    const tourState = useRecoilValue(tourAtom);

    const friendDispatcher = useSetRecoilState(friendSelector);
    

    const buscarUsuarios = () => {
        if(tourState){
            setUsers([{
                email: 'user.email@mail.com',
                nickname: 'Nickname',
                id: 'idUsuarioEjemplo'
            }]);
        }else{
            postRequest({
                url: '/users/searchContact',
                bodyParams: {
                    stringPattern: inputSearchRef.current.value,
                    start: 0,
                    limit: 20
                },
                doFnAfterSuccess: resp => {
                    if(resp.status === 200){
                        setUsers(resp.data.users);
                    }
                },
                messageOnError: text.lbErrorLoadingUsers[idioma]
            });
        }
    }

    useEffect(() => {
        buscarUsuarios();
    }, [])

    const sendFriendRequest = (userId) => {
        
        postRequest({
            url: '/users/sendFriendRequest',
            bodyParams: {
                userId: userId
            },
            doFnAfterSuccess: (resp, token) => {
                if(resp.status === 200){
                    setUsers(users => {
                        return users.filter(user => user.userId !== userId);
                    });

                    //addContact(resp.data.friend);
                    friendDispatcher({action: 'add', payload: {friend: resp.data.friend}});
                    const client = socketClient.getSocket();
                    client.emit('request friendship', {
                        userIdRequester: userData.userId,
                        userIdRequested: userId,
                        token: token
                    });
                }
            },
            messageOnError: text.lbErrorSendigFriendRequest[idioma]
        });
        
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