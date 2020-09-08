import React, {useState, useMemo, useCallback} from 'react';

import {useRecoilState, useRecoilValue} from 'recoil';
//import JoyRide from 'react-joyride';
import MainButtonView from './mainButton.view';
import AddContact from '../addContact';
import {idiomaState, addContactViewOpenState, speedDialStateAtom} from '../../components/recoil/atoms';
import text from './idioma.json'


const MainButtonController = props => {

    //const [open, setOpen] = useState(false);
    const [open, setOpen] = useRecoilState(speedDialStateAtom);

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
            text={text}
            openAddContactView={openAddContactView}
        />

        
        {addContactViewState ? <AddContact /> : null}
        
    </>;

}
export default React.memo(MainButtonController);