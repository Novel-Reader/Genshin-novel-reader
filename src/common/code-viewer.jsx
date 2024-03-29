import React from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeViewer(props) {
  let lan = props.lan;
  // TODO js 特殊处理，其他的后缀暂时不需要处理
  if (lan === "js") {
    lan = "javascript";
  }
  return (
    <div>
      <SyntaxHighlighter
        language={lan}
        // todo user can change theme color
        style={lan === "javascript" ? dark : docco}
        showLineNumbers={true}
        showInlineLineNumbers={true}
        wrapLongLines={true}
      >
        {props.detail}
      </SyntaxHighlighter>
    </div>
  );
}

CodeViewer.propTypes = {
  detail: PropTypes.string.isRequired,
  lan: PropTypes.string.isRequired,
};

export default CodeViewer;
