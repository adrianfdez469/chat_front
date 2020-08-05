import React, {useState} from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';
import {idiomaState, loginData, view, contactListState, subscribeToEventsState} from '../recoil/atoms';
//import classes from './login.module.css';
import text from './idioma.json';
import socket from '../socket';

const Login = props => {
    const idioma = useRecoilValue(idiomaState);
    const setLoginData = useSetRecoilState(loginData);
    const setView = useSetRecoilState(view.getAtom);
    const [contactList, setContactListState] = useRecoilState(contactListState);
    const setSubscribeToEvents = useSetRecoilState(subscribeToEventsState);
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
        axios
            .post('http://localhost:3001/login', {nickname: nickname})
            //.post('https://shut-upp-back.herokuapp.com/', {nickname: nickname})
            .then((resp) => {
                if(resp.status === 200){
                    const client = socket.getSocket();
                    client.emit('new user', {nickname: nickname, _id: resp.data._id});
                    return {
                        client: client, 
                        nickname: nickname, 
                        _id:resp.data._id
                    };
                }else{
                    throw Error ('El login no fue satiscactorio');
                }
            })
            .then(resp => {
                setLoginData({nickname: resp.nickname, _id: resp._id, socketId: resp.client.id});
            })
            .then(() => {setSubscribeToEvents(true)})
            .then(() => {setView(view.posibleViews.CONTACTS)})
            .catch(err => {console.log(err)})
    }

    const keyPress = (event) => {
        if(event.charCode === 13){
            setLogin(nick.nickname);
        }
    }
    

    return (
        <div className='login'>
            <h2>{text.welcome[idioma]}</h2>
            <input type="text" placeholder={text.placeholder[idioma]} 
                onChange={setNickName}
                onKeyPress={keyPress} 
                value={nick.nickname} 
                className={nick.valid ? 'valid' : 'invalid'}                
            />
            {nick.valid ? <button onClick={() => setLogin(nick.nickname)}>{text.txtBtn[idioma]}</button> : null}
        </div>
    );

}
export default Login;