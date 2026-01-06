import * as React from "react";
import { styled } from "baseui";
import { Tag, SUPPORTED_KIND } from "baseui/tag";
import { TagGroup, HIERARCHY } from "baseui/tag-group";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "32px",
});

export default function Example() {
  return (
    <Container>
      {Object.values(HIERARCHY).map((hierarchy) => (
        <TagGroup hierarchy={hierarchy} key={hierarchy}>
          {Object.values(SUPPORTED_KIND)
            .filter((kind) => kind !== SUPPORTED_KIND.custom)
            .map((kind) => (
              <Tag key={kind} kind={kind}>
                {kind}
              </Tag>
            ))}
        </TagGroup>
      ))}
    </Container>
  );
}
