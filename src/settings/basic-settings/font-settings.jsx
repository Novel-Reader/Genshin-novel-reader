import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup } from 'reactstrap';

function FontSettings(props) {

  const [fontSize, setFontSize] = useState(props.fontSize || 2);

  useEffect(() => {
    props.onSave(fontSize);
  });

  return (
    <div>
      <h5>文字大小</h5>
      <ButtonGroup>
        <Button
          color="primary"
          outline
          onClick={() => setFontSize(1)}
          active={fontSize === 1}
        >
          大
        </Button>
        <Button
          color="primary"
          outline
          onClick={() => setFontSize(2)}
          active={fontSize === 2}
        >
          中
        </Button>
        <Button
          color="primary"
          outline
          onClick={() => setFontSize(3)}
          active={fontSize === 3}
        >
          小
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default FontSettings;
