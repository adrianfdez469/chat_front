import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {idiomaState, deleteFriendSelector} from '../../../../components/recoil/atoms';
import useAxiosHook from '../../../../utils/axiosHook';
import DeleteActionView from './delete.view';
import text from './idioma.json';

const DeleteActionController = ({preAction, contact}) => {

    const idioma = useRecoilValue(idiomaState);
    const {postRequest} = useAxiosHook();
    const deleteFriend = useSetRecoilState(deleteFriendSelector);


    const onClick = () => {

        preAction();
        postRequest({
            url: '/users/deleteContact',
            bodyParams: {deletedUserId: contact.contactId},
            messageOnError: text.onDeleteError[idioma],
            doFnAfterSuccess: resp => {
                if(resp.status === 200){
                    deleteFriend(contact.contactId);
                }
            }
        });
    }

    return <DeleteActionView 
        idioma={idioma}
        text={text}
        onClick={onClick}
    />;

}
export default DeleteActionController;