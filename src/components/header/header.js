import React from 'react';
import {useRecoilState} from 'recoil';
import {idiomaState} from '../recoil/atoms';
import classes from './header.module.css';

const Header = props => {
    const [idioma, setIdioma] = useRecoilState(idiomaState);

    const changeIdioma = ({target: {value}}) => {
        setIdioma(value);
    }

    return (
        <div className={classes.headerdiv}>
            { /* Avatar / Nickname */ }
            <select value={idioma} onChange={changeIdioma} className={classes.idiomaselect}>
                <option value="es">ES</option>
                <option value="en">EN</option>
            </select>
        </div>
    );

}
export default Header;