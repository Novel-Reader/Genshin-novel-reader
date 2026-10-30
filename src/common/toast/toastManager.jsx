import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Toast from './toast';

const hasCustomId = settings => Object.hasOwnProperty.call(settings, 'id');

const propTypes = {
  bindNotify: PropTypes.func.isRequired,
  bindGetToasts: PropTypes.func.isRequired,
  bindCloseAll: PropTypes.func.isRequired
};

const ToastManager = ({ bindNotify, bindGetToasts, bindCloseAll }) => {
  const [toasts, setToasts] = useState([]);
  const idCounterRef = useRef(0);

  const closeToast = useCallback((id) => {
    setToasts(previousToasts =>
      previousToasts.map(toast =>
        toast.id === id
          ? { ...toast, isShown: false }
          : toast
      )
    );
  }, []);

  const createToastInstance = useCallback((title, settings) => {
    const uniqueId = ++idCounterRef.current;
    const id = hasCustomId(settings) ? `${settings.id}-${uniqueId}` : uniqueId;
    const hasCloseButton = settings.hasCloseButton !== undefined ? settings.hasCloseButton : true;
    const duration = settings.duration !== undefined ? settings.duration : 3;
    return {
      id,
      title,
      description: settings.description,
      hasCloseButton,
      duration,
      close: () => closeToast(id),
      intent: settings.intent,
    };
  }, [closeToast]);

  const notify = useCallback((title, settings) => {
    if (hasCustomId(settings)) {
      for (const toast of toasts) {
        if (String(toast.id).startsWith(settings.id)) {
          closeToast(toast.id);
        }
      }
    }
    const instance = createToastInstance(title, settings);
    setToasts(previousToasts => [instance, ...previousToasts]);
    return instance;
  }, [toasts, closeToast, createToastInstance]);

  const getToasts = useCallback(() => toasts, [toasts]);

  const closeAll = useCallback(() => {
    toasts.forEach(toast => toast.close());
  }, [toasts]);

  useEffect(() => {
    bindNotify(notify);
    bindGetToasts(getToasts);
    bindCloseAll(closeAll);
  }, [bindNotify, bindGetToasts, bindCloseAll, notify, getToasts, closeAll]);

  const removeToast = useCallback((id) => {
    setToasts(previousToasts => 
      previousToasts.filter(toast => toast.id !== id)
    );
  }, []);

  return (
    <div className="toast-manager">
      {toasts.map(({ id, description, ...props }) => (
        <Toast 
          key={id} 
          onRemove={() => removeToast(id)} 
          {...props}
        >
          {description}
        </Toast>
      ))}
    </div>
  );
};

ToastManager.propTypes = propTypes;

export default ToastManager;
