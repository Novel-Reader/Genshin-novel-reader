import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup } from 'reactstrap';

function ThemeSettings(props) {

  const [theme, setTheme] = useState(props.theme || 1);

  useEffect(() => {
    props.onSave(theme);
  });

  return (
    <div>
      <h5>页面主题</h5>
      <ButtonGroup>
        <Button
          color="primary"
          outline
          onClick={() => setTheme(1)}
          active={theme === 1}
        >
          日间
        </Button>
        <Button
          color="primary"
          outline
          onClick={() => setTheme(2)}
          active={theme === 2}
        >
          护眼
        </Button>
        <Button
          color="primary"
          outline
          onClick={() => setTheme(3)}
          active={theme === 3}
        >
          夜间
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ThemeSettings;
