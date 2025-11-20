/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//
/* global process */

import * as React from "react";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { Banner } from "baseui/banner";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { StyledLink as Link } from "baseui/link";
import Markdown, { H1, H2 } from "../components/markdown-elements";
import { Card, StyledBody } from "baseui/card";
import { Tag } from "baseui/tag";
import { withStyle } from "baseui";
import BlogPosts from "../posts.jsx";

import Layout from "../components/layout";

const MinHeightBody = withStyle(StyledBody, {
  minHeight: "150px",
});

const cardOverrides = {
  Root: {
    style: ({ $theme }) => ({
      marginLeft: $theme.sizing.scale600,
      marginRight: $theme.sizing.scale600,
      marginTop: $theme.sizing.scale500,
      width: "300px",
    }),
  },
};

const Adopters = (props) => (
  <>
    <H2>Who is using Base Web?</H2>
    <FlexGrid
      flexGridColumnCount={[2, 3]}
      backgroundColor="mono100"
      marginBottom="scale1000"
    >
      {props.logoSrcs.map((logoSrc, i) => (
        <FlexGridItem
          key={i}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Block margin="scale200" width="125px" as="img" src={logoSrc} />
        </FlexGridItem>
      ))}
    </FlexGrid>
    <Button
      $as="a"
      href="https://github.com/uber/baseweb/issues/1889"
      size="compact"
      kind="secondary"
    >
      Please let us know if you are using Base Web!
    </Button>
  </>
);

const Index = (props) => (
  <Layout
    toggleDirection={props.toggleDirection}
    toggleTheme={props.toggleTheme}
  >
    <Block
      marginTop={["scale100", "scale400", "scale800"]}
      display="block"
      $as="a"
      href={BlogPosts[0].path}
      overrides={{
        Block: {
          style: ({ $theme }) => ({
            textDecoration: "none",
            ":focus": {
              outline: `3px solid ${$theme.colors.accent}`,
              outlineOffset: "5px",
            },
          }),
        },
      }}
    >
      <Tag kind="positive" closeable={false}>
        New
      </Tag>
      <Block color="contentPrimary" display="inline-block" font="font250">
        {BlogPosts[0].title}
      </Block>
    </Block>
    <H1>Base Web React UI framework</H1>
    <Markdown.p>
      Base Web is a foundation for initiating, evolving, and unifying web
      products.
    </Markdown.p>
    <Block
      display="flex"
      marginLeft="-16px"
      marginRight="-16px"
      overrides={{
        Block: {
          style: ({ $theme }) => ({
            flexWrap: "wrap",
            [$theme.mediaQuery.small]: {
              flexWrap: "nowrap",
            },
          }),
        },
      }}
    >
      <Card title="Setup Base Web" overrides={cardOverrides}>
        <MinHeightBody>
          Base Web is distributed as an npm package. As Base Web is built on top
          of a CSS-in-JS engine, all you need is the dependencies from npm.
        </MinHeightBody>
        <Button
          $as="a"
          href="/getting-started/setup"
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                boxSizing: "border-box",
                width: "100%",
              }),
            },
          }}
        >
          Setup Base Web
        </Button>
      </Card>

      <Card title="Learning Base Web" overrides={cardOverrides}>
        <MinHeightBody>
          The best way to learn Base Web is to start building an application
          using it. Click on the link below to find 2 apps built using Base Web
          (one simple, one more complex).
        </MinHeightBody>
        <Button
          $as="a"
          href="/getting-started/learn"
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                boxSizing: "border-box",
                width: "100%",
              }),
            },
          }}
        >
          Learn more
        </Button>
      </Card>
    </Block>
    <H2>Components</H2>
    <Markdown.p>
      Base Web offers a robust suite of components out of the box. These include
      complex, ready-to-use components such as{" "}
      <Link href="/components/datepicker">Datepicker</Link> and low-level
      composable primitives, such as <Link href="/components/layer">Layer</Link>
      .
    </Markdown.p>
    <Markdown.p>
      For an overview of everything that we offer, check out the{` `}
      <Link href="https://baseweb.design/ladle">component gallery</Link>.
    </Markdown.p>
    <H2>Extensibility</H2>
    <Markdown.p>
      Through the{" "}
      <Link href="/guides/understanding-overrides">Overrides API</Link> and{" "}
      <Link href="/guides/theming">configurable Themes</Link>, Base Web offers
      an extreme level of customization. Whether you want to modify a component
      in one place only or you want to build your design system on top of Base
      Web, we have options.
    </Markdown.p>
    <H2>Built-in accessibility</H2>
    <Markdown.p>
      Base Web does the heavy lifting for you—components are built with
      accessibility being a first-class citizen.
    </Markdown.p>
    <H2>Performance</H2>
    <Markdown.p>
      Styletron is the CSS-in-JS engine powering Base Web. Based on{" "}
      <Link href="https://ryantsao.com/blog/virtual-css-with-styletron">
        our benchmarks
      </Link>
      , this is one of the fastest solutions.
    </Markdown.p>
    <H2>Figma Community</H2>
    <Markdown.p>
      You can find all the Base Web components on{" "}
      <Link href="https://baseweb.design/blog/base-figma-community/">
        Figma Community
      </Link>
      . This should help your design team adopt Base Web, while engineers can
      use the React implementation.
    </Markdown.p>
    <Adopters
      logoSrcs={[
        "/images/uber-logo.png",
        "/images/broadcom-logo.png",
        "/images/metromile-logo.png",
        "/images/extensis-logo.png",
        "/images/uptime-logo.png",
        "/images/streamlit-logo.png",
        "/images/everbase-logo.png",
        "/images/cadre-logo.png",
        "/images/banzaicloud-logo.png",
        "/images/sprinklr-logo.png",
        "/images/radity-logo.png",
        "/images/gcf-logo.png",
      ]}
    />
  </Layout>
);

export default Index;
