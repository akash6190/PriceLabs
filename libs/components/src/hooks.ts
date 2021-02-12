import {
  currentFilters,
  useGetCurrentFiltersQuery,
  useGetCurrentPageQuery,
  useGetDrawBoundsQuery,
  useGetSearchStringQuery,
  useSearchQueryLazyQuery,
} from '@pricelabs/graphql';
import { useEffect } from 'react';

export const useSearchResults = () => {
  // TODO:: Not required abhi, Used when adding a draw filter
  // const [boundingBox, setBoundingBox] = useState({});
  const { data: filterData } = useGetCurrentFiltersQuery();
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
          coreFilters: filterData?.currentFilters,
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
  }, [
    queryString,
    filterData?.currentFilters,
    pageData?.currentPage,
    boundsData?.drawBounds,
  ]);

  return {
    loading,
    searchData,
  };
};
