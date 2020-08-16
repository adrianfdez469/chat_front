import React from 'react';
import {useRecoilValue} from 'recoil';
import {idiomaState} from '../../../components/recoil/atoms';
import ContactView from './contact.view';


const ContactContrller = ({contact}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const idioma = useRecoilValue(idiomaState);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <ContactView 
        handleMenu={handleMenu}
        handleClose={handleClose}
        contact={contact}
        anchorEl={anchorEl}
        idioma={idioma}
    />;

}
export default ContactContrller;