import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Header from "../components/common/Header"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Header/>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
