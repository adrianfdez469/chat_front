import React, {useEffect} from 'react';
import axios from 'axios';
import Contact from './contact';
import {loginData, contactListState} from '../recoil/atoms';
import {useRecoilValue, useRecoilState} from 'recoil';


const Contacts = props => {
    const userData = useRecoilValue(loginData);
    const [contactList, setContactList] = useRecoilState(contactListState);

    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then(resp => {
                if(resp.status === 200){
                    setContactList(
                        resp.data.data
                            .map(user => ({nick: user.nickname, _id: user._id, socketId: user.socketId}))
                            .filter(user => user._id !== userData._id)
                    );
                }
            })
            .catch(err => console.log(err));
    }, []);

    const style = {
        overflowY: "scroll",
        height: 'calc(100% - 70px)'
    };

    return (
        <div style={style}> 
            {contactList.map(contact => {
                return <div key={contact._id}><Contact nickname={contact.nick} _id={contact._id} socketId={contact.socketId}/></div>
            })}
        </div>
    );

}
export default Contacts;