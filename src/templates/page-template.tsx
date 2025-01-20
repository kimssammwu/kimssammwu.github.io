import * as React from "react";
import type { HeadFC } from "gatsby";

import { PostPageProps } from "../interfaces";
import DefaultPostPage from "../components/pages/DefaultPostPage";

import "../styles/post.scss";

// TODO: attachments 구현하기(첨부파일)

const PostPage: React.FC<PostPageProps> = ({ pageContext }) => {
  const page = new DefaultPostPage(pageContext);
  return <> {page.render()} </>;
};

export default PostPage;

export const Head: HeadFC = () => <title></title>;
