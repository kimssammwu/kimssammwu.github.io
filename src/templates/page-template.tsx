import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Header from "../components/common/Header"
import Comment from "../components/common/Comment"

import { graphql, useStaticQuery } from 'gatsby';

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";

import "../styles/post.css"
import { GatsbyImage } from "gatsby-plugin-image";


deckDeckGoHighlightElement();


function expectedReadTime(content: string) {
  const WordPerMinute = 200;
  const removedTagContent = content.replace(/<[^>]*>?/g, '');
  const allWords = removedTagContent.split(/\s+/).filter(word => word.length > 0).length;
  return Math.ceil(allWords / WordPerMinute); 
} 

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  return `${year}년 ${month}월 ${day}일`;
}


export const query = graphql`
  query PostViewerQuery {
    allMarkdownRemark {
      edges {
        node {
          id, fileAbsolutePath
          frontmatter { slug, date }
          html
        }
      }
    }
    allFile(filter: { extension: { regex: "/(png|jpg|jpeg|gif)/" } }) {
        edges {
            node {
                id, name, publicURL, childImageSharp { gatsbyImageData(width: 700) }
            }
        }
    }
  }
`;

const PostPage = ({ pageContext, data }) => {
  // console.log("Loc", pageContext.slug)
  const posts = data.allMarkdownRemark.edges.filter(({ node }) => node.frontmatter.slug === pageContext.slug);
  if (posts.length < 1) { return (<div><Header />404 잘못된 페이지입니다.</div>) }

  
  const images = data.allFile.edges.reduce((acc, { node }) => {
    acc[node.name] = node.childImageSharp?.gatsbyImageData;
    return acc;
  }, {});
  
  
  const originalFileName = posts[0].node.fileAbsolutePath.split('/').pop().split('.')[0];
  const topImage = images[originalFileName] ? (
                  <div className="overflow-clip rounded bg-red-100">
                    <GatsbyImage className="h-full object-center" image={images[originalFileName]} alt={originalFileName}  />
                  </div> ) :
                  <div></div>

  return (
    <div>
      <Header/>

      <div className="flex justify-center">
        <div className="w-[700px] mt-8">

          {/* 썸네일 이미지 */}
          <div className="h-40 rounded flex items-center justify-center overflow-clip">
            {topImage}
          </div>
          
          
          {/* {posts[0].node.html.replace(/<[^>]*>?/g, '').length / 200} */}
          <h1 className="mt-5 text-4xl font-extrabold text-gray-600"> {pageContext.title} </h1>
          <div className="flex text-gray-400 mt-3 mb-32">
            <p> 약 {expectedReadTime(posts[0].node.html)}분 소요 · {formatDate(posts[0].node.frontmatter.date)}</p>
          </div>

          <div id="post" className="mb-20">
            <div dangerouslySetInnerHTML={{ __html: posts[0].node.html }} />

            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

export const Head: HeadFC = () => <title>KIMSSAMMWU BLOG</title>
