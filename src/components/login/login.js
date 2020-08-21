import React, {useState} from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {idiomaState, view, subscribeToEventsState, backdropState} from '../recoil/atoms';
import text from './idioma.json';
import socket from '../../utils/socket';
import './login.css';

const Login = props => {
    const idioma = useRecoilValue(idiomaState);
    const setView = useSetRecoilState(view.getAtom);
    const setSubscribeToEvents = useSetRecoilState(subscribeToEventsState);
    const setBackdrop = useSetRecoilState(backdropState);
    const [nick, setNick] = useState({
        nickname: '', valid: null
    });

    const setNickName = ({target: {value}}) => {
        if(/^[a-zA-Z][a-zA-Z0-9]{2,10}$/.test(value)){
            setNick({nickname: value, valid: true});
        }else{
            setNick({nickname: value, valid: false});
        }
    };

    const setLogin = (nickname) => {
        setBackdrop(true);        
        const client = socket.getSocket();
        client.emit('new user', {nickname: nickname});
        setSubscribeToEvents(true);
        setView(view.posibleViews.CONTACTS);
        setBackdrop(false);
    }

    const keyPress = (event) => {
        if(event.charCode === 13){
            setLogin(nick.nickname);
        }
    }
    

    return (
        <div className='login'>
            <h2>{text.welcome[idioma]}</h2>
            <input type="text" placeholder={text.nickname[idioma]} 
                onChange={setNickName}
                onKeyPress={keyPress} 
                value={nick.nickname} 
                className={nick.valid ? 'valid' : 'invalid'}                
            />
            <input type="password" placeholder={text.password[idioma]}/>
            <input type="email" placeholder={text.email[idioma]}/>
            {nick.valid ? <button onClick={() => setLogin(nick.nickname)}>{text.txtBtn[idioma]}</button> : null}
            
        </div>
    );

}
export default Login;