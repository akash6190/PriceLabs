import React from 'react';
import { SearchResults } from '@pricelabs/components/search-results/search-results';
import { SearchForm } from '@pricelabs/components/search-form/search-form';

import styles from './sidebar.module.scss';

/* eslint-disable-next-line */
export interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <SearchForm />
      <div className={styles.resultContainer}>
        <SearchResults />
      </div>
    </div>
  );
};

export default Sidebar;
