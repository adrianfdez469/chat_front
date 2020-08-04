import React from 'react';
import VisualAvatar from '../../contacts/avatar';

const FriendHeader = ({nickname, backClick, online = true}) => {

    return (
        <div className='contact contact-chat'>
            <div className="goBack" onClick={backClick}></div>
            <VisualAvatar size={0.8}/>

            <div className='contactBody'>
                <div className='status'>
                    <span className="nickname">{nickname}</span>
                    <span className="connectionStatus">{online ? 'Online' : 'Offline'}</span>
                </div>
            </div>
            {/*<button className={classes.options}>...</button>*/}
        </div>
    );

}
export default FriendHeader;