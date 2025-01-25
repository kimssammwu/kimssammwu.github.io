import * as React from "react";
import LandingPage from "../components/pages/LandingPage";
import { useMarkdownCollection } from "../components/hooks/use-markdown-collection";

const LandingPageView = () => {
  const view = new LandingPage(
    { id: "0", title: "landing", slug: "landing" },
    useMarkdownCollection()
  );

  return <>{view.render()}</>;
};

export default LandingPageView;
