import React from "react";
import PropTypes from 'prop-types';
import { Label, Popover } from "reactstrap";
import { SketchPicker } from "react-color";

class ColorSettings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      color: this.props.color,
      isShowPicker: false
    };
  }

  componentDidMount () {
    document.addEventListener("click", this.onDocumentClick);
  }

  componentWillUnmount () {
    document.removeEventListener("click", this.onDocumentClick);
  }

  onDocumentClick = (e) => {
    if (!this.state.isShowPicker) return;
    let dom = e.target;
    while (dom) {
      if (dom.className.includes("font-color-settings-picker")) {
        return;
      }
      dom = dom.parentElement;
    }
    this.setState({
      isShowPicker: false
    });
  };

  handleChangeComplete = (colorObj) => {
    this.setState({ color: colorObj.hex });
    this.props.changeStyle({
      [this.props.settingKey]: colorObj.hex
    });
  };

  toggle = (e) => {
    e.stopPropagation();
    this.setState({ isShowPicker: !this.state.isShowPicker });
  };

  render () {
    return (
      <div>
        <Label>{this.props.title}</Label>
        <div style={{ backgroundColor: this.state.color }} onClick={this.toggle} id='font-color-settings-current'></div>
        {this.state.isShowPicker &&
          <Popover placement="left" isOpen={this.state.isShowPicker} target='font-color-settings-current' fade={false} hideArrow>
            <SketchPicker
              className='font-color-settings-picker'
              color={this.state.color}
              onChangeComplete={this.handleChangeComplete}
            />
          </Popover>
        }
      </div>
    );
  }
}

ColorSettings.propTypes = {
  color: PropTypes.string.isRequired,
  changeStyle: PropTypes.func.isRequired,
  settingKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default ColorSettings;
