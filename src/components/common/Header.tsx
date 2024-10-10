// import * as React from "react"
import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"

const Header: React.FC = () => {
  return (
    <header className="flex h-16 border-b">
        <div className="ml-24 my-auto">
            <Link to="/">
                <h1 className="text-gray-950 text-xl font-bold">
                    @Kimssammwu
                </h1>
            </Link>
        </div>
    </header>
  )
}

export default Header

