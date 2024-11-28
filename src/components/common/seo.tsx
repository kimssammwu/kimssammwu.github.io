import React from "react";
import Helmet from "react-helmet";
import { useSiteMetadata } from "../hooks/use-site-metadata";

interface SEOArguments {
  title?: string;
  description?: string;
  pathname?: string;
}

export const SEOForTemplate = ({
  title,
  description,
  pathname,
}: SEOArguments) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      {/* TODO: OpenGraph, Twitter Image 각 게시글에 맞게 변경 필요 */}
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
};
