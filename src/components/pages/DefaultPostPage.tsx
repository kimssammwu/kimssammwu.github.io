import React from "react";
import PageComponent from "./PageComponent";
import { graphql, StaticQuery, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import { PageComponentProps } from "../../interfaces";
import { useThumbnails } from "../hooks/use-thumbnails";
import { expectedReadTime, formatDate, getBasename } from "../../utils";
import TOC from "../common/TOC";
import TableOfContentElement from "../common/TOC";
import { json } from "stream/consumers";
import Comment from "../common/Comment";
import { usePostData } from "../hooks/use-markdown-data";

class DefaultPostPage extends PageComponent {
  postId: string;
  constructor(props: PageComponentProps) {
    super(props);
    this.postId = props.id;
  }

  renderLeftSide(): React.ReactNode {
    return <></>;
  }

  renderRightSide(): React.ReactNode {
    const post = usePostData(this.postId);

    return <TOC nativeHtml={post.tableOfContents} />;
  }

  renderContent() {
    const post = usePostData(this.postId);
    const basename = getBasename(post.fileAbsolutePath, ".md");

    const topImage = useThumbnails(basename) ? (
      <div className="overflow-clip rounded bg-red-100">
        <GatsbyImage
          className="h-full object-center"
          image={useThumbnails(basename)}
          alt={basename}
        />
      </div>
    ) : (
      <></>
    );

    return (
      // TODO: Section 단위로 컴퍼넌트 분리!
      <div className="md:w-[700px] mt-8 mb-20 px-12 sm:px-0">
        <div className="h-40 rounded flex items-center justify-center overflow-clip">
          {topImage}
        </div>

        <h1 className="mt-5 text-4xl font-extrabold text-gray-600">
          {post.frontmatter.title}
        </h1>
        <div className="flex text-gray-400 mt-3 mb-32">
          <p>
            {formatDate(post.frontmatter.date)} · 약{" "}
            {expectedReadTime(post.html)}분 소요
          </p>
        </div>

        <div id="post">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <Comment />
        </div>
      </div>
    );
  }
}

export default DefaultPostPage;
