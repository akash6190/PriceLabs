import React from 'react';
import { SearchResults } from '@pricelabs/components/search-results/search-results';
import { SearchForm } from '@pricelabs/components/search-form/search-form';
import clsx from 'clsx';

import styles from './sidebar.module.scss';

/* eslint-disable-next-line */
export interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, children }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <SearchForm />
      <SearchResults className={clsx(styles.resultContainer, 'pt-3')} />
    </div>
  );
};

export default Sidebar;
