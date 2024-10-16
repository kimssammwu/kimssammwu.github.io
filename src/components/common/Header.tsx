import React from "react"
import { Link } from "gatsby"

const Header: React.FC = () => {
  return (
    <header className="flex h-16 border-b">
        <div className="ml-24 my-auto">
            <Link to="/" className="flex">
                <h1 className="text-gray-950 text-xl font-bold">
                    @Kimssammwu
                </h1>
                <p className="text-gray-700 text-xl">&nbsp;Blog</p>
            </Link>
        </div>
    </header>
  )
}

export default Header

