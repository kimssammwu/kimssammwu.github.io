import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Header from "../components/common/Header"

import { graphql, useStaticQuery } from 'gatsby';

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();

import "../styles/post.css"

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          html
        }
      }
    }
  }
`;

const PostPage = ({data}) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <div>
      <Header/>

      <div id="post" className="flex justify-center">
        <div className="w-[700px] h-screen mt-8">
          {posts.map(({ node }) => (
              <div dangerouslySetInnerHTML={{ __html: node.html }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;


export const Head: HeadFC = () => <title>KIMSSAMMWU BLOG</title>
