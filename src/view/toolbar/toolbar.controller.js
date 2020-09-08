import React from 'react';
import {useRecoilValue} from 'recoil';

import ToolbarView from './toolbar.view';

import {userAvatarState, loginData} from '../../components/recoil/atoms';

const ToolbarController = props => {

    const avatarSrc = useRecoilValue(userAvatarState);
    const userData = useRecoilValue(loginData);
    
    return <ToolbarView 
        avatarSrc={avatarSrc}
        userData={userData}
    />;

}
export default ToolbarController;