import { useStaticQuery, graphql } from "gatsby";
import { useMemo } from "react";

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

  const mappedThumbnail = useMemo(() => {
    return data.allFile.edges.reduce((acc, { node }) => {
      acc[node.name] = node.childImageSharp?.gatsbyImageData;
      return acc;
    }, {});
  }, [data]);

  return mappedThumbnail[name];
};
