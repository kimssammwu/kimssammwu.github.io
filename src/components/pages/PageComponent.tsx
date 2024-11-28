import React, { Component } from "react";
import { Link } from "gatsby";

import { PageComponentProps } from "../../interfaces";
import { SEOForTemplate } from "../common/seo";

abstract class PageComponent extends Component {
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
    return <></>;
  }

  abstract renderContent(): React.ReactNode;

  render() {
    return (
      <div id="blog-post-view">
        <SEOForTemplate />

        {/* static header */}
        {this.renderHeader()}
        {/* sections */}
        {this.renderContent()}
        {/* etc comments..? */}
        {this.renderFooter()}
      </div>
    );
  }
}

export default PageComponent;
