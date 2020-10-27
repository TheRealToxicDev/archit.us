import { GatsbySSR, RenderBodyArgs, WrapRootElementNodeArgs } from "gatsby";
import React from "react";

import { isDefined } from "@architus/lib/utility";
import { umami } from "@docs/../gatsby-config";
import Root from "@docs/components/Root";

// Adds our custom root component to the page
export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({
  element,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
WrapRootElementNodeArgs): any => {
  return <Root>{element}</Root>;
};

// Adds our self-hosted analytics platform (Umami)
// to the head as a script tag
export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHeadComponents,
}: RenderBodyArgs): Promise<null> => {
  if (isDefined(umami.websiteId)) {
    setHeadComponents([
      <script
        async
        defer
        key="umami"
        data-website-id={umami.websiteId}
        src={`${umami.base}/umami.js`}
      ></script>,
    ]);
  }

  // Some value needed for type
  // See https://github.com/gatsbyjs/gatsby/issues/23296
  return Promise.resolve<null>(null);
};
