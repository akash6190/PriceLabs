import { useSearchQueryLazyQuery } from '@pricelabs/graphql';
import React from 'react';
import { useSearchResults } from '../hooks';
import Loading from '@pricelabs/components/loading/loading';

import './search-results.module.scss';

/* eslint-disable-next-line */
export interface SearchResultsProps {}

export const SearchResults: React.FC<SearchResultsProps> = (
  props: SearchResultsProps
) => {
  const { loading, searchData } = useSearchResults();

  if (loading) {
    return <Loading />;
  }

  return <div>Search Items</div>;
};

export default SearchResults;
