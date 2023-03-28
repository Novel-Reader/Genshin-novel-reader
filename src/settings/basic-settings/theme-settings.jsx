import React from "react";
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Label } from "reactstrap";

function ThemeSettings (props) {
  const [theme, setTheme] = React.useState(props.theme || 2);

  function onClick (theme) {
    props.onSave(theme);
    setTheme(theme);
  }

  return (
    <div className="basic-settings-item">
      <Label>页面主题</Label>
      <ButtonGroup>
        {['日间', '护眼', '夜间'].map((item, index) => {
          return (
            <Button
              key={index}
              color="primary"
              outline
              onClick={() => onClick(index)}
              active={theme === index}
            >
              {item}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}

ThemeSettings.propTypes = {
  onSave: PropTypes.func.isRequired,
  theme: PropTypes.number
};

ThemeSettings.defaultProps = {
};

export default ThemeSettings;
