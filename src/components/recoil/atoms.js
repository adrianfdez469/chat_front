import {atom} from 'recoil';

const idiomaState = atom({
    key: 'idiomaState',
    default: 'es'
});


export {idiomaState};