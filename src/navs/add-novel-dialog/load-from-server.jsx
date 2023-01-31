import React, { Component } from "react";
import VipButton from "../../common/vip-button";

export default class LoadFromServer extends Component {
  render() {
    return (
      <div>
        这是 VIP 用户专属功能
        <VipButton />
      </div>
    );
  }
}
