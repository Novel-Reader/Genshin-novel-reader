import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Button } from "reactstrap";
import AddNovelDialog from "./add-novel-dialog";

class NavFooter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isShowAddDialog: false
    };
  }

  toggleDialog = () => {
    this.setState({ isShowAddDialog: !this.state.isShowAddDialog });
  };

  render () {
    return (
      <>
        <div className="navs-footer">
          <Button onClick={this.toggleDialog} color="primary">增加作品</Button>
        </div>
        {this.state.isShowAddDialog &&
          <AddNovelDialog toggleDialog={this.toggleDialog} addFile={this.props.addFile} />
        }
      </>
    );
  }
}

NavFooter.propTypes = {
  addFile: PropTypes.func.isRequired
};

export default NavFooter;
