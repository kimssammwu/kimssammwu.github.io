interface PostPageContext {
    id: string;
    title: string;
    slug: string;
}

interface PostPageData {
    allMarkdownRemark: {
        edges: {
            node: {
                id: string;
                fileAbsolutePath: string;
                html: string;
                tableOfContents: string;
            }
        }
    }
    allFile: {
        edges: {
            node: {
                id: string;
                name: string;
                publicURL: string;
                childImageSharp: any;  // todo: 나중에 타입 식별되면 변경
            }
        }
    }
}

export interface PostPageProps {
    pageContext: PostPageContext;
    data: PostPageData;
}