import React from 'react';
import PropTypes from 'prop-types';
import Toast from './toast';

const hasCustomId = settings => Object.hasOwnProperty.call(settings, 'id');

export default class ToastManager extends React.PureComponent {
  static propTypes = {
    bindNotify: PropTypes.func.isRequired,
    bindGetToasts: PropTypes.func.isRequired,
    bindCloseAll: PropTypes.func.isRequired
  };

  static idCounter = 0;

  constructor(props, context) {
    super(props, context);
    props.bindNotify(this.notify);
    props.bindGetToasts(this.getToasts);
    props.bindCloseAll(this.closeAll);
    this.state = {
      toasts: []
    };
  }

  getToasts = () => {
    return this.state.toasts;
  };

  closeAll = () => {
    this.getToasts().forEach(toast => toast.close());
  };

  notify = (title, settings) => {
    if (hasCustomId(settings)) {
      for (const toast of this.state.toasts) {
        if (String(toast.id).startsWith(settings.id)) {
          this.closeToast(toast.id);
        }
      }
    }

    const instance = this.createToastInstance(title, settings);

    this.setState(previousState => {
      return {
        toasts: [instance, ...previousState.toasts]
      };
    });

    return instance;
  };

  createToastInstance = (title, settings) => {
    const uniqueId = ++ToastManager.idCounter;
    const id = hasCustomId(settings) ? `${settings.id}-${uniqueId}` : uniqueId;

    let hasCloseButton = settings.hasCloseButton || true;
    let duration = settings.duration || 3;
    if (settings.hasCloseButton !== undefined) {
      hasCloseButton = settings.hasCloseButton;
    }

    if (settings.duration !== undefined) {
      duration = settings.duration;
    }

    return {
      id,
      title,
      description: settings.description,
      hasCloseButton: hasCloseButton,
      duration: duration,
      close: () => this.closeToast(id),
      intent: settings.intent
    };
  };

  /**
   * This will set isShown on the Toast which will close the toast.
   * It won't remove the toast until onExited triggers onRemove.
   */
  closeToast = id => {
    this.setState(previousState => {
      return {
        toasts: previousState.toasts.map(toast => {
          if (toast.id === id) {
            return {
              ...toast,
              isShown: false
            };
          }
          return toast;
        })
      };
    });
  };

  removeToast = id => {
    this.setState(previousState => {
      return {
        toasts: previousState.toasts.filter(toast => toast.id !== id)
      };
    });
  };

  render() {
    return (
      <div className="toast-manager">
        {this.state.toasts.map(({ id, description, ...props }) => {
          return (
            <Toast key={id} onRemove={() => this.removeToast(id)} {...props}>
              {description}
            </Toast>
          );
        })}
      </div>
    );
  }
}
