import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { DeleteIcon } from "../common/icons";

class FileTree extends Component {
  render() {
    const { files, currentFileIndex, searchValue } = this.props;
    return (
      <div>
        {files.map((file, index) => {
          const isActive = currentFileIndex === index;
          if (searchValue && !file.name.includes(searchValue)) {
            return null;
          }
          return (
            <div
              key={index}
              className={classnames("navs-body-item text-truncate d-flex", {
                active: isActive,
              })}
            >
              <span
                className="navs-body-item-name text-truncate"
                onClick={() => this.props.changeFileIndex(index)}
              >
                {file.name}
              </span>
              <span
                className="navs-body-item-delete d-block"
                onClick={() => this.props.deleteFile(index)}
              >
                <DeleteIcon />
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

FileTree.propTypes = {
  files: PropTypes.array.isRequired,
  deleteFile: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  currentFileIndex: PropTypes.number.isRequired,
  changeFileIndex: PropTypes.func.isRequired,
};

export default FileTree;
