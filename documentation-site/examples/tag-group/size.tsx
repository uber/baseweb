import * as React from "react";
import { styled } from "baseui";
import { Tag } from "baseui/tag";
import { TagGroup, SIZE } from "baseui/tag-group";
import { LabelSmall } from "baseui/typography";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "32px",
});

const Row = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export default function Example() {
  return (
    <Container>
      {Object.values(SIZE).map((size) => (
        <Row key={size}>
          <LabelSmall>{size}</LabelSmall>
          <TagGroup size={size}>
            <Tag>gray</Tag>
            <Tag kind="red">red</Tag>
          </TagGroup>
        </Row>
      ))}
    </Container>
  );
}
