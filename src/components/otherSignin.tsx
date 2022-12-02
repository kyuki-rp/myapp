import React from "react"
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, EmailAuthProvider } from "firebase/auth"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth } from '../hooks/useAuth'

const OtherSignin = () => {

    const auth = useAuth()

    const uiConfig = {
      signInSuccessUrl: "/account",
      signInOptions: [
          GoogleAuthProvider.PROVIDER_ID,
      ],
    }

    return (
      <>
        <h6 style={{textAlign:'center', fontWeight:"bold"}}>他のアカウントでログイン</h6>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </>
    )
}

export default OtherSignin
