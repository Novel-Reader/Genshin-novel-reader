import React from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, github, sunburst, ascetic, monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getSuffix } from '../utils';

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
    <div>
      <SyntaxHighlighter
        language={getLan(suffix)}
        // todo user can change theme color
        style={getStyle()}
        showLineNumbers={true}
        wrapLongLines={true}
      >
        {props.context}
      </SyntaxHighlighter>
    </div>
  );
}

CodeViewer.propTypes = {
  context: PropTypes.string.isRequired,
  currentFile: PropTypes.object.isRequired,
};

export default CodeViewer;
