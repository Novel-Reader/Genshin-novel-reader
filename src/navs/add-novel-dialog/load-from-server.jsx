import React, { Component } from "react";
import VipButton from "../../common/vip-button";

export default class LoadFromServer extends Component {
  render() {
    return (
      <div>
        这是 VIP 用户专属功能
        <VipButton />
        {/* 如果是在线，而且已经是付费，那么这里支持列出热门小说，然后支持下载到本地 */}
      </div>
    );
  }
}
