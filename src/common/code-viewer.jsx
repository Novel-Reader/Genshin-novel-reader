import React from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, github, sunburst, ascetic, monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getSuffix } from '../utils';

// TODO: user can change theme color
function getStyle(key) {
  let dict = {
    docco,
    github,
    sunburst,
    ascetic,
    monokai,
  };
  return dict[key] || docco;
}

function getLan(suffix) {
  if (suffix === 'js') {
    return 'javascript';
  }
  return suffix;
}

function CodeViewer (props) {
  const suffix = getSuffix(props.currentFile.name);
  return (
    <div className="code-viewer">
      <SyntaxHighlighter
        language={getLan(suffix)}
        style={getStyle()}
        showLineNumbers={true}
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
  currentFile: PropTypes.object.isRequired,
};

export default CodeViewer;
