import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';


const msgStatus = {
    "PUSHED": 1,
    "SENDED": 2,
    "RECIVED": 3,
    "SEENED": 4
};

const conversation = {
    active: '1A13254',
    '1A13254':{
        text: [
            
            
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas? 1213", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Hola, como estas?", datetime: ""},
            {myMsg: false, msgStatus: null , msg: "Todo bien", datetime: ""},
            {myMsg: false, msgStatus: null , msg: "Y tu y tu familia estan bien?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SEENED , msg: "Si por suerte todos estamos bien por aca, la pandemia nos tienes vielto locos por el lio de la cuarentena y el tema de que no se puede salir a la calle.", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.RECIVED , msg: "Queria hacerte una pregunta", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.SENDED , msg: "Sabes programar en JavaScript?", datetime: ""},
            {myMsg: true, msgStatus: msgStatus.PUSHED , msg: "Es que tengo varias dudas sobre el tema", datetime: ""}

        ]
    }
}

const useMessageStyle = makeStyles(theme => ({
    message: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        maxWidth: '60%',
        //margin: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
        marginTop: theme.spacing(2),
        marginBottom: 0,
        marginLeft: `${theme.spacing(2)}px`,
        marginRight: `${theme.spacing(2)}px`,        
        borderRadius: '10px',
        backgroundColor: theme.palette.info.light,
        color: theme.palette.info.contrastText,
        position: "relative"
    },
    timeMessage: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        maxWidth: '60%',
        marginBottom: theme.spacing(1),
        marginLeft: `${theme.spacing(2)}px`,
        marginRight: `${theme.spacing(2)}px`,
        color: theme.palette.text.disabled,
        ...theme.typography.subtitle2
    },
    mymsg: {
        textAlign: 'right',
        alignSelf: 'flex-end',
        borderRadius: '10px 0 10px 10px'
    },
    notmymsg: { 
        alignSelf: 'flex-start',
        borderRadius: '0 10px 10px 10px'
    },
    msgAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        position: "absolute",
        top: `-${theme.spacing(1.5)}px`,
    },
    myMsgAvatar : {
        right: `-${theme.spacing(1.5)}px`,
        
    },
    notMyMsgAvatar: {
        left: `-${theme.spacing(1.5)}px`
    }
}));

const Message = ({myMsg = true, msg, style}) => {

    const classes = useMessageStyle();

    const msgStyle = myMsg ? classes.mymsg : classes.notmymsg;
    const avatarStyle = myMsg ? classes.myMsgAvatar : classes.notMyMsgAvatar;

    return (<>
        <div className={`${classes.message} ${msgStyle}`} style={style}>
            <Avatar
                alt={`Avatar n°${1}`}
                src={`/static/images/avatar/${1}.jpg`}
                variant="circle"
                className={`${classes.msgAvatar} ${avatarStyle}`}
                
            />
            {msg}
        </div>
        <span className={`${classes.timeMessage} ${msgStyle}`}>Hora: 5:50PM</span></>
    );
}

const useChatStyle = makeStyles(theme => ({
    chatConversation: {
        position: 'relative',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        height: '100%'
        
    },
    offset: theme.mixins.toolbar,
    offsetDown: {
        ...theme.mixins.toolbar, 
        bottom: 0,
        position: 'relative'
    }
}));

const ChatBodyView = props => {

    const classes = useChatStyle();
    return (
        
                <div className={classes.chatConversation}>
                <div className={classes.offset} />
                    {conversation[conversation.active].text.map((elem, idx, arr) => {
                        const style = {};

                        if(arr[idx + 1] && elem.myMsg === arr[idx+1].myMsg){
                            style.marginBottom = '-3px';
                            style.borderRadius = elem.myMsg ? "10px 0px 10px 10px" : "0 10px 10px 10px";
                        }
                        if(idx > 0 && elem.myMsg === arr[idx-1].myMsg){
                            style.borderRadius = elem.myMsg ? "10px 10px 10px 10px" : "10px 10px 10px 10px";
                        }
                        
                        return <Message {...elem} key={idx} style={style}/>
                    })}
                    <div className={classes.offsetDown} />
                </div>

    );

}
export default ChatBodyView;