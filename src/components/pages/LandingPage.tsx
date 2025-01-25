import React from "react";
import PageComponent from "./PageComponent";
import { PageComponentProps } from "../../interfaces";
import { formatDate } from "../../utils";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const PostCard = (node: any, imageSet: any) => {
  const property = getPostProperty(node, imageSet);
  const formattedDate = formatDate(property.date);
  const postLink = "/post/" + property.slug;

  const thumbnail = (
    <GatsbyImage
      className="w-36 h-24 transition duration-300 ease-in-out group-hover:scale-125
      "
      image={property.thumbnail}
      alt={property.title}
    />
  );

  return (
    <Link to={postLink}>
      <div className="group w-[700px] py-6 px-2.5">
        <div className="flex">
          <div className="hidden md:block h-24 overflow-hidden rounded border border-gray-200 dark:border-gray-500 mr-4">
            {thumbnail}
          </div>

          <div className="w-[520px] h-24">
            <h1 className="block font-semibold text-xl strong group-hover:text-blue-400 dark:text-gray-200">
              {property.title}
            </h1>
            <span className="block mb-4 text-base text-gray-600">
              {property.description}
            </span>
            <span className="block text-sm text-gray-600">
              {formattedDate}에 작성됨
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

function getFileName(node) {
  return node.internal.contentFilePath.split("/").pop().split(".")[0];
}

function getPostProperty(props) {
  const { node, imageSet } = props;
  const thumbnailImage = imageSet[getFileName(node)];
  const title = node.frontmatter.title;
  const description = node.frontmatter.description;
  const writtenDate = node.frontmatter.date;
  const slug = node.frontmatter.slug;
  return {
    thumbnail: thumbnailImage,
    title: title,
    description: description,
    date: writtenDate,
    slug: slug,
  };
}

class LandingPage extends PageComponent {
  posts: any;
  constructor(props: PageComponentProps, posts: any) {
    super(props);
    this.posts = posts;
  }

  renderLeftSide(): React.ReactNode {
    return <></>;
  }

  renderRightSide(): React.ReactNode {
    return <></>;
  }

  renderContent() {
    const imageSet = this.posts.allFile.edges.reduce((acc, { node }) => {
      acc[node.name] = node.childImageSharp?.gatsbyImageData;
      return acc;
    }, {});

    let counter = 0;
    return (
      <div>
        {this.posts.allMdx.edges.map(({ node }) => {
          return (
            <PostCard
              key={counter++}
              node={node}
              imageSet={imageSet}
            ></PostCard>
          );
        })}
      </div>
    );
  }
}

export default LandingPage;
