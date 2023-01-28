import React, { Component } from 'react'
import { Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody } from 'reactstrap';
import LoadFromLocal from './load-from-local';
import LoadFromServer from './load-from-server';

import './add-novel-dialog.css';

export default class AddNovelDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'local',
    };
  }

  toggle = (activeTab) => {
    this.setState({ activeTab });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <Modal isOpen={true} toggle={this.props.toggleDialog} className="add-novel-dialog" size="lg">
        <ModalHeader toggle={this.props.toggleDialog}>导入</ModalHeader>
        <ModalBody>
          <div className='add-novel-dialog-side'>
            <Nav pills vertical>
              <NavItem>
                <NavLink className={activeTab === 'local' ? 'active' : ''} onClick={this.toggle.bind(this, 'local')}>
                  本地导入
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={activeTab === 'network' ? 'active' : ''} onClick={this.toggle.bind(this, 'network')}>
                  在线导入
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <div className='add-novel-dialog-main'>
            {activeTab === 'local' &&
              <LoadFromLocal addFile={this.props.addFile} toggleDialog={this.props.toggleDialog} />
            }
            {activeTab === 'network' &&
              <LoadFromServer addFile={this.props.addFile} toggleDialog={this.props.toggleDialog} />
            }
          </div>
        </ModalBody>
      </Modal>
    );
  }
}