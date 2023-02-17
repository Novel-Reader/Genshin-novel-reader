import React from "react";
import { Button, ButtonGroup, Label } from "reactstrap";

export default function ThemeSettings(props) {

  const [theme, setTheme] = React.useState(props.theme || 2);

  function onClick(theme) {
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
