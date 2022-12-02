import React from "react"
import { Link } from "gatsby"
import { getAuth } from 'firebase/auth'
import { handleSignin } from "../hooks/updateAuthentication"


const UserSignin = () => {
  const auth = getAuth()

  const handleSubmit = async (auth, e) => {
    e.preventDefault()
    const email = document.getElementById("email") as HTMLInputElement
    const password = document.getElementById("password") as HTMLInputElement
    handleSignin(auth, email.value, password.value)
  }

  return (
    <>
      <div style={{textAlign:"center"}}>
        <form onSubmit={(e) => {handleSubmit(auth, e)}}>
          <div style={{fontWeight: "bold"}}>Myアカウントでログイン</div>
          <input id="email" type="email" className="form-control" style={{width:'200px', margin: '5px auto'}} placeholder="メールアドレス" required></input>
          <input id="password" type="password" className="form-control" style={{width:'200px', margin: '5px auto'}} placeholder="パスワード" required></input>
          <button type="submit" className="btn" style={{width:'200px', marginTop:'5px', backgroundColor: '#EEEEEE'}}>ログイン</button>
          <div> 
            <Link to={"/account/signup"}>
              <a style={{fontSize: '70%'}}>新規アカウントの作成はこちら</a>
            </Link>
          </div>
        </form>
      </div>
    </>
    
  )
}

export default UserSignin