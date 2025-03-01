import React, { Component } from "react";
import { Form, Input, Typography } from 'antd';
import watermark from "watermark-dom";
import intl from "react-intl-universal";
import { getLocalValue, setLocalValue } from "../../utils/store";
import toaster from "../../common/toast";

class WatermarkSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  componentDidMount() {
    getLocalValue("watermark-text").then((localStyleStr) => {
      if (localStyleStr) {
        this.setState({ text: localStyleStr });
      }
    });
  }

  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onBlur = (e) => {
    const text = e.target.value.trim();
    if (text.length > 20) {
      toaster.warning(intl.get('The watermark length cannot exceed 20 characters'));
      return;
    }
    setLocalValue("watermark-text", text);
    if (text) {
      watermark.load({
        watermark_txt: text,
        watermark_id: "novel-reader-watermark",
        watermark_alpha: 0.15,
        watermark_parent_node: null,
        watermark_fontsize: "24px",
        watermark_width: 150,
        watermark_height: 150,
      });
    } else {
      toaster.success(intl.get('The watermark was successfully removed, please refresh the interface later'));
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  };

  render() {
    return (
      <Form.Item>
        <Typography.Title level={5}>{intl.get('Watermark')}</Typography.Title>
        <Input
          value={this.state.text}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </Form.Item>
    );
  }
}

getLocalValue("watermark-text").then((localStyleStr) => {
  if (localStyleStr) {
    watermark.load({
      watermark_txt: localStyleStr,
      watermark_id: "novel-reader-watermark",
      watermark_alpha: 0.15,
      watermark_parent_node: null,
      watermark_fontsize: "24px",
      watermark_width: 150,
      watermark_height: 150,
    });
  }
});

export default WatermarkSettings;
