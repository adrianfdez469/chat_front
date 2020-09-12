import React, {useEffect, useState} from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import FirebaseAuthView from './firebaseAuth.view';
import { loginData, firebaseCurrentUserState, firebaseCurrentTokenState, view } from '../../components/recoil/atoms';
import firebase from '../../utils/firebase';


const uiConfig =  {
    // eslint-disable-next-line no-restricted-globals
    //signInSuccessUrl: `${location.origin}/chat_front`,
    //signInFlow: 'popup',
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
    const  setView = useSetRecoilState(view.getAtom);

    
    const[isSignedIn, setSignedIn]= useState(false);
    const[netError, setNetError]= useState(false);
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            setSignedIn(!!firebaseUser);
            if(firebase.auth().currentUser){
                const promise1 = firebase.auth().currentUser.getIdToken(true)
                    .then(idToken => {
                        firebaseCurrentToken(idToken);
                        return idToken;
                    });
                const promise2 = firebase.auth().currentUser.getIdTokenResult(true);

                Promise.all([promise1, promise2])
                    .then(([idToken, tokenResult]) => {
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
        setView(view.posibleViews.CONTACTS);
        return <></>;
    }
    

}

export default React.memo(FirebaseAuthController);