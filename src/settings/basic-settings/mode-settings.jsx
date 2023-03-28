import React from "react";
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Label } from "reactstrap";
import { PAGES, PARAGRAPHS, FULLSCREEN } from "../../utils/constants";

const MODES = [
  { type: PAGES, name: '分页' },
  { type: PARAGRAPHS, name: '章节' },
  { type: FULLSCREEN, name: '全屏' }
];

function ModeSettings (props) {
  const { changeMode } = props;
  return (
    <div className="basic-settings-item">
      <Label>阅读模式</Label>
      <ButtonGroup>
        {MODES.map((mode, index) => {
          return (
            <Button
              key={index}
              color="primary"
              outline
              onClick={() => changeMode(mode.type)}
            >
              {mode.name}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}

ModeSettings.propTypes = {
  changeMode: PropTypes.func.isRequired
};

export default ModeSettings;
