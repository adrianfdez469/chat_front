import {useRecoilState} from 'recoil'
import {notificationAtom} from './notification.atom';


const NotificationHook = () => {
    
    const [notificationState, setNotificationState] = useRecoilState(notificationAtom);

    const defaultToOpem = {
        ...notificationState,
        open: true,
        autoHideDuration: 3000
    };

    const openNotification = properties => {
        setNotificationState({
            ...defaultToOpem,
            ...properties
        });
    }

    const openSpecificNotification = (severity, msg) => {
        setNotificationState({
            ...defaultToOpem,
            severity: severity,
            msg: msg
        });
    }

    const openSuccessNotification = msg => {
        openSpecificNotification("success",msg);
    }

    const openWarningNotification = msg => {
        openSpecificNotification("warning",msg);
    }

    const openErrorNotification = msg => {
        openSpecificNotification("error",msg);
    }

    const openInfoNotification = msg => {
        openSpecificNotification("info",msg);
    }

    return {    
        openNotification: openNotification,
        openSuccessNotification: openSuccessNotification,
        openErrorNotification: openErrorNotification,
        openInfoNotification: openInfoNotification,
        openWarningNotification: openWarningNotification
    };

}
export default NotificationHook;