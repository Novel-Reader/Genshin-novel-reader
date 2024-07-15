import React from "react";
import intl from "react-intl-universal";
import { BsFillStarFill } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../reducers/counter-slice-reducer';
import VipDialog from "../vip-dialog";
import "./index.css";

export default function VipButton () {

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // 这里写了一个计数器做测试，点击按钮后增加一次计数
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
        <span className="vip-button-text">点击分享 {count}</span>
      </div>
    </>
  );
}
