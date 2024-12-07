import React from "react";
import PropTypes from "prop-types";
import { parseTxtToHTML } from "../utils";

function TextViewer(props) {
  const { detail } = props; 
  if (typeof detail !== 'string') {
    return <div>{'Article data structure is not correct, please reupload or re-download this article.'}</div>;
  }
  const list = parseTxtToHTML(detail);
  return (
    <div>
      {list.map((item, index) => {
        return <p key={index}>{item}</p>;
      })}
    </div>
  );
}

TextViewer.propTypes = {
  detail: PropTypes.string.isRequired,
};

export default TextViewer;
