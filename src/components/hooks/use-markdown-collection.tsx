import { graphql, useStaticQuery } from "gatsby";

export const useMarkdownCollection = () => {
  const data = useStaticQuery(graphql`
    query MarkdownCollection {
      allMdx(
        filter: { frontmatter: { private: { ne: true } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              description
              date
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
      allFile(filter: { extension: { regex: "/(png|jpg|jpeg|gif)/" } }) {
        edges {
          node {
            id
            name
            publicURL
            childImageSharp {
              gatsbyImageData(width: 144)
            }
          }
        }
      }
    }
  `);

  return data;
};
