import React from "react";
import intl from "react-intl-universal";
import { Button } from "antd";

export default function FullScreen() {
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  const openFullscreen = () => {
    const full = document.getElementById("main");
    if (!full) return;
    if (full.RequestFullScreen) {
      full.RequestFullScreen();
    } else if (full.mozRequestFullScreen) {
      full.mozRequestFullScreen();
    } else if (full.webkitRequestFullScreen) {
      full.webkitRequestFullScreen();
    } else if (full.msRequestFullscreen) {
      full.msRequestFullscreen();
    }
  };

  // todo: change button to icons in toolbar
  return (
    <>
      <div className="basic-settings-item">
        <Button type="primary" size="small" onClick={toggleFullScreen}>
          {intl.get('Full_screen_webpage')}
        </Button>
      </div>
      <div className="basic-settings-item">
        <Button type="primary" size="small" onClick={openFullscreen}>
          {intl.get('Full_screen_article')}
        </Button>
      </div>
    </>
  );
}
