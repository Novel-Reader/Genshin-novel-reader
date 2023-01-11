import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { parseTxtToHTML } from '../../utils';

import './index.css';

export default class LongPage extends Component {

  static propTypes = {
    currentFile: PropTypes.string,
    style: PropTypes.object,
  }

  render() {
    const { currentFile, style = {} } = this.props;
    const list = parseTxtToHTML(currentFile);
    return (
      <div className="long-page">
        <div className='long-page-container' style={style}>
          {list.map((item, index) => {
            return (<p key={index}>{item}</p>);
          })}
        </div>
      </div>
    )
  }
}
