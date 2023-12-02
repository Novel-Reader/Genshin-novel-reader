import React from "react";
import intl from "react-intl-universal";

function StarIcon() {
  return <span className="icon icon-star-full"></span>;
}

function LoadingIcon() {
  return <span className="icon icon-spinner"></span>;
}

function SearchIcon() {
  return <span className="icon icon-search" title="搜索"></span>;
}

function ShareIcon() {
  return <span className="icon icon-share2"></span>;
}

function RightIcon() {
  return <span className="icon icon-arrow-right2"></span>;
}

function LeftIcon() {
  return <span className="icon icon-arrow-left2"></span>;
}

function ListIcon() {
  return <span className="icon icon-list2" title={intl.get('Switch to Outline')}></span>;
}

function TreeIcon() {
  return <span className="icon icon-tree" title={intl.get('Switch to document tree view')}></span>;
}

function BackIcon() {
  return <span className="icon icon-arrow-left2"></span>;
}

function DeleteIcon() {
  return <span className="icon icon-cancel-circle"></span>;
}

export {
  StarIcon,
  LoadingIcon,
  SearchIcon,
  ShareIcon,
  RightIcon,
  LeftIcon,
  ListIcon,
  TreeIcon,
  BackIcon,
  DeleteIcon,
};
