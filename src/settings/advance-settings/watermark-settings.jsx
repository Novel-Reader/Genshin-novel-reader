import React, { Component } from "react";
import { Label, Input, FormGroup } from "reactstrap";
import watermark from 'watermark-dom';
import { getLocalValue, setLocalValue } from '../../utils/store';
import toaster from '../../common/toast';

class WatermarkSettings extends Component {

  constructor (props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    getLocalValue('watermark-text').then(localStyleStr => {
      if (localStyleStr) {
        this.setState({ text: localStyleStr });
      }
    });
  };

  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onBlur = (e) => {
    const text = e.target.value.trim();
    if (text.length > 20) {
      toaster.warning('水印长度不能超过20个字符');
      return;
    }
    setLocalValue('watermark-text', text);
    if (text) {
      watermark.load({
        watermark_txt: text,
        watermark_id: 'novel-reader-watermark',
        watermark_alpha: 0.15,
        watermark_parent_node: null,
        watermark_fontsize: '24px',
        watermark_width: 150,
        watermark_height: 150,
      });
    } else {
      // 实际上，使用这个库有点问题，加载 watermark 是正常的，去掉水印时不生效，可能需要重新刷新页面
      // 最新的版本有问题，目前使用 1.0.0 版本，但是也不太好
      // 水印去掉时，需要重新加载页面
      toaster.success('水印成功移除，稍后刷新界面');
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  };

  render () {
    return (
      <FormGroup>
        <Label>{'水印'}</Label>
        <Input
          value={this.state.text}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </FormGroup>
    );
  }
}

getLocalValue('watermark-text').then(localStyleStr => {
  if (localStyleStr) {
    watermark.load({
      watermark_txt: localStyleStr,
      watermark_id: 'novel-reader-watermark',
      watermark_alpha: 0.15,
      watermark_parent_node: null,
      watermark_fontsize: '24px',
      watermark_width: 150,
      watermark_height: 150,
    });
  }
});

export default WatermarkSettings;
