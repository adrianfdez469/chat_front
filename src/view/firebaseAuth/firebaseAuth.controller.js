import React, {useEffect, useState} from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import FirebaseAuthView from './firebaseAuth.view';
import { loginData, firebaseCurrentUserState, firebaseCurrentTokenState } from '../../components/recoil/atoms';
import firebase from '../../utils/firebase';
import { Redirect } from 'react-router';


const uiConfig =  {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
    }
};

const FirebaseAuthController = () => {

    const  [userData, setLoginData] = useRecoilState(loginData)
    const  setFirebaseCurrentUser = useSetRecoilState(firebaseCurrentUserState)
    const  firebaseCurrentToken = useSetRecoilState(firebaseCurrentTokenState)

    
    const[isSignedIn, setSignedIn]= useState(false);
    const[netError, setNetError]= useState(false);
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            console.log('onAuthStateChanged');
            setSignedIn(!!firebaseUser);
            if(firebase.auth().currentUser){
                const promise1 = firebase.auth().currentUser.getIdToken(true);
                const promise2 = firebase.auth().currentUser.getIdTokenResult(true);

                Promise.all([promise1, promise2])
                    .then(([idToken, tokenResult]) => {
                        firebaseCurrentToken(idToken);
                        return tokenResult;
                    })
                    .then(result => {
                        const data = result.claims;
                        setFirebaseCurrentUser(data);
                        const nameArray = (data.name) ? data.name.split(' ') : ['', ''];
                        setLoginData({
                            userId: data.user_id, 
                            nickname: data.name,
                            firstName: nameArray[0],
                            lastName: nameArray.filter((it, idx) => idx > 0).join(' '),
                            email: data.email,
                            gender: null
                        });
                    })
                    .catch(err => {
                        setNetError(true);
                    });
            }
        });
        
    }, []);

    if(!isSignedIn || !userData){
        return <FirebaseAuthView 
            uiConfig={uiConfig} 
            auth={firebase.auth()} 
            isSignedIn={isSignedIn}
            netError={netError}
        />
    }else{
        return <Redirect to='/app' />
    }
    

}

export default React.memo(FirebaseAuthController);