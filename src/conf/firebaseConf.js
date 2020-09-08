
const firebaseConfig = () => {
    if(process.env.NODE_ENV === 'development'){
        const secrets = require('./secrets');
        return secrets.firebaseConfig;
    }else if(process.env.NODE_ENV === 'production'){
       return process.env.FIREBASE_CONFIG_CREDENTIALS
    }
}

export default firebaseConfig();
