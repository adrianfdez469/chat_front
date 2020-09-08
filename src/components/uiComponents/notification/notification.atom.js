import {atom} from 'recoil';

const notificationAtom = atom({
    key: "notificationAtom",
    default: {
        open: false,
        autoHideDuration: 6000,
        severity: 'success',
        msg: ""
    }
});

export {notificationAtom};