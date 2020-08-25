import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { grey, lightGreen, green } from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import {DEFAULT_CONFIG} from '../../../conf/configuration';
import { formatRelative } from 'date-fns'
import { es } from 'date-fns/locale';

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
        backgroundColor: theme.palette.info.dark,
        color: theme.palette.info.contrastText,
        position: "relative"
    },
    timeMessage: {
        paddingLeft: theme.spacing(2),
        //paddingRight: theme.spacing(2),
        maxWidth: '60%',
        marginBottom: theme.spacing(1),
        marginLeft: `${theme.spacing(2)}px`,
        marginRight: `${theme.spacing(1)}px`,
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
    },
    doneIcon: {
        marginRight: theme.spacing(1),
        fontSize: theme.spacing(2.2)
    }
}));

const Message = React.memo(
    ({state, content, datetime ,contact, avatarSrc, idioma}) => {

    const classes = useMessageStyle();

    const msgStyle = state > 0 ? classes.mymsg : classes.notmymsg;
    const avatarStyle = state > 0 ? classes.myMsgAvatar : classes.notMyMsgAvatar;
    const avatarUrl = state > 0 ? avatarSrc : DEFAULT_CONFIG.server + contact.avatarUrl;

    const options = idioma === 'es' ? { locale: es } : {};
    const date = formatRelative(new Date(datetime), new Date(), options)
    
    let stateIcon = null;
    if(state === 1) stateIcon = <DoneIcon className={classes.doneIcon} style={{ color: grey[500] }}/>
    if(state === 2) stateIcon = <DoneAllIcon className={classes.doneIcon} style={{ color: grey[500] }}/>
    if(state === 3) stateIcon = <DoneAllIcon className={classes.doneIcon} style={{ color: lightGreen[500] }}/>
    

    return (<>
        <div className={`${classes.message} ${msgStyle}`}>
            <Avatar
                alt={contact.nickname}
                src={avatarUrl}
                variant="circle"
                className={`${classes.msgAvatar} ${avatarStyle}`}
                
            />
            {content}
        </div>
        <span className={` ${msgStyle}`}>
            <span className={`${classes.timeMessage}`}>
                {date}
            </span>
            {stateIcon}
        </span>
        
    </>
    );
});

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

const ChatBodyView = ({contact, avatarSrc, messages, idioma}) => {

    React.useEffect(() => {
        var element = document.getElementById('chatConversation');
        if(element)
            element.scrollTop = element.scrollHeight;
    });

    const classes = useChatStyle();
    return (
        
                <div id="chatConversation" className={classes.chatConversation}>
                    <div className={classes.offset} />
                    {
                        messages.map((elem, idx, arr) => {
                            return <Message {...elem} key={idx} contact={contact} avatarSrc={avatarSrc} idioma={idioma}/>
                        })
                    }
                    <div className={classes.offsetDown} />
                </div>

    );

}
export default ChatBodyView;