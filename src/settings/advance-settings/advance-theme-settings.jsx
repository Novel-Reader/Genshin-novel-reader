import React, { Component } from "react";
import PropTypes from 'prop-types';
import Select from "react-select";
import { Label } from "reactstrap";
import { MenuSelectStyle } from "../../utils";

class AdvanceThemeSettings extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentSelected: null
    };
    const preLink = "https://julia-1994.github.io/images/";
    this.options = [
      {
        value: {
          color: "rgb(34, 36, 47)",
          backgroundColor: "rgb(236, 237, 235)",
          backgroundImage: `${preLink}KamisatoAyaka/02.jpg`
        },
        label: "神里凌华"
      },
      {
        value: {
          color: "rgb(97, 30, 30)",
          backgroundColor: "rgb(236, 194, 155)",
          backgroundImage: `${preLink}Xiaogong/%E5%AE%B5%E5%AE%AB-100948840_p0.jpg`
        },
        label: "宵宫"
      },
      {
        value: {
          color: "rgb(64, 44, 105)",
          backgroundColor: "rgb(188, 232, 255)",
          backgroundImage: `${preLink}Barbara/100974140_p0.jpg`
        },
        label: "芭芭拉"
      },
      {
        value: {
          color: "color: rgb(53, 58, 96)",
          backgroundColor: "rgb(264, 231, 237)",
          backgroundImage: `${preLink}Keqing/391665038937_.pic_hd.jpg`
        },
        label: "刻晴"
      },
      {
        value: {
          color: "color: rgb(178, 66, 65)",
          backgroundColor: "rgb(188, 232, 255)",
          backgroundImage: `${preLink}Amber/amber.jpg`
        },
        label: "安柏"
      },
      {
        value: {
          color: "color: rgb(53, 58, 96)",
          backgroundColor: "rgb(264, 231, 237)",
          backgroundImage: `${preLink}Jane/441665038946_.pic_hd.jpg`
        },
        label: "丽莎"
      },
      {
        value: {
          color: "color: rgb(53, 58, 96)",
          backgroundColor: "rgb(264, 231, 237)",
          backgroundImage: `${preLink}Keqing/381665038936_.pic.jpg`
        },
        label: "小艾咪"
      },
      {
        value: {
          color: "color: rgb(181,82,92)",
          backgroundColor: "rgb(253, 243, 239)",
          backgroundImage: `${preLink}/Noelle/01.webp`
        },
        label: "诺艾尔"
      }
    ];
  }

  onChange = (option) => {
    this.setState({ currentSelected: option });
    const { backgroundImage, backgroundColor, color } = option.value;
    this.props.changeStyle({
      backgroundImage,
      backgroundColor,
      color
    });
  };

  render () {
    const preCls = "advance-theme-settings";
    return (
      <div className={preCls}>
        <Label>系列主题</Label>
        <Select
          value={this.state.currentSelected}
          options={this.options}
          onChange={this.onChange}
          captureMenuScroll={false}
          className={`${preCls}-select`}
          classNamePrefix
          placeholder='选择主题'
          styles={MenuSelectStyle}
        />
      </div>
    );
  }
}

AdvanceThemeSettings.propTypes = {
  changeStyle: PropTypes.object.isRequired
};

export default AdvanceThemeSettings;
