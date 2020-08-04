import React from 'react';
import {useRecoilState} from 'recoil';
import {idiomaState} from '../recoil/atoms';
//import classes from './header.module.css';

const Header = props => {
    const [idioma, setIdioma] = useRecoilState(idiomaState);

    const changeIdioma = ({target: {value}}) => {
        setIdioma(value);
    }

    return (
        <div className='headerdiv'>
            <div className='infoapp'>
                <div className='apptitle'>Chatapp</div>
            </div>
            
            <select value={idioma} onChange={changeIdioma} className='idiomaselect'>
                <option value="es">ES</option>
                <option value="en">EN</option>
            </select>
        </div>
    );

}
export default Header;