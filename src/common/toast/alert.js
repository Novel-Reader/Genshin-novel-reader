import React from 'react';
import PropTypes from 'prop-types';
import { AiFillWarning } from "react-icons/ai";
import { MdOutlineDangerous } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { BsCheck } from "react-icons/bs";

const propTypes = {
  intent: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onRemove: PropTypes.func.isRequired,
  children: PropTypes.string,
  isRemovable: PropTypes.bool,
};

class Alert extends React.PureComponent {

  getIconClass(intent) {
    switch (intent) {
      case 'success':
        return <GrStatusGood />;
      case 'warning':
        return <AiFillWarning />;
      case 'none':
        return <BsCheck />;
      case 'danger':
        return <MdOutlineDangerous />;
      default:
        return <BsCheck />;
    }
  }

  render() {
    const { intent, title, children, isRemovable, onRemove } = this.props;
    return (
      <div className={`toast-alert-container ${intent || 'success'}`}>
        <div className="toast-alert-icon">
          {this.getIconClass(intent)}
        </div>
        <div className="toast-text-container">
          <p className="toast-text-title">{title}</p>
          {children ? <p className="toast-text-child">{children}</p> : null}
        </div>
        {isRemovable && (
          <div onClick={onRemove} className="toast-close">
            <span>&times;</span>
          </div>
        )}
      </div>
    );
  }
}

Alert.propTypes = propTypes;

export default Alert;
