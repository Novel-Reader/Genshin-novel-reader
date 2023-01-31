import React from "react";
import { Label, Popover } from "reactstrap";
import { SketchPicker } from "react-color";

export default class ColorSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color,
      isShowPicker: false,
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.onDocumentClick);
  }

  componentWillUnmount() {
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
      isShowPicker: false,
    });
  }
  handleChangeComplete = (colorObj) => {
    this.setState({ color: colorObj.hex });
    this.props.changeStyle({
      [this.props.settingKey]: colorObj.hex,
    });
  };

  toggle = (e) => {
    e.stopPropagation();
    this.setState({ isShowPicker: !this.state.isShowPicker });
  }

  render() {
    const style = {
      width: 20,
      height: 20,
      backgroundColor: this.state.color,
      margin: 10,
      border: "1px solid #ccc",
    };
    return (
      <div>
        <Label>{this.props.title}</Label>
        <div style={style} onClick={this.toggle} id='font-color-settings-current'></div>
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
