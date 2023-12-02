import React from "react";
import intl from "react-intl-universal";
import { StarIcon } from "../icons";
import VipDialog from "../vip-dialog";
import "./index.css";

export default function VipButton() {
  const [isOpen, setOpen] = React.useState(false);

  function toggleUpgrade() {
    setOpen(!isOpen);
  }

  return (
    <>
      <div className="vip-button" onClick={toggleUpgrade}>
        <StarIcon />
        <span className="vip-button-text">{intl.get('Upgrade')}</span>
      </div>
      {isOpen && <VipDialog toggleUpgrade={toggleUpgrade} />}
    </>
  );
}
