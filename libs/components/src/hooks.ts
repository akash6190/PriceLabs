import {
  currentFilters,
  useGetCurrentPageQuery,
  useGetSearchStringQuery,
  useSearchQueryLazyQuery,
} from '@pricelabs/graphql';
import { useEffect } from 'react';

export const useSearchResults = () => {
  // TODO:: Not required abhi, Used when adding a draw filter
  // const [boundingBox, setBoundingBox] = useState({});
  const filters = currentFilters();
  const { data: pageData } = useGetCurrentPageQuery();

  const {
    data: { queryString },
  } = useGetSearchStringQuery();

  const [
    performSearch,
    { loading, data: searchData },
  ] = useSearchQueryLazyQuery();

  // run everytime query is changed
  useEffect(() => {
    performSearch({
      variables: {
        request: {
          filterVersion: '1',
          filters: [],
          coreFilters: filters,
          paging: {
            page: pageData?.currentPage ?? 0,
            pageSize: 50,
          },
          // This will be used when drawing a rectangle
          // boundingBox: {
          //   maxLat: 1,
          //   minLat: 1,
          //   maxLng: 1,
          //   minLng: 1,
          // },
          q: queryString,
        },
      },
    });
  }, [queryString, filters, pageData?.currentPage]);

  return {
    loading,
    searchData,
  };
};
