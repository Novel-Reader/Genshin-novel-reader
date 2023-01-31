import React from "react";
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
        <span className="vip-button-text">Upgrade now</span>
      </div>
      {isOpen &&
        <VipDialog toggleUpgrade={toggleUpgrade} />
      }
    </>
  );
}
