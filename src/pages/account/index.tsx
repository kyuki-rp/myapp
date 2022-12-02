import React from "react";
import { useState, useEffect } from 'react';
import { Link } from "gatsby"
import { handleDeleteAccount, handleUpdateEmail, handleUpdatePassword, handleUpdateProfile, handleSignout } from '../../hooks/updateAuthentication'
import IconImage from '../../components/icon'
import { useAuth } from "../../hooks/useAuth"
import Seo from "../../components/seo"


const AccountIndex = ({ data, location }) => {

  const siteTitle = "Account";
  const auth = useAuth();

  const [editFlg, setEditFlg] = useState(false);
  const [displayName, setDisplayName] = useState("")
  const [disabled, setDisabled] = useState({password:true, newEmail:true, newPassword:true, checkNewPassword:true, button: true})
  useEffect(() => {
    setDisplayName(String(auth.currentUser?.displayName))
  }, [auth.currentUser?.displayName]);

  const updateEdit = () => {
    handleUpdateProfile(auth, {displayName: displayName});
    setEditFlg(false);
  }
  
  const onValueChange = (e) => {
    if (auth.currentUser===null) {
        setDisabled(
            {password:true, newEmail:true, newPassword:true, checkNewPassword:true, button:true}
        )
    } else if (e.currentTarget.value=="Eメールアドレスの変更") {
        setDisabled(
            {password:false, newEmail:false, newPassword:true, checkNewPassword:true, button:false}
        )
    } else if (e.currentTarget.value=="パスワードの変更") {
        setDisabled(
            {password:false, newEmail:true, newPassword:false, checkNewPassword:false, button:false}
        )
    } else if (e.currentTarget.value=="ログアウト") {
        setDisabled(
            {password:true, newEmail:true, newPassword:true, checkNewPassword:true, button:false}
        )
    } else if (e.currentTarget.value=="アカウントの削除") {
      setDisabled(
          {password:false, newEmail:true, newPassword:true, checkNewPassword:true, button:false}
      )
    }
  }

  const handleSubmit = async (auth, e) => {
    e.preventDefault()
    const changeEmail = document.getElementById("changeEmail") as HTMLInputElement
    const changePassWord = document.getElementById("changePassWord") as HTMLInputElement
    const signout = document.getElementById("signout") as HTMLInputElement
    const deleteAccount = document.getElementById("deleteAccount") as HTMLInputElement
    const password = document.getElementById("password") as HTMLInputElement
    const newEmail = document.getElementById("newEmail") as HTMLInputElement
    const newPassword = document.getElementById("newPassword") as HTMLInputElement
    const checkNewPassword = document.getElementById("checkNewPassword") as HTMLInputElement
    
    if (changeEmail.checked) {
      handleUpdateEmail(auth, password.value, newEmail.value)
    } else if (changePassWord.checked) {
      handleUpdatePassword(auth, password.value, newPassword.value, checkNewPassword.value)
    } else if (signout.checked) {
      handleSignout(auth)
    } else if (deleteAccount.checked) {
      handleDeleteAccount(auth, password.value)
    }

  }


  return (
    <>
      <Seo title={siteTitle} />
      <div className="bg-light px-sm-4 py-4" style={{opacity: "0.8", borderRadius: "10px"}}>
        <div style={{paddingBottom:"1em", fontWeight:"bold", textAlign:"center"}}>Myアカウントページ</div>

        { auth.currentUser===null &&
          <div style={{textAlign:"center"}}>
            <Link to="/account/signin">ログイン</Link>してください。
          </div>
        }
        { auth.currentUser!==null &&
          <>
            <div style={{textAlign:"center", marginBottom:"2rem"}}>
              <IconImage />
            </div>
            <div style={{ width:"225px", margin:"auto"}}>
              <div style={{marginTop:"1rem"}}>
                名前: &nbsp;
                { !editFlg &&
                  <>
                    {displayName}
                    <button onClick={() => {setEditFlg(true);}} style={{border:'none', background:'transparent'}}><i className="fa fa-pencil" style={{color:"black", opacity:"0.87"}}/></button>
                  </>
                }
                { editFlg &&
                  <>
                    <input type="text" value={displayName} onChange={event => {setDisplayName(event.target.value)}} style={{width: '100px', height:'30px', border:'solid', borderWidth: 'thin', borderRadius:'5px'}} ></input>
                    <button onClick={() => updateEdit()} style={{border:'none', background:'transparent'}}><i className="fa fa-check" style={{color:"black", opacity:"0.87"}}/></button>
                  </>
                }
              </div>

              <div>Eメール: &nbsp;{auth?.currentUser?.email}</div><br />

              <form onSubmit={(e) => {handleSubmit(auth, e)}}>
                <div className="radiobox">
                    <input id="changeEmail" className="radiobutton" name="hoge" type="radio" value="Eメールアドレスの変更" onChange={(e) => {onValueChange(e)}} />
                    <label htmlFor="changeEmail">&nbsp;Eメールアドレスの変更</label><br />
                    <input id="changePassWord" className="radiobutton" name="hoge" type="radio" value="パスワードの変更" onChange={(e) => {onValueChange(e)}} />
                    <label htmlFor="changePassWord">&nbsp;パスワードの変更</label><br />
                    <input id="signout" className="radiobutton" name="hoge" type="radio" value="ログアウト" onChange={(e) => {onValueChange(e)}} />
                    <label htmlFor="signout">&nbsp;ログアウト</label><br />
                    <input id="deleteAccount" className="radiobutton" name="hoge" type="radio" value="アカウントの削除" onChange={(e) => {onValueChange(e)}} />
                    <label htmlFor="deleteAccount">&nbsp;アカウントの削除</label><br />
                </div><br />

                <input id="password" type="password" className="form-control" disabled={disabled.password} placeholder="パスワード" required></input>
                <input id="newEmail" type="email" className="form-control" disabled={disabled.newEmail} placeholder="新しいEメールアドレス"  required></input>
                <input id="newPassword" type="password" className="form-control" disabled={disabled.newPassword} placeholder="新しいパスワード" required></input>
                <input id="checkNewPassword" type="password" className="form-control" disabled={disabled.checkNewPassword} placeholder="新しいパスワード（確認）" required></input>
                <button type="submit" className="btn" disabled={disabled.button} style={{width:"100%", color:'#CCCCCC', backgroundColor: '#333333'}}>更新</button>
              </form>
            </div>
          </>
        }
      </div>
    </>
  );
}

export default  AccountIndex