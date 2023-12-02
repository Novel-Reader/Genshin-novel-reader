import React from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Button, ButtonGroup, Label } from "reactstrap";

function ThemeSettings(props) {
  const [theme, setTheme] = React.useState(props.theme || 2);

  function onClick(theme) {
    props.onSave(theme);
    setTheme(theme);
  }

  const THEMES = [
    intl.get('Daytime'),
    intl.get('Green_theme'),
    intl.get('Nighttime'),
  ];

  return (
    <div className="basic-settings-item">
      <Label>{intl.get('Page_Theme')}</Label>
      <ButtonGroup>
        {THEMES.map((item, index) => {
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
  theme: PropTypes.number,
};

ThemeSettings.defaultProps = {};

export default ThemeSettings;
