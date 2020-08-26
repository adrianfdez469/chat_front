import React, {useState, useRef} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {idiomaState, userAvatarState} from '../../../../components/recoil/atoms';
import useAxiosHook from '../../../../utils/axiosHook';
import {DEFAULT_CONFIG} from '../../../../conf/configuration'
import ChangeavatarView from './changeavatar.view';
import text from './idioma.json';

const ChangeavatarController = ({avatarOpen, avatarClose}) => {

    const idioma = useRecoilValue(idiomaState);
    const {postRequest} = useAxiosHook();
    const setAvatar = useSetRecoilState(userAvatarState);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const avatarRef = useRef(null);

    const onAvatarChange = () => {
        postRequest({
            url: '/users/changeAvatar',
            bodyParams: {
                avatar: previewAvatar
            },
            messageOnError: text.onError[idioma],
            doFnAfterSuccess: resp => {
                if(resp.status === 200){
                    avatarClose();
                    setAvatar(`${DEFAULT_CONFIG.server}${resp.data.avatarUrl}`);
                }
            }
        });
    }

    return <ChangeavatarView 
        text={text}
        idioma={idioma}
        preview={previewAvatar}
        setPreview={setPreviewAvatar}
        avatarRef={avatarRef}
        avatarOpen={avatarOpen}
        close={avatarClose}
        onAvatarChange={onAvatarChange}
    />;

}
export default ChangeavatarController;