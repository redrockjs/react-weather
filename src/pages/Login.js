import React, {useContext, useEffect} from "react";
import firebase from "firebase/app";
import "firebase/auth"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {AppContext} from "../context/appContext";
import {useAuthState} from 'react-firebase-hooks/auth';
import {Preloader} from "../components/Preloader";

if (firebase.apps.length < 1) {
    firebase.initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_KEY,
        authDomain: "iscloudly.firebaseapp.com"
    })
}

// pretty view wrapper container
const LoginWrapper = ({children}) => {
    return <div className="container">
        <div className="col s12">
            {children}
        </div>
    </div>

}

export let Login = () => {

    const [user, loading, error] = useAuthState(firebase.auth());
    const {setIsAuth, setAuthToken, setAuthUserData, getFirebase, clearFavorites, authToken} = useContext(AppContext)

    let uiConfig = {
        signInSuccessUrl: '/login',
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
    }

    const logout = () => {
        firebase.auth().signOut()
    }

    useEffect(() => {
        if (user) {
            setIsAuth(true)
            setAuthUserData(user)

            localStorage.setItem("authData", JSON.stringify(user))

            user.getIdToken()
                .then(response => {
                        setAuthToken(response)
                        localStorage.setItem("authToken", response)
                        getFirebase(user.uid, response)
                    }
                )
        } else {
            setIsAuth(false)
            setAuthToken(null)
            setAuthUserData(null)
            localStorage.removeItem("authData")
            localStorage.removeItem("authToken")
            clearFavorites()
        }
    }, [user])

    if (loading) {
        return <LoginWrapper>
            <Preloader/>
        </LoginWrapper>
    }
    if (error) {
        return <LoginWrapper>
            <p>Error: {error}</p>
        </LoginWrapper>
    }
    if (user) {
        return <LoginWrapper>
            <span style={{"textAlign": "center"}}>
                        <p> Signed In! </p>
                        <p><img src={user.photoURL} style={{"borderRadius": "50px"}} alt=""
                                title={user.displayName}/></p>
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                        <p><button onClick={logout}>Sign Out </button></p>
            </span>
        </LoginWrapper>
    }

    return <LoginWrapper>
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
        />
    </LoginWrapper>
}

