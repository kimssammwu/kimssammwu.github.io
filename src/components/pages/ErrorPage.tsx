import React from "react";
import PageComponent from "./PageComponent";
import { graphql, StaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import { PageComponentProps } from "../../interfaces";
import { useThumbnails } from "../hooks/use-thumbnails";
import { expectedReadTime, formatDate, getBasename } from "../../utils";

class ErrorPage extends PageComponent {
  private property;

  constructor(props: PageComponentProps) {
    super(props);
    this.property = props;
  }

  renderContent() {
    return <></>;
  }
}

export default ErrorPage;
