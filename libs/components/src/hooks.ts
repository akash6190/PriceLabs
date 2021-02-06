import {
  CoreFilterInput,
  currentFilters,
  queryString,
  useSearchQueryLazyQuery,
} from '@pricelabs/graphql';
import { useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

export const useSearchResults = () => {
  // TODO:: Not required abhi, Used when adding a draw filter
  // const [boundingBox, setBoundingBox] = useState({});
  const filters = currentFilters();
  const query = queryString();

  const [
    performSearch,
    { loading, data: searchData },
  ] = useSearchQueryLazyQuery();

  // run everytime query is changed
  useEffect(() => {
    console.log('Running query');
    performSearch({
      variables: {
        request: {
          filterVersion: '1',
          filters: [],
          coreFilters: filters,
          paging: {
            page: 1,
            pageSize: 50,
          },
          boundingBox: {
            maxLat: 1,
            minLat: 1,
            maxLng: 1,
            minLng: 1,
          },
          q: query,
        },
      },
    });
  }, [query, filters]);

  return {
    loading,
    searchData,
  };
};
