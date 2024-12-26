import { useStaticQuery, graphql } from "gatsby";

export const useThumbnails = (name: string) => {
  const data = useStaticQuery(graphql`
    query getTumbnails($name: String) {
      allFile(
        filter: {
          extension: { regex: "/(png|jpg|jpeg|gif)/" }
          name: { eq: $name }
        }
      ) {
        edges {
          node {
            id
            name
            childImageSharp {
              gatsbyImageData(width: 700)
            }
          }
        }
      }
    }
  `);

  if (data.allFile.edges.length > 0) {
    return data.allFile.edges[0].node.childImageSharp?.gatsbyImageData;
  }
  return null;
};
