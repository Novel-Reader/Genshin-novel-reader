import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

export default class FontSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontSize: props.fontSize || 2,
    };
  }

  setFontSize = (fontSize) => {
    this.setState({ fontSize });
    this.props.onSave(fontSize);
  }  

  render() {
    const { fontSize } = this.state;
    const { setFontSize } = this;
    return (
      <div>
        <h5>文字大小</h5>
        <ButtonGroup>
          <Button
            color="primary"
            outline
            onClick={() => setFontSize(1)}
            active={fontSize === 1}
          >
            大
          </Button>
          <Button
            color="primary"
            outline
            onClick={() => setFontSize(2)}
            active={fontSize === 2}
          >
            中
          </Button>
          <Button
            color="primary"
            outline
            onClick={() => setFontSize(3)}
            active={fontSize === 3}
          >
            小
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}
