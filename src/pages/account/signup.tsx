import React from "react"
import UserSignup from '../../components/userSignup'
import OtherSignin from '../../components/otherSignin'
import Seo from "../../components/seo"


const Signup = ({ data, location }) => {
    const siteTitle = "サインアップ"

    return (
      <>
        <Seo title={siteTitle} />
        <div className="bg-light px-sm-4 py-4" style={{opacity: "0.8", borderRadius: "10px"}}>
          <UserSignup/>
          <hr />
          <OtherSignin/>
        </div>
      </>
    )
  }


export default Signup
