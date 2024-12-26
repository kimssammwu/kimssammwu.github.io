import * as React from "react";
import type { HeadFC } from "gatsby";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";

import "../styles/post.css";

import { PostPageProps } from "../interfaces";
import DefaultPostPage from "../components/pages/DefaultPostPage";

// TODO: DeckDeckGo Deprecated.
deckDeckGoHighlightElement();

// TODO: attachments 구현하기(첨부파일)

const PostPage: React.FC<PostPageProps> = ({ pageContext }) => {
  const page = new DefaultPostPage(pageContext);
  return <> {page.render()} </>;
};

export default PostPage;

export const Head: HeadFC = () => <title></title>;
