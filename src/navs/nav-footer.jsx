import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import intl from "react-intl-universal";
import AddNovelDialog from "./add-novel-dialog";

class NavFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAddDialog: false,
    };
  }

  toggleDialog = () => {
    this.setState({ isShowAddDialog: !this.state.isShowAddDialog });
  };

  render() {
    return (
      <>
        <div className="navs-footer">
          <Button onClick={this.toggleDialog} type="primary">
            {intl.get('Add')}
          </Button>
        </div>
        {this.state.isShowAddDialog && (
          <AddNovelDialog
            toggleDialog={this.toggleDialog}
            addFile={this.props.addFile}
            checkFileExist={this.props.checkFileExist}
            mode={this.props.mode}
            server={this.props.server}
          />
        )}
      </>
    );
  }
}

NavFooter.propTypes = {
  addFile: PropTypes.func.isRequired,
  checkFileExist: PropTypes.func.isRequired,
};

export default NavFooter;
