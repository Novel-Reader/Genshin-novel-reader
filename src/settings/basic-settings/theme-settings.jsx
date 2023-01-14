import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

export default class ThemeSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme || 2,
    };
  }

  setTheme = (theme) => {
    this.setState({ theme });
    this.props.onSave(theme);
  }  

  render() {
    const { theme } = this.state;
    const { setTheme } = this;
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
    )
  }
}
