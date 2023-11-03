import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // support for strikethrough, tables, tasklists and URLs directly
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // syntax highlighting
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "katex/dist/katex.min.css";

// other plugins refrence https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins

function MarkdownViewer(props) {
  return (
    <ReactMarkdown
      children={props.context}
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, "")}
              style={dark}
              language={match[1]}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}

MarkdownViewer.propTypes = {
  context: PropTypes.string.isRequired,
};

export default MarkdownViewer;
