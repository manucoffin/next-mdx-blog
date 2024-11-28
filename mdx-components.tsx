import type { MDXComponents } from "mdx/types";
import { CTACard } from "./app/blog/_components/cta-card";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    CTACard,
  };
}
