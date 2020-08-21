import React from 'react';



import ChatHeader from './chatHeader';
import ChatBody from './chatBody';
import ChatEditor from './chatEditor';

const ChatView = ({closeChat}) => {

    return (
        <>
            <ChatHeader closeChat={closeChat}/>
            <ChatBody />
            <ChatEditor />
        </>
    );

}
export default ChatView;