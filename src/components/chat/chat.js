import React from 'react';
import {useRecoilValue} from 'recoil';
import {idiomaState} from '../recoil/atoms';
import text from './idioma.json';
import Contact from './contact';
import Message from './message';
import './chateditor.css';

const Chat = props => {

    const idioma = useRecoilValue(idiomaState);
        

    const conversacion = [
        {myMsg: true, msg: "Hola!"},
        {myMsg: false, msg: "Hi"},
        {myMsg: true, msg: "Hiciste la tarea?"},
        {myMsg: false, msg: "Estaba bastante dificila, pero si, la pude hacer ayer por la noche"},
        {myMsg: true, msg: "Me la puedes pasar?"},
        {myMsg: false, msg: "Si"},
        {myMsg: false, msg: "Pero tienes que cambiar un poco de cosas para que la profe no se de cuenta de que la copiaste por mi"},
        {myMsg: true, msg: "Eso no tiene problema"},
        {myMsg: false, msg: "Te la paso por correo"},
        {myMsg: true, msg: "Ok, gracias!"},
        {myMsg: true, msg: "Algun dia te devolveré el favor"},
        {myMsg: false, msg: "No hay problemas"},
        
    ];


    return (
        <div id="chatContainer">
            <Contact nickname="Pepe"/>
            
            <div id="chatConversation">
                {conversacion.map((elem, idx, arr) => {
                    const style = {};

                    if(arr[idx + 1] && elem.myMsg === arr[idx+1].myMsg){
                        style.marginBottom = '-3px';
                        style.borderRadius = elem.myMsg ? "10px 0px 10px 10px" : "0 10px 10px 10px";
                    }
                    
                    return <Message {...elem} key={idx} style={style}/>
                })}
            </div>

            <div id="editor"> 
                <div id="textarea" role="textbox" contentEditable></div>
                <button id="sendButton">{text.btnSend[idioma]}</button>
            </div>

        </div>
    );

}
export default Chat;