import * as firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from '../conf/firebaseConf';

console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig);


export default firebase;
