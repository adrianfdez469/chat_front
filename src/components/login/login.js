import React from 'react';
import { useRecoilValue } from 'recoil';
import {idiomaState} from '../recoil/atoms';
import classes from './login.module.css';
import text from './idioma.json';

const Login = props => {
    const idioma = useRecoilValue(idiomaState);

    return (
        <div className={classes.login}>
            <h2>{text.welcome[idioma]}</h2>
            <input type="text" placeholder={text.placeholder[idioma]} />
            <button>{text.txtBtn[idioma]}</button>
        </div>
    );

}
export default Login;