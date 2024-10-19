import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Header from "../components/common/Header"

import { graphql, useStaticQuery } from 'gatsby';
import PostCard from "../components/common/PostCard";
import { GatsbyImage } from "gatsby-plugin-image";

type Node = {
  id: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    slug: string;
  };
};

type MarkdownFile = {
  node: Node;
};

type MarkdownFiles = MarkdownFile[];

const LandingPage = () => {
  const data = useStaticQuery(graphql`
  { allMdx {
      edges {
        node {
          id, frontmatter { title, description, date, slug },
          internal { contentFilePath }
        } 
      }
    }
    allFile(filter: { extension: { regex: "/(png|jpg|jpeg|gif)/" } }) {
      edges {
        node {
          id, name, publicURL, childImageSharp { gatsbyImageData(width: 144) }
        }
      }
    }
  }`);

  const markdownFiles: MarkdownFiles = data.allMdx.edges;

  const images = data.allFile.edges.reduce((acc, { node }) => {
    acc[node.name] = node.childImageSharp?.gatsbyImageData;
    return acc;
  }, {});


  return (
    <div>
      <Header/>

      <div className="flex justify-center">
        <div className="w-[1200px] h-screen flex justify-evenly mt-8">


          {/* 게시글 블록 */}
          <ul className="">
            {
              markdownFiles.length > 0 ? (
              markdownFiles.map(({node}) => {
                const fileName = node.internal.contentFilePath.split('/').pop().split('.')[0];
                const thumbnailImage = images[fileName];
                const thumbnail = thumbnailImage ? (
                      <div className="w-36 h-24 rounded border border-gray-200 overflow-clip mr-4">
                        <GatsbyImage className="w-36 h-24 transition duration-300 ease-in-out group-hover:scale-125" image={thumbnailImage} alt={node.frontmatter.title} />
                      </div> )
                      : <div className="w-36 h-24 rounded bg-gray-200 mr-4"></div>

                return (
                  <li key={node.id}>
                    <PostCard post_title={node.frontmatter.title}
                              post_description={node.frontmatter.description}
                              written_date={node.frontmatter.date}
                              thumbnail_img={thumbnail}
                              slug={node.frontmatter.slug}
                    />
                </li>
              ) }
            ))
            : (<div></div>)
          }



          </ul>
          
          {/* 추가 데이터 블록 */}
          <div className="w-72 h-full border-l px-2.5">
          </div>


          
        </div>
      </div>
    </div>
  );
};

export default LandingPage;


export const Head: HeadFC = () => <title>KIMSSAMMWU BLOG</title>
