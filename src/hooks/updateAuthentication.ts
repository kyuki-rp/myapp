import { createUserWithEmailAndPassword, signInWithEmailAndPassword, reauthenticateWithCredential, EmailAuthProvider, updateEmail, updatePassword, updateProfile, sendEmailVerification } from "firebase/auth";

export const handleSignup = (auth, email, password) => {
  createUserWithEmailAndPassword(auth, email, password).then(
    () => {
      window.location.href = "/account";
    }
  ).then(() => {
    alert( 'サインアップしました。' );
    // if (auth.currentUser !== null) {
    //   sendEmailVerification(auth.currentUser);
    //   alert( '登録されたメールアドレスにメッセージを送信しました。\nメールアドレスの検証を完了してください。' )
    // }
  }).then(() => {
    handleUpdateProfile(auth, {displayName:"ななし"});
  }).catch(
    () => {alert( '不正なメールアドレスです。' )}
  )
}

export const handleSignin = (auth, email, password) => {
  signInWithEmailAndPassword(auth, email, password).then(
    () => {
      alert( 'ログインしました。' );
      window.location.href = "/account";
    }
  ).catch(
    () => {alert( 'メールアドレスかパスワードが間違っています。' )}
  )
}

export const handleSignout = (auth) => {
    auth.signOut();
    alert( 'ログアウトしました。' );
    window.location.href = "/account/signin";
};
  
export const handleDeleteAccount = (auth, password) => {
  const credential = EmailAuthProvider.credential(auth.currentUser?.email ?? '', password)

  reauthenticateWithCredential(auth.currentUser, credential).then(() => {
    auth.currentUser.delete();
    alert( 'アカウントを削除しました。' );
    window.location.href = "/account/signin";
  }).catch((error) => {
    alert( 'パスワードが間違っています。' );
  });
};

export const handleUpdateEmail = (auth, password, newEmail) => {
  const credential = EmailAuthProvider.credential(auth.currentUser?.email ?? '', password)

  reauthenticateWithCredential(auth.currentUser, credential).then(() => {
    updateEmail(auth.currentUser, newEmail)
    alert( 'Eメールアドレスが更新されました。' );
    window.location.href = "/account/signin";
  }).catch((error) => {
    alert( 'パスワードが間違っています。' );
  });
};
  
export const handleUpdatePassword = (auth, password, newPassword, checkNewPassword) => {
  const credential = EmailAuthProvider.credential(auth.currentUser?.email ?? '', password)

  if (newPassword==checkNewPassword) {
    reauthenticateWithCredential(auth.currentUser, credential).then(() => {
      updatePassword(auth.currentUser, newPassword)
      alert( 'パスワードが更新されました。' );
      window.location.href = "/account/signin";
    }).catch((error) => {
      alert( 'パスワードが間違っています。' );
    });
  } else {
      alert( 'パスワードが一致しません。' );
  } 

};
  
export const handleUpdateProfile = (auth, newProfile) => {
  updateProfile(auth.currentUser, newProfile)
}