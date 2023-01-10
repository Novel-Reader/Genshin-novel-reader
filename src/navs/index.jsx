import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap';
import classnames from 'classnames';

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

  onClick = () => {
    this.uploadRef.click();
  }

  onFileChange = (e) => {
    const file = this.uploadRef.files[0];
    var reader = new FileReader();
    reader.readAsText(file, 'utf-8');
    const that = this;
    reader.onload = function () {
      const { name, size } = file;
      that.props.addFile({
        name,
        size,
        context: this.result,
      });
    }
  }

  render() {
    const { currentIndex } = this.props;
    return (
      <div id="navs" className="navs">
        <div className="navs-header">导航栏</div>
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
        <div className="navs-footer">
          <Button onClick={this.onClick} color="primary">上传</Button>
          <input type="file" accept=".txt, .md" onChange={this.onFileChange} ref={node => this.uploadRef = node}></input>
        </div>
      </div>
    )
  }
}
