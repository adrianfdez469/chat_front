import React from 'react';
import Contact from './contact';

const Contacts = props => {

    const contactList = [
        {nick: "Limonta"},
        {nick: "Ana"},
        {nick: "Daymel"},
        {nick: "Ibelice"},
        {nick: "Jose"},
        {nick: "Limonta"},
        {nick: "Ana"},
        {nick: "Daymel"},
        {nick: "Ibelice"},
        {nick: "Jose"},
        {nick: "Limonta"},
        {nick: "Ana"},
        {nick: "Daymel"},
        {nick: "Ibelice"},
        {nick: "Jose"},
        {nick: "Limonta"},
        {nick: "Ana"},
        {nick: "Daymel"},
        {nick: "Ibelice"},
        {nick: "Jose"}
    ];

    const style = {
        overflowY: "scroll",
        height: 'calc(100% - 70px)'
    };

    return (
        <div style={style}> 
            {contactList.map(contact => {
                return <div key={contact.nick}><Contact nickname={contact.nick}/></div>
            })}
        </div>
    );

}
export default Contacts;