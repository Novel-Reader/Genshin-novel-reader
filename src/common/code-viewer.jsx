import React from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getSuffix } from '../utils';

function CodeViewer (props) {
  let lan = getSuffix(props.currentFile.name);
  // TODO js 特殊处理，其他的后缀暂时不需要处理
  if (lan === 'js') {
    lan = 'javascript';
  }
  return (
    <div>
      <SyntaxHighlighter
        language={lan}
        // todo user can change theme color
        style={lan === 'javascript' ? dark : docco}
        showLineNumbers={true}
        showInlineLineNumbers={true}
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
