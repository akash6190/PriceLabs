import {
  currentFilters,
  useGetCurrentPageQuery,
  useGetDrawBoundsQuery,
  useGetSearchStringQuery,
  useSearchQueryLazyQuery,
} from '@pricelabs/graphql';
import { useEffect } from 'react';

export const useSearchResults = () => {
  // TODO:: Not required abhi, Used when adding a draw filter
  // const [boundingBox, setBoundingBox] = useState({});
  const filters = currentFilters();
  const { data: pageData } = useGetCurrentPageQuery();
  const { data: boundsData } = useGetDrawBoundsQuery();
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
            page: pageData?.currentPage ?? 1,
            pageSize: 50,
          },
          // This will be used when drawing a rectangle
          q: queryString,
          boundingBox: boundsData?.drawBounds,
        },
      },
    });
  }, [queryString, filters, pageData?.currentPage, boundsData?.drawBounds]);

  return {
    loading,
    searchData,
  };
};
