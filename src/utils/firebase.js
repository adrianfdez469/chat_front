import * as firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from '../conf/firebaseConf';

firebase.initializeApp(firebaseConfig);


export default firebase;
