import { Sidebar } from '@pricelabs/components/sidebar/sidebar';
import React from 'react';
import Container from 'react-bootstrap/Container';

import { Route, Link } from 'react-router-dom';
import { MapView } from '@pricelabs/components/map-view/map-view';

import styles from './home.module.scss';

/* eslint-disable-next-line */
export interface HomeLayoutProps {}

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  // can be used for common header and footer later on
  return (
    <div className={styles.homeContainer}>
      <Sidebar className={styles.sidebarContainer} />
      <MapView className={styles.mapContainer} />
    </div>
  );
};
