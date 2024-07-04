import React from "react";
import intl from "react-intl-universal";
import { BsFillStarFill } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../reducers/counterSlice';
import VipDialog from "../vip-dialog";
// import { ShareIcon } from "../icons";
import "./index.css";

export default function VipButton () {

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  function onClick() {
    dispatch(increment());
  }

  const [isOpen, setOpen] = React.useState(false);
  function toggleUpgrade () {
    setOpen(!isOpen);
  }

  return (
    <>
      <div className="vip-button" onClick={toggleUpgrade}>
        <BsFillStarFill />
        <span className="vip-button-text">{intl.get('Upgrade')}</span>
      </div>
      {isOpen &&
        <VipDialog toggleUpgrade={toggleUpgrade} />
      }
      <div className="vip-button" onClick={onClick}>
        {/* <ShareIcon /> */}
        <span className="vip-button-text">点击分享 {count}</span>
      </div>
    </>
  );
}
