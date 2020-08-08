import React from 'react';



import ChatHEader from './chatHeader';
import ChatBody from './chatBody';
import ChatEditor from './chatEditor';

const ChatView = props => {

    return (
        <>
            <ChatHEader />
            <ChatBody />
            <ChatEditor />
        </>
    );

}
export default ChatView;