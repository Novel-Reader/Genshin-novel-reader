import React from "react";
// import intl from "react-intl-universal";
import { Button } from "reactstrap";

export default function FullScreen () {

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const openFullscreen = () => {
    const full = document.getElementById('main');
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
        <Button onClick={toggleFullScreen} size="sm" color="primary">网页全屏</Button>
      </div>
      <div className="basic-settings-item">
        <Button onClick={openFullscreen} size="sm" color="primary">文章全屏</Button>
      </div>
    </>
  );
}
