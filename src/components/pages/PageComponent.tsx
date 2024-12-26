import React, { Component, ReactNode } from "react";
import { Link } from "gatsby";

import { PageComponentProps } from "../../interfaces";
import { SEOForTemplate } from "../common/seo";

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
      </header>
    );
  }

  renderFooter() {
    return <footer className="h-16 border-t">Footer Content</footer>;
  }

  abstract renderContent(): ReactNode;

  abstract renderLeftSide(): ReactNode;

  abstract renderRightSide(): ReactNode;

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