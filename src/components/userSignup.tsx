import React from "react"
import { Link } from "gatsby"
import { getAuth } from 'firebase/auth'
import { handleSignup } from "../hooks/updateAuthentication"

const UserSignup = () => {
  const auth = getAuth()

  const handleSubmit = async (auth, e) => {
    e.preventDefault()
    const email = document.getElementById("email") as HTMLInputElement
    const password = document.getElementById("password") as HTMLInputElement
    const checkPassword = document.getElementById("checkPassword") as HTMLInputElement

    if (password.value==checkPassword.value) {
      handleSignup(auth, email.value, password.value)
    } else {
      alert( 'パスワードが一致しません。' )
    }
  }


  return (
      <div style={{textAlign:"center"}}>
        <form onSubmit={(e) => {handleSubmit(auth, e)}}>
          <div style={{fontWeight: "bold"}}>新規アカウントの作成</div>
          <input id="email" type="email" className="form-control" style={{width:'200px', margin: '5px auto'}} placeholder="メールアドレス" required></input>
          <input id="password" type="password" className="form-control" style={{width:'200px', margin: '5px auto'}} placeholder="パスワード" required></input>
          <input id="checkPassword" type="password" className="form-control" style={{width:'200px', margin: '5px auto'}} placeholder="パスワード（確認）" required></input>
          <button type="submit" className="btn" style={{width:'200px', marginTop:'5px', backgroundColor: '#EEEEEE'}}>新規作成</button>
          <div>
            <Link to={"/account/signin"}>
              <a style={{fontSize: '70%'}}>すでにアカウントをお持ちの方はこちら</a>
            </Link>
          </div>
        </form>
      </div>
    
  )
}

export default UserSignup