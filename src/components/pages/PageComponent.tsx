import React, { Component, ReactNode } from "react";
import { Link } from "gatsby";

import { PageComponentProps } from "../../interfaces";
import { SEOForTemplate } from "../common/seo";
import { Github, Sun } from "../icons/solid";

const ThemeButton = () => {
  return <Sun className="w-8 fill-slate-300" />;
};

abstract class PageComponent extends Component<PageComponentProps> {
  constructor(props: PageComponentProps) {
    super(props);
  }

  renderHeader() {
    return (
      <header className="flex h-16 border-b">
        <div className="ml-6 my-auto">
          <Link to="/" className="flex">
            <h1 className="text-gray-950 text-xl font-bold">@Kimssammwu</h1>
            <p className="text-gray-700 text-xl">&nbsp;Blog</p>
          </Link>
        </div>

        <div className="ml-auto my-auto">
          {/* github */}
          <Link to="https://github.com/kimssammwu" className="">
            <Github className="w-6 fill-slate-300"></Github>
          </Link>
        </div>

        {/* darkmode */}
        <div className="h-8 w-8 flex items-center ml-5 mr-6 my-auto">
          <ThemeButton />
        </div>
      </header>
    );
  }

  abstract renderLeftSide(): ReactNode;

  abstract renderContent(): ReactNode;

  abstract renderRightSide(): ReactNode;

  // TODO: footer 구현
  renderFooter() {
    return <footer className="h-20 border-t"></footer>;
  }

  render() {
    return (
      <div>
        {/* static header */}
        {this.renderHeader()}

        {/* Main Content */}
        <div className="flex justify-between ">
          <div className="hidden md:flex flex-1 justify-end">
            <div className="hidden xl:contents">{this.renderLeftSide()}</div>
          </div>

          <div id="flex-1 text-center md:flex-none blog-post-view">
            <SEOForTemplate />
            {this.renderContent()}
          </div>

          <div className="hidden md:flex flex-1 justify-end">
            <div className="hidden xl:contents">{this.renderRightSide()}</div>
          </div>
        </div>

        {/* footer */}
        {this.renderFooter()}
      </div>
    );
  }
}

export default PageComponent;
