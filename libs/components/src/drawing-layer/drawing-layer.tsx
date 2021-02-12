import { currentDrawBounds } from '@pricelabs/graphql';
import { DrawingManager } from '@react-google-maps/api';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import styles from './drawing-layer.module.scss';

/* eslint-disable-next-line */
export interface DrawingLayerProps {}

export function DrawingLayer(props: DrawingLayerProps) {
  const [showBtn, setShowBtn] = useState(true);
  const toggler = useCallback(() => {
    setShowBtn((prev) => {
      if (!prev) {
        currentDrawBounds(null);
      }
      return !prev;
    });
  }, []);
  // Press esc key to reset
  useEffect(() => {
    const onEscPressed = (e: KeyboardEvent) => {
      console.log(e.key);
      if (!showBtn && e.key === '27') {
        setShowBtn(false);
      }
    };
    document.addEventListener('keypress', onEscPressed);
    return () => {
      document.removeEventListener('keypress', onEscPressed);
    };
  }, []);
  return (
    <>
      <Button
        className={styles.drawBtn}
        variant={showBtn ? 'outline-primary' : 'primary'}
        onClick={toggler}
      >
        {showBtn ? 'Draw Rectangle' : 'Reset'}
      </Button>
      {showBtn ? null : (
        <DrawingManager
          options={{
            drawingControl: false,
          }}
          drawingMode="rectangle"
          onRectangleComplete={(rect) => {
            // set bounds of rect which will make the request and setShowBtn
            // This will cear the rectangle
            rect.setMap(null);

            const neBounds = rect.bounds.getNorthEast();
            const swBounds = rect.bounds.getSouthWest();
            currentDrawBounds({
              neLat: neBounds.lat(),
              neLng: neBounds.lng(),
              swLat: swBounds.lat(),
              swLng: swBounds.lng(),
            });
          }}
        />
      )}
    </>
  );
}

export default DrawingLayer;
