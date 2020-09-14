import React from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {idiomaState, newAvatarState, userAvatarState} from '../../../components/recoil/atoms';
import useAxiosHook from '../../../utils/axiosHook';

import UpdateAvatarView from './updateAvatar.view';
import text from './idioma.json';


const UpdateAvatarController = ({handleClose}) => {

    const idioma = useRecoilValue(idiomaState);
    const [avatarSrc, setAvatarSrc] = useRecoilState(userAvatarState);
    const newAvatarSrc = useRecoilValue(newAvatarState);
    const {postRequest} = useAxiosHook();

    const onAgreeUpdate = () => {
        postRequest({
            url: '/users/changeAvatar',
            bodyParams: {
                avatar: newAvatarSrc
            },
        });
        setAvatarSrc(newAvatarSrc);
        handleClose();
    }

    return <UpdateAvatarView 
        text={text}
        idioma={idioma}
        handleClose={handleClose} 
        avatarSrc={avatarSrc}
        
        newAvatarSrc={newAvatarSrc}
        onAgreeUpdate={onAgreeUpdate}
    />;

}
export default UpdateAvatarController;