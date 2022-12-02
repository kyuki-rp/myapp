import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = "404: Not Found"

  return (
    <>
      <Seo title={siteTitle} />
      {siteTitle}
    </>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
