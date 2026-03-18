import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import intl from "react-intl-universal";
import AddNovelDialog from "./add-novel-dialog";

const NavFooter = (props) => {
  const { addFile, checkFileExist, mode, server } = props;
  const [isShowAddDialog, setIsShowAddDialog] = useState(false);

  const toggleDialog = () => {
    setIsShowAddDialog(!isShowAddDialog);
  };

  return (
    <>
      <div className="navs-footer">
        <Button onClick={toggleDialog} type="primary">
          {intl.get('Add')}
        </Button>
      </div>
      {isShowAddDialog && (
        <AddNovelDialog
          toggleDialog={toggleDialog}
          addFile={addFile}
          checkFileExist={checkFileExist}
          mode={mode}
          server={server}
        />
      )}
    </>
  );
};

NavFooter.propTypes = {
  addFile: PropTypes.func.isRequired,
  checkFileExist: PropTypes.func.isRequired,
  mode: PropTypes.string,
  server: PropTypes.string,
};

export default NavFooter;
