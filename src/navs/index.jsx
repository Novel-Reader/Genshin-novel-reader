import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
import NavFooter from './nav-footer';

import './index.css';

export default class Navs extends Component {

  static propTypes = {
    currentIndex: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { currentIndex } = this.props;
    return (
      <div id="navs" className="navs">
        <div className="navs-header">
          导航栏
          <span className="icon icon-home"></span>
        </div>
        <div className="navs-body">
          {this.props.files.map((file, index) => {
            const isActive = currentIndex === index;
            return (
              <div key={index} className={classnames('navs-body-item text-truncate d-flex', {'active': isActive})}>
                <span className='navs-body-item-name text-truncate' onClick={() => this.props.changeIndex(index)}>{file.name}</span>
                <span className="navs-body-item-delete d-block" onClick={() => this.props.deleteFile(index)}>x</span>
              </div>
            )
          })}
        </div>
        <NavFooter addFile={this.props.addFile} />
      </div>
    )
  }
}
