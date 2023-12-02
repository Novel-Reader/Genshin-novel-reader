import React, { Component } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Button, ButtonGroup, Label } from "reactstrap";

class FontSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: props.fontSize || 2,
    };
  }

  setFontSize = (fontSize) => {
    this.setState({ fontSize });
    this.props.onSave(fontSize);
  };

  render() {
    const { fontSize } = this.state;
    const { setFontSize } = this;
    return (
      <div className="basic-settings-item">
        <Label>{intl.get('Font_Size')}</Label>
        <ButtonGroup>
          <Button
            color="primary"
            outline
            onClick={() => setFontSize(1)}
            active={fontSize === 1}
          >
            {intl.get('Large')}
          </Button>
          <Button
            color="primary"
            outline
            onClick={() => setFontSize(2)}
            active={fontSize === 2}
          >
            {intl.get('Middle')}
          </Button>
          <Button
            color="primary"
            outline
            onClick={() => setFontSize(3)}
            active={fontSize === 3}
          >
            {intl.get('Small')}
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

FontSettings.propTypes = {
  fontSize: PropTypes.number,
  onSave: PropTypes.func.isRequired,
};

export default FontSettings;
