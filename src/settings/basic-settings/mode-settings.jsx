import React from "react";
import { Button, ButtonGroup, Label } from "reactstrap";

export default class ModeSettings extends React.PureComponent {

  render() {
    const { changeMode } = this.props;
    return (
      <div className="basic-settings-item">
        <Label>阅读模式</Label>
        <ButtonGroup>
          <Button
            color="primary"
            outline
            onClick={() => changeMode('pages')}
          >
            分页
          </Button>
          <Button
            color="primary"
            outline
            onClick={() => changeMode('paragraphs')}
          >
            章节
          </Button>
          <Button
            color="primary"
            outline
            onClick={() => changeMode('fullscreen')}
          >
            全屏
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
