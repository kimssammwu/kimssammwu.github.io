import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import ErrorPage from "../components/pages/ErrorPage";

const NotFoundPage: React.FC<PageProps> = () => {
  const page = new ErrorPage({ id: "-1", title: "404", slug: "404" });
  return page.render();
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
