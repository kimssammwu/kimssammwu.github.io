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

    return <TOC nativeHtml={post.node.tableOfContents} />;
  }

  renderContent() {
    const post = usePostData(this.postId);
    const basename = getBasename(post.node.fileAbsolutePath, ".md");

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

    const TOCcontent = post.node.tableOfContnts;

    return (
      // TODO: Section 단위로 컴퍼넌트 분리!
      <div className="md:w-[700px] mt-8 mb-20 px-12 sm:px-0">
        <div className="h-40 rounded flex items-center justify-center overflow-clip">
          {topImage}
        </div>

        <h1 className="mt-5 text-4xl font-extrabold text-gray-600">
          {post.node.frontmatter.title}
        </h1>
        <div className="flex text-gray-400 mt-3 mb-32">
          <p>
            {formatDate(post.node.frontmatter.date)} · 약{" "}
            {expectedReadTime(post.node.html)}분 소요
          </p>
        </div>

        <div id="post">
          <div dangerouslySetInnerHTML={{ __html: post.node.html }} />
          {/* <Comment /> */}
        </div>
      </div>
    );
  }
}

export default DefaultPostPage;

export const usePostData = (id: string) => {
  const data = useStaticQuery(graphql`
    query DefaultPostQuery($id: String) {
      allMarkdownRemark(filter: { id: { eq: $id } }) {
        edges {
          node {
            id
            fileAbsolutePath
            html
            tableOfContents
            frontmatter {
              title
              slug
              date
            }
          }
        }
      }
    }
  `);

  return data.allMarkdownRemark.edges[0];
};
