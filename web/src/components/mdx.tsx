import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { CodeBlock } from "./code-block";

function textOf(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export const mdxComponents: MDXComponents = {
  pre: ({ children }) => {
    const code = textOf(children).replace(/\n$/, "");
    const child = children as { props?: { className?: string } } | undefined;
    const lang = child?.props?.className?.replace("language-", "");
    return <CodeBlock code={code} title={lang} className="my-6" />;
  },
  a: ({ href, children }) => {
    const external = typeof href === "string" && /^https?:/.test(href);
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {children}
      </a>
    );
  },
};
