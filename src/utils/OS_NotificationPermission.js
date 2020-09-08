const askNotificationPermission = callback => {
    allowPermission();
    const checkNotificationPromise = () => {
        try { Notification.requestPermission().then(); } 
        catch(e) { return false;}
        return true;
    }

    // function to actually ask the permissions
    const handlePermission = permission => {
        // Whatever the user answers, we make sure Chrome stores the information
        if(!('permission' in Notification)) {
            Notification.permission = permission;
        }
        if(callback) callback();
    }

    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
        console.log("This browser does not support notifications.");
    } else {
        if(checkNotificationPromise()) {
            Notification.requestPermission()
                .then((permission) => {
                    handlePermission(permission);
                 })
        } else {
            Notification.requestPermission(function(permission) {
                handlePermission(permission);
            });
        }
    }
}

const denyPermission = () => {
    localStorage.setItem('denyOSNotification', true);
}
const allowPermission = () => {
    localStorage.removeItem('denyOSNotification');
}

const allowedNotifications = () => {
    return Notification.permission === 'granted' && !localStorage.getItem('denyOSNotification');
}
const permissionType = () => {

    return Notification.permission;
}

export default {askNotificationPermission, permissionType, denyPermission, allowedNotifications};