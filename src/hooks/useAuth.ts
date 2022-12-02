import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth"
import { getAuth } from 'firebase/auth'
import app from 'gatsby-plugin-firebase-v9.0'


export const useAuth = () => {
  const auth = getAuth(app)

  const [authorization, setAuthorization] = useState(auth);

  const [flg, setFlg] = useState(0);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setFlg(1)
      setAuthorization(auth)
    })
  }, []);
  return authorization
}

