import React, { useEffect, useState, useCallback} from 'react';
import {Redirect} from 'react-router-dom';
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';
import {idiomaState, subscribeToEventsState, loginData, userAvatarState, /*newAvatarState,*/ darkModeAtom/*firebaseCurrentUserState, friendSelector, friendsAtom*/} from '../../components/recoil/atoms';
import {tourAtom} from '../tour/tour.atoms';
import {friendSelector} from '../../components/recoil/selectors';
import useAxiosHook from '../../utils/axiosHook';
import OS_Notification from '../../utils/OS_NotificationPermission';
import ContactsView from './contacs.view';
import text from './idioma.json';
//import { Dialog } from '@material-ui/core';

//const UpdateAvatarCmp = React.lazy(() => import('./updateAvatar'));
//const AsyncChatCmp = React.lazy(() => import('../chat'));

const ContactsController = props => {

    
    const dark = useRecoilValue(darkModeAtom);
    const setSubscribeToEvents = useSetRecoilState(subscribeToEventsState);
    const [userData, setLoginData] = useRecoilState(loginData);
    const setUserAvatarState = useSetRecoilState(userAvatarState);
    //const setNewUserAvatarState = useSetRecoilState(newAvatarState);
    //const chatWith = useRecoilValue(activeChatWith);
    const setTourState = useSetRecoilState(tourAtom);
    const {postRequest} = useAxiosHook();
    
    //const [contacts, addContact] = useRecoilState(friendSelector);
    const [contacts, friendDispatcher] = useRecoilState(friendSelector);

    const [idioma, setIdiomaState] = useRecoilState(idiomaState);

    //const [openUpdateAvatar, setOpenUpdateAvatar] = useState(false);

    /*const handleClose = useCallback(() => {
        setOpenUpdateAvatar(false);
    }, []);*/

    const loadData = () => {
        
        const userDataPromise = postRequest({
            url: '/users/getUserData',
            bodyParams: {
                language: idioma
            }
        });
        const friendsPromise = postRequest({
            url: '/users/searchFirends',
            //messageOnError: text.errorLoadingFriends[idioma]
        });
        const friendsDataPromise = postRequest({
            url: '/users/getContactData',
            //messageOnError: text.errorLoadingFriendsData[idioma]
        });

        Promise.all([userDataPromise, friendsPromise, friendsDataPromise])
            .then(([userResp, friendsResp, friendsDataResp]) => {

                if(friendsResp.status === 200){
                        
                    friendDispatcher({
                        action: 'initialize', 
                        payload: {
                            friends: friendsResp.data.friends
                        }});
                    setSubscribeToEvents(true);
                    
                }

                if(friendsDataResp.status === 200){
                    friendDispatcher({
                        action: 'set_message_info',
                        payload: {
                            dataObj: friendsDataResp.data.contactsData
                        }
                    });
                }

                

                if(userResp.status === 200 || userResp.status === 201){
                    const {
                        _id, nickname, firstName,
                        lastName, email, gender, language, avatarUrl/*,avatarChanged, oauthAvatarUrl*/
                    } = userResp.data.user;
                    
                    /*if(avatarChanged){
                        // Lanzar promt de si quiere actualizar su avatar
                        setOpenUpdateAvatar(true);
                        setNewUserAvatarState(oauthAvatarUrl);
                    }*/
                    setLoginData({
                        userId: _id, 
                        nickname: nickname,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        gender: gender
                    });
                    setIdiomaState(language);
                    setUserAvatarState(avatarUrl);
                }
                if(userResp.status === 201){
                    // Si es un usuario nuevo le doy un tour por la app
                    OS_Notification.askNotificationPermission(() => setTourState(true));
                }
            })
            .catch(err => {

            })

    }

    useEffect(() => {
        if(contacts.length === 0 && userData !== null)
            loadData();        
    }, []);

    return userData !== null 
            ?  <>
                <ContactsView 
                    idioma={idioma}
                    contacts={contacts}
                    text={text}
                    isDark={dark}
                /> 
            </>
            : <Redirect to='/chat_front' />;

}

export default ContactsController;