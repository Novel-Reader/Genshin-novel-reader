import React from "react";
import PropTypes from "prop-types";
import { parseTxtToHTML } from "../utils";

function TextViewer(props) {
  const list = parseTxtToHTML(props.detail);
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
