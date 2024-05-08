import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../reducers/counterSlice';
import { StarIcon, ShareIcon } from "../icons";
import VipDialog from "../vip-dialog";
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
        <StarIcon />
        <span className="vip-button-text">{intl.get('Upgrade')}</span>
      </div>
      {isOpen &&
        <VipDialog toggleUpgrade={toggleUpgrade} />
      }
      <div className="vip-button" onClick={onClick}>
        <ShareIcon />
        <span className="vip-button-text">点击分享 {count}</span>
      </div>
    </>
  );
}
