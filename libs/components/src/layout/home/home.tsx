import { Sidebar } from '@pricelabs/components/sidebar/sidebar';
import React from 'react';
import Container from 'react-bootstrap/Container';

import { Route, Link } from 'react-router-dom';
import { MapView } from '@pricelabs/components/map-view/map-view';

import styles from './home.module.scss';
import { useShouldShowFilterQuery } from '@pricelabs/graphql';
import clsx from 'clsx';
import FilterSidebar from '@pricelabs/components/filter-sidebar/filter-sidebar';

/* eslint-disable-next-line */
export interface HomeLayoutProps {}

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const { data } = useShouldShowFilterQuery();
  // can be used for common header and footer later on
  return (
    <div className={styles.homeContainer}>
      <Sidebar
        className={clsx(styles.sidebarContainer, {
          [styles.shadow]: data?.showFilters,
        })}
      />
      {data?.showFilters ? <FilterSidebar /> : null}
      <MapView
        className={clsx(styles.mapContainer, {
          [styles.overlay]: data?.showFilters,
        })}
      />
    </div>
  );
};
