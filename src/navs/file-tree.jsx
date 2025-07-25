import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import intl from "react-intl-universal";
import { BsListTask } from "react-icons/bs";
import { Dropdown, Menu, Button } from 'antd';
import FileInfoDialog from './file-info-dialog';

function FileTree({ file, index, currentFileIndex, searchValue, changeFileIndex, deleteFile }) {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = currentFileIndex === index;
  if (searchValue && !file.name.includes(searchValue)) {
    return null;
  }

  return (
    <div key={index} className={classnames("navs-body-item d-flex", { active: isActive })}>
      <span
        className="navs-body-item-name text-truncate"
        onClick={() => changeFileIndex(index)}
      >
        {file.name}
      </span>
      <Dropdown
        trigger={['click']}
        open={dropdownOpen}
        onOpenChange={(visible) => setDropdownOpen(visible)}
        menu={{
          items: [
            {
              key: '1',
              label: intl.get('Information'),
              onClick: () => setDialogOpen(true),
            },
            {
              key: '2',
              label: intl.get('Delete'),
              onClick: () => deleteFile(index),
            },
          ],
        }}
      >
        <Button
          type="link"
          icon={<BsListTask />}
        />
      </Dropdown>
      {dialogOpen && <FileInfoDialog file={file} toggleDialog={() => setDialogOpen(false)}/>}
    </div>
  );
}

FileTree.propTypes = {
  file: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleteFile: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  currentFileIndex: PropTypes.number.isRequired,
  changeFileIndex: PropTypes.func.isRequired,
};

export default FileTree;
