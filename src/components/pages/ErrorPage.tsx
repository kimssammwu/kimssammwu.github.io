import React from "react";
import PageComponent from "./PageComponent";

import { PageComponentProps } from "../../interfaces";
import { Link } from "gatsby";

class ErrorPage extends PageComponent {
  constructor(props: PageComponentProps) {
    super(props);
  }

  renderContent() {
    return (
      <center>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-4xl font-extrabold text-gray-600">
          찾을 수 없어요! 🕵️‍♀️
        </h1>
        <p className="text-lg">
          <br />
          <br />
          페이지가 사라졌나요? 다른 길을 찾아보세요!
          <br />
          <br />
          <Link
            to="/"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            메인페이지로
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          {/* <Link to="/">메인 페이지로</Link>. */}
        </p>
      </center>
    );
  }
}

export default ErrorPage;
