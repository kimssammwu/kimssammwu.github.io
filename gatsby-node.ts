import { GatsbyNode } from 'gatsby';
import path from 'path';

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const query = await graphql(`
    query GetRecentPostQuery {
        allMdx(filter: { frontmatter: { private: { ne: true } } }) {
            edges {
                node {
                    frontmatter { title, slug }
                }
            }
        }
    }
  `);

  if (query.errors) {
    reporter.panicOnBuild("Error occurred while creating pages: " + query.errors);
    return;
  }

  const TemplateComponent = path.resolve(__dirname, 'src/templates/page-template.tsx');

  // 모든 MDX 노드에 대해 페이지 생성
  query.data.allMdx.edges.forEach(({ node }) => {
    // const slug = node.frontmatter.title.toLowerCase().replace(/\s+/g, '-'); // 슬러그 생성
    createPage({
      path: `/post/${node.frontmatter.slug}`, // 슬러그 사용
      component: TemplateComponent,
      context: { 
        title: node.frontmatter.title,
        slug: node.frontmatter.slug,
     },
    });
  });
};
