import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import Alert from './alert.jsx';

const ANIMATION_DURATION = 240;

const propTypes = {
  zIndex: PropTypes.number,
  duration: PropTypes.number,
  onRemove: PropTypes.func,
  intent: PropTypes.oneOf(['none', 'success', 'warning', 'danger']).isRequired,
  title: PropTypes.node,
  children: PropTypes.node,
  hasCloseButton: PropTypes.bool,
  isShown: PropTypes.bool
};

const Toast = ({
  zIndex,
  duration,
  onRemove,
  intent,
  title,
  children,
  hasCloseButton,
  isShown: propIsShown
}) => {
  const [isShown, setIsShown] = useState(true);
  const [height, setHeight] = useState(0);
  const closeTimerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsShown(propIsShown);
  }, [propIsShown]);

  useEffect(() => {
    startCloseTimer();
    return () => {
      clearCloseTimer();
    };
  }, []);

  const close = useCallback((event) => {
    if (event) {
      event.nativeEvent.stopImmediatePropagation();
      event.stopPropagation();
    }
    clearCloseTimer();
    setIsShown(false);
  }, []);

  const startCloseTimer = useCallback(() => {
    if (duration) {
      closeTimerRef.current = setTimeout(() => {
        close();
      }, duration * 1000);
    }
  }, [duration, close]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    clearCloseTimer();
  }, [clearCloseTimer]);

  const handleMouseLeave = useCallback(() => {
    startCloseTimer();
  }, [startCloseTimer]);

  const onRef = useCallback((ref) => {
    if (ref === null) return;
    containerRef.current = ref;
    const { height: refHeight } = ref.getBoundingClientRect();
    setHeight(refHeight);
  }, []);

  return (
    <Transition
      appear
      unmountOnExit
      timeout={ANIMATION_DURATION}
      in={isShown}
      onExited={onRemove}
    >
      {state => (
        <div
          data-state={state}
          className={`toast-container ${state}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            height: height,
            zIndex: zIndex,
            marginBottom: isShown ? 0 : -height
          }}
        >
          <div ref={onRef} style={{ padding: 8 }}>
            <Alert
              intent={intent || 'none'}
              title={title}
              children={children || ''}
              isRemovable={hasCloseButton}
              onRemove={(event) => close(event)}
            />
          </div>
        </div>
      )}
    </Transition>
  );
};

Toast.propTypes = propTypes;

export default Toast;
