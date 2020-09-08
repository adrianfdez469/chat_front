import {atom} from 'recoil';

const tourAtom = atom({
    key: 'tourAtom',
    'default': false
}); 

const focusStepAtom = atom({
    key: 'focusStepAtom',
    default: 0
});

export {
    focusStepAtom, tourAtom
}