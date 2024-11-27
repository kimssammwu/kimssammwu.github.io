import React from 'react';
import PageComponent from './PageComponent';
import { graphql, StaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { PageComponentProps } from '../../interfaces';
import { useThumbnails } from '../hooks/use-thumbnails';
import { expectedReadTime, formatDate, getBasename } from '../../utils';



class DefaultPostPage extends PageComponent {
    private property;

    constructor(props: PageComponentProps) {
        super(props);
        this.property = props;
    }

    renderContent() {
        return (
            <StaticQuery 
                query={graphql`
                query DefaultPostQuery($id: String) {
                    allMarkdownRemark(filter: {id: {eq: $id}}) {
                        edges {
                            node {
                                id, fileAbsolutePath, html, tableOfContents
                                frontmatter { slug, date }
                            }
                        }
                    }
                }
                `}
                render={data => {
                    const post = data.allMarkdownRemark.edges[0];
                    const basename = getBasename(post.node.fileAbsolutePath, ".md");

                    const topImage = useThumbnails(basename) ? (
                        <div className="overflow-clip rounded bg-red-100">
                            <GatsbyImage className="h-full object-center" image={useThumbnails(basename)} alt={basename}	/>
                        </div> ) : <></>


                    return(
                        // TODO: Section 단위로 컴퍼넌트 분리!
                        <div className="flex justify-center">
                            <div className="w-[700px] mt-8 mb-20 px-12 sm:px-0">
                            <div className="h-40 rounded flex items-center justify-center overflow-clip">
                                {topImage}
                            </div>
                            
                            
                            <h1 className="mt-5 text-4xl font-extrabold text-gray-600"> {this.property.title} </h1>
                            <div className="flex text-gray-400 mt-3 mb-32">
                                <p>{formatDate(post.node.frontmatter.date)} ·  약 {expectedReadTime(post.node.html)}분 소요</p>
                            </div>
        
        
                            {/* <TOC nativeHtml={post.node.tableOfContents} /> */}
        
        
                            <div id="post">
                                <div dangerouslySetInnerHTML={{ __html: post.node.html }} />
                                {/* <Comment /> */}
                            </div>
                        </div>
        
                        </div>
                    )

                }
                    
                }
            />        
        );
  }
}

export default DefaultPostPage;
