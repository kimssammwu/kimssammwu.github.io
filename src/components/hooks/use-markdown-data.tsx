import { useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";

// TODO: 개선점 찾기

export const usePostData = (postId: string) => {
  const data = useStaticQuery(graphql`
    query AllPostQuery {
      allMarkdownRemark {
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

  const mappedPosts = useMemo(() => {
    return data.allMarkdownRemark.edges.reduce((acc, { node }) => {
      acc[node.id] = node;
      return acc;
    }, {});
  }, [data]);

  return mappedPosts[postId];
};
