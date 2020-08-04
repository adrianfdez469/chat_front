import React from 'react';
//import './chateditor.css';

const Message = ({myMsg = true, msg, style}) => {

    const msgStyle = myMsg ? 'mymsg' : 'notmymsg';

    return (
        <div className={`message ${msgStyle}`} style={style}>
            {msg}
        </div>
    );

}
export default Message;