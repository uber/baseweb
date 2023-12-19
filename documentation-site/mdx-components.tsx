import type { MDXComponents } from "mdx/types";
import markdownElements from "./components/markdown-elements";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...markdownElements,
  };
}
