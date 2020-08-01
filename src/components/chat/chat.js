import React from 'react';
//import classes from './chatstyles.module.css';
import Contact from './contact';
import './chateditor.css';

const Chat = props => {

    return (
        <div id="chatContainer">
            <Contact nickname="Pepe"/>
            <div id="chatConversation"></div>
            
            <div id="editor"> 
                <div id="textarea" role="textbox" contentEditable></div>
                <button id="sendButton">Send</button>
            </div>

        </div>
    );

}
export default Chat;