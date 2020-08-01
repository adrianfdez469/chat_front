import React from 'react';

import classes from './chatstyles.module.css';


const VisualAvatar = () => {
    return (
        <div className={classes.avatarOut}>
            <div className={classes.avatarHead}></div>
            <div className={classes.avatarTrunk}></div>
        </div>
    );
}

const Contact = ({avatar, nickname}) => {

    return (
        <div className={classes.contact}>
            {/*<div className={classes.avatar} />*/}
            <VisualAvatar />
            <div className={classes.contactBody}><p>{nickname}</p></div>
            <button className={classes.options}>...</button>
        </div>
    );

}
export default Contact;