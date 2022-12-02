import React, { useState, useEffect } from "react"
import UserSignin from '../../components/userSignin'
import OtherSignin from '../../components/otherSignin'
import Seo from "../../components/seo"


const Signin = ({ data, location }) => {
    const siteTitle = "ログイン"

    return (
      <>
        <Seo title={siteTitle} />
        <div className="bg-light px-sm-4 py-4" style={{opacity: "0.8", borderRadius: "10px"}}>
          <UserSignin />
          <hr />
          <OtherSignin/>

        </div>
      </>
    )
  }


export default Signin
