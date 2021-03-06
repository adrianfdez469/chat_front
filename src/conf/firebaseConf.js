
const firebaseConfig = () => {
    if(process.env.NODE_ENV === 'development'){
        return require('./secrets').firebaseConfig;
    }else if(process.env.NODE_ENV === 'production'){
       return {
        //apiKey: process.env.FIREBSAE_API_KEY,
        apiKey: "AIzaSyDJqy5depKRPIpHmmNxsu3VwFTPJ-dvCzY",
        authDomain: "shut-up-pro.firebaseapp.com",
        databaseURL: "https://shut-up-pro.firebaseio.com",
        projectId: "shut-up-pro",
        storageBucket: "shut-up-pro.appspot.com",
        messagingSenderId: "1034880989728",
        appId: "1:1034880989728:web:574d602e7540573753da45"
      }
    }
}

export default firebaseConfig();
