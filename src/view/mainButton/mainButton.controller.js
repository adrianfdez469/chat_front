import React, {useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import MainButtonView from './mainButton.view';
import AddContact from '../addContact';


import {idiomaState, addContactViewOpenState} from '../../components/recoil/atoms';

const MainButtonController = props => {

    const [open, setOpen] = useState(false);
    const [addContactViewState,setAddContactViewState] = useRecoilState(addContactViewOpenState);

    const idioma = useRecoilValue(idiomaState);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const openAddContactView = () => {
        setAddContactViewState(true);
    }

    return <>
        <MainButtonView 
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            idioma={idioma}
            openAddContactView={openAddContactView}
        />
        {addContactViewState ? <AddContact /> : null}
        
    </>;

}
export default MainButtonController;