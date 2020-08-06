import React from 'react';
import Contact from './contact';
import {contactListState} from '../recoil/atoms';
import {useRecoilValue} from 'recoil';

const Contacts = props => {
    
    const contactList = useRecoilValue(contactListState);

    const style = {
        overflowY: "scroll",
        height: 'calc(100% - 70px)'
    };

    return (
        <div style={style}> 
            {contactList.map(contact => {
                return <div key={contact.socketId}><Contact nickname={contact.nick} socketId={contact.socketId}/></div>
            })}
        </div>
    );

}
export default Contacts;