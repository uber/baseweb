import * as React from "react";
import { useStyletron } from "baseui";
import { Tag, SUPPORTED_KIND } from "baseui/tag";
import { TagGroup } from "baseui/tag-group";
import { HeadingSmall, ParagraphSmall } from "baseui/typography";

export default function Example() {
  const [css] = useStyletron();
  return (
    <React.Fragment>
      <HeadingSmall>Wrap: true (default)</HeadingSmall>

      <ParagraphSmall>no width set on container</ParagraphSmall>
      <TagGroup>
        {Object.values(SUPPORTED_KIND)
          .filter((kind) => kind !== SUPPORTED_KIND.custom)
          .map((kind) => (
            <Tag key={kind} kind={kind}>
              {kind}
            </Tag>
          ))}
      </TagGroup>

      <ParagraphSmall>width set to 300px on container </ParagraphSmall>
      <div className={css({ width: "300px" })}>
        <TagGroup>
          {Object.values(SUPPORTED_KIND)
            .filter((kind) => kind !== SUPPORTED_KIND.custom)
            .map((kind) => (
              <Tag key={kind} kind={kind}>
                {kind}
              </Tag>
            ))}
        </TagGroup>
      </div>

      <ParagraphSmall>
        width set to 300px on container and tag with long text{" "}
      </ParagraphSmall>
      <div className={css({ width: "300px" })}>
        <TagGroup>
          {Object.values(SUPPORTED_KIND)
            .filter((kind) => kind !== SUPPORTED_KIND.custom)
            .map((kind, index) => (
              <Tag key={kind} kind={kind}>
                {index === 1
                  ? "A very long tag text to test wrapping behavior"
                  : kind}
              </Tag>
            ))}
        </TagGroup>
      </div>

      <ParagraphSmall>
        width set to 100px(smaller than tag text default max width) on container
        and tag with long text - very extreme case
      </ParagraphSmall>
      <div className={css({ marginBottom: "40px", width: "100px" })}>
        <TagGroup>
          {Object.values(SUPPORTED_KIND)
            .filter((kind) => kind !== SUPPORTED_KIND.custom)
            .map((kind, index) => (
              <Tag key={kind} kind={kind}>
                {index === 1
                  ? "A very long tag text to test wrapping behavior"
                  : kind}
              </Tag>
            ))}
        </TagGroup>
      </div>

      <HeadingSmall>Wrap: false</HeadingSmall>
      <ParagraphSmall>no width set on container</ParagraphSmall>
      <TagGroup>
        {Object.values(SUPPORTED_KIND)
          .filter((kind) => kind !== SUPPORTED_KIND.custom)
          .map((kind) => (
            <Tag key={kind} kind={kind}>
              {kind}
            </Tag>
          ))}
      </TagGroup>

      <ParagraphSmall>width set to 300px on container </ParagraphSmall>
      <div className={css({ width: "300px" })}>
        <TagGroup wrap={false}>
          {Object.values(SUPPORTED_KIND)
            .filter((kind) => kind !== SUPPORTED_KIND.custom)
            .map((kind) => (
              <Tag key={kind} kind={kind}>
                {kind}
              </Tag>
            ))}
        </TagGroup>
      </div>

      <ParagraphSmall>
        width set to 300px on container and tag with long text{" "}
      </ParagraphSmall>
      <div className={css({ marginBottom: "40px", width: "300px" })}>
        <TagGroup wrap={false}>
          {Object.values(SUPPORTED_KIND)
            .filter((kind) => kind !== SUPPORTED_KIND.custom)
            .map((kind, index) => (
              <Tag key={kind} kind={kind}>
                {index === 1
                  ? "A very long tag text to test wrapping behavior"
                  : kind}
              </Tag>
            ))}
        </TagGroup>
      </div>
    </React.Fragment>
  );
}
