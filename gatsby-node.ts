import { GatsbyNode } from "gatsby";
import path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  const query = await graphql(`
    query GetRecentPostQuery {
      allMarkdownRemark(filter: { frontmatter: { private: { ne: true } } }) {
        edges {
          node {
            id
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

  if (query.errors) {
    reporter.panicOnBuild(
      "Error occurred while creating pages: " + query.errors
    );
    return;
  }

  const TemplateComponent = path.resolve(
    __dirname,
    "src/templates/page-template.tsx"
  );

  // 모든 MDX 노드에 대해 페이지 생성

  query.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/post/${node.frontmatter.slug}`, // 슬러그 사용
      component: TemplateComponent,
      context: {
        id: node.id,
        title: node.frontmatter.title,
        slug: node.frontmatter.slug,
      },
    });
  });
};
