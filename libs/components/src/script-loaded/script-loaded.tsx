import { useLoadScript } from '@react-google-maps/api';
import React from 'react';
import { Loading } from '@pricelabs/components/loading/loading';

import styles from './script-loaded.module.scss';

/* eslint-disable-next-line */
export interface ScriptLoadedProps {}

export const ScriptLoaded: React.FC<ScriptLoadedProps> = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    libraries: ['places'],
    googleMapsApiKey: 'AIzaSyCS24vzaCuHGf8s_Hcc-J8sg1eJks2mG3A',
  });

  if (loadError) {
    return <div>Unable to load google services.</div>;
  }
  if (isLoaded) {
    return <>{children}</>;
  }
  return <Loading />;
};

export default ScriptLoaded;
