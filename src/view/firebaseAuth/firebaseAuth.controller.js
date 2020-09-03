import React, {useEffect, useState} from 'react';
import { useRecoilValue } from 'recoil';
//import * as firebase from 'firebase/app';
//import "firebase/auth";
import FirebaseAuthView from './firebaseAuth.view';
import { darkModeAtom } from '../../components/recoil/atoms';
import axios from 'axios';

//import firebaseConfig from '../../conf/firebaseConf';

//firebase.initializeApp(firebaseConfig);
import firebase from '../../utils/firebase';


const FirebaseAuthController = props => {
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        //signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/contacts',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            //signInSuccessWithAuthResult: () => false,
            signInSuccess: (currentUser, credential, redirectUrl) => {

                console.log('Antes de mandar la peticion');
                console.log(firebase.auth().currentUser.getIdTokenResult());
                console.log(currentUser.getIdToken());

                firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                    axios.post('http://localhost:3001/users/test', {
                        name: 'Adrian',
                    }, {
                        headers: {
                            'Authorization': idToken
                        }
                    })
                    .then(resp => console.log(resp))
                    .catch(err => console.log(err));
                    
                  }).catch(function(error) {
                    // Handle error
                  });
                
                console.log('Im sign in successfully');
                console.log(currentUser);
                console.log(credential);
                console.log(redirectUrl);
            }   
        }
    };

    const[isSignedIn, setSignedIn]= useState(false);

    const darkMode = useRecoilValue(darkModeAtom);
    
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            
            //console.log(firebase.auth().currentUser.getIdToken());
            
            setSignedIn(!!firebaseUser);

        })
    }, []);

    
    if(!isSignedIn){
        return (
            <>
                <FirebaseAuthView uiConfig={uiConfig} auth={firebase.auth()} darkMode={darkMode}/>
            </>
        );
    }
    return (
        <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <input type="button" onClick={() => firebase.auth().signOut()} value="Sign-out" />
      </div>
    );



}

export default FirebaseAuthController;