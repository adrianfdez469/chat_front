import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {idiomaState, deleteFriendSelector} from '../../../../components/recoil/atoms';
import useAxiosHook from '../../../../utils/axiosHook';
import BlockActionView from './block.view';
import text from './idioma.json';

const BlockActionController = ({preAction, contact}) => {

    const idioma = useRecoilValue(idiomaState);
    const {postRequest} = useAxiosHook();
    const deleteContact = useSetRecoilState(deleteFriendSelector);

    const onClick = () => {
        preAction();
        
        postRequest({
            url: '/users/blockUser',
            bodyParams: {blokedUserId: contact.contactId},
            messageOnError: text.onBlockError[idioma],
            doFnAfterSuccess: resp => {
                if(resp.status === 200){
                    deleteContact(contact.contactId);
                }
            }
        });
    }

    return <BlockActionView 
        idioma={idioma}
        onClick={onClick}
    />;

}
export default BlockActionController;