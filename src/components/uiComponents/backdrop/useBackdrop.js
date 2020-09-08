//import React from 'react';
import {useSetRecoilState} from 'recoil';
import backdropStateAtom from './backdrop.atom';

const useBackdrop = props => {

    const setBackdrop = useSetRecoilState(backdropStateAtom);

    const show = () => {
        setBackdrop(true);
    }
    const close = () => {
        setBackdrop(false);
    }

    return { showBackDrop: show, closeBackDrop: close };

}
export default useBackdrop;