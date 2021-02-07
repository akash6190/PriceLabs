import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type PointRef = {
  __typename?: 'PointRef';
  latitude?: Maybe<Scalars['Int']>;
  longitude?: Maybe<Scalars['Int']>;
};

export type BathroomDetails = {
  __typename?: 'BathroomDetails';
  full?: Maybe<Scalars['Int']>;
  half?: Maybe<Scalars['Int']>;
  toiletOnly?: Maybe<Scalars['Boolean']>;
};

export type ImageRef = {
  __typename?: 'ImageRef';
  altText: Scalars['String'];
  c6_uri: Scalars['String'];
  c9_uri: Scalars['String'];
};

export type MapViewport = {
  __typename?: 'MapViewport';
  neLat?: Maybe<Scalars['Int']>;
  neLong?: Maybe<Scalars['Int']>;
  swLat?: Maybe<Scalars['Int']>;
  swLong?: Maybe<Scalars['Int']>;
};

export type SearchItem = {
  __typename?: 'SearchItem';
  listingId: Scalars['String'];
  sleeps: Scalars['Int'];
  relevance: Scalars['Int'];
  description: Scalars['String'];
  bathrooms?: Maybe<BathroomDetails>;
  bedrooms?: Maybe<Scalars['Int']>;
  noOfOccupants?: Maybe<Scalars['Int']>;
  geoCode: PointRef;
  mapViewport?: Maybe<MapViewport>;
  images?: Maybe<ImageRef>;
  ratingValue?: Maybe<Scalars['Int']>;
  ratingCount?: Maybe<Scalars['Int']>;
  averageRating?: Maybe<Scalars['Int']>;
  reviewCount?: Maybe<Scalars['Int']>;
  queryUUID?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
};

export type SearchResultList = {
  fromRecord: Scalars['Int'];
  toRecord: Scalars['Int'];
  pageSize: Scalars['Int'];
  pageCount: Scalars['Int'];
  page: Scalars['Int'];
  resultCount: Scalars['Int'];
  listings: Array<Maybe<SearchItem>>;
};

export type MinMaxInt = {
  __typename?: 'MinMaxInt';
  min?: Maybe<Scalars['Int']>;
  max?: Maybe<Scalars['Int']>;
};

export type MapPoint = {
  lat?: Maybe<Scalars['Int']>;
  lng?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  activeListingId?: Maybe<Scalars['String']>;
  mapCenter?: Maybe<MapPoint>;
  showFilters?: Maybe<Scalars['Boolean']>;
  queryString: Scalars['String'];
  currentPage?: Maybe<Scalars['Int']>;
  search?: Maybe<SearchResultList>;
};


export type QuerySearchArgs = {
  request: SearchResultRequest;
};

export type PageInput = {
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type FilterInput = {
  testFilter?: Maybe<Scalars['Int']>;
};

export type CoreFilterInput = {
  maxBathrooms?: Maybe<Scalars['Int']>;
  maxBedrooms?: Maybe<Scalars['Int']>;
  maxNightlyPrice?: Maybe<Scalars['Int']>;
  maxTotalPrice?: Maybe<Scalars['Int']>;
  minTotalPrice?: Maybe<Scalars['Int']>;
  minBathrooms?: Maybe<Scalars['Int']>;
  minBedrooms?: Maybe<Scalars['Int']>;
  minNightlyPrice?: Maybe<Scalars['Int']>;
  pets?: Maybe<Scalars['Int']>;
};

export type BoundingBoxInput = {
  maxLat?: Maybe<Scalars['Int']>;
  maxLng?: Maybe<Scalars['Int']>;
  minLat?: Maybe<Scalars['Int']>;
  minLng?: Maybe<Scalars['Int']>;
};

export type SearchResultRequest = {
  paging?: Maybe<PageInput>;
  filterVersion?: Maybe<Scalars['String']>;
  filters: Array<Maybe<FilterInput>>;
  coreFilters: CoreFilterInput;
  boundingBox?: Maybe<BoundingBoxInput>;
  q: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  hoverSearch?: Maybe<SearchItem>;
};


export type MutationHoverSearchArgs = {
  searchId: Scalars['String'];
};

export type MinMaxFragment = (
  { __typename: 'MinMaxInt' }
  & Pick<MinMaxInt, 'min' | 'max'>
);

export type GetMapCenterQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMapCenterQuery = (
  { __typename?: 'Query' }
  & { mapCenter?: Maybe<never> }
);

export type GetSearchStringQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSearchStringQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'queryString'>
);

export type GetCurrentPageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentPageQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'currentPage'>
);

export type ShouldShowFilterQueryVariables = Exact<{ [key: string]: never; }>;


export type ShouldShowFilterQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'showFilters'>
);

export type GetActiveListingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveListingQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'activeListingId'>
);

export type SearchQueryQueryVariables = Exact<{
  request: SearchResultRequest;
}>;


export type SearchQueryQuery = (
  { __typename?: 'Query' }
  & { results?: Maybe<never> }
);

export const MinMaxFragmentDoc = gql`
    fragment minMax on MinMaxInt {
  min
  max
  __typename
}
    `;
export const GetMapCenterDocument = gql`
    query GetMapCenter {
  mapCenter @client {
    lat
    lng
  }
}
    `;

/**
 * __useGetMapCenterQuery__
 *
 * To run a query within a React component, call `useGetMapCenterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMapCenterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMapCenterQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMapCenterQuery(baseOptions?: Apollo.QueryHookOptions<GetMapCenterQuery, GetMapCenterQueryVariables>) {
        return Apollo.useQuery<GetMapCenterQuery, GetMapCenterQueryVariables>(GetMapCenterDocument, baseOptions);
      }
export function useGetMapCenterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMapCenterQuery, GetMapCenterQueryVariables>) {
          return Apollo.useLazyQuery<GetMapCenterQuery, GetMapCenterQueryVariables>(GetMapCenterDocument, baseOptions);
        }
export type GetMapCenterQueryHookResult = ReturnType<typeof useGetMapCenterQuery>;
export type GetMapCenterLazyQueryHookResult = ReturnType<typeof useGetMapCenterLazyQuery>;
export type GetMapCenterQueryResult = Apollo.QueryResult<GetMapCenterQuery, GetMapCenterQueryVariables>;
export const GetSearchStringDocument = gql`
    query GetSearchString {
  queryString @client
}
    `;

/**
 * __useGetSearchStringQuery__
 *
 * To run a query within a React component, call `useGetSearchStringQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchStringQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchStringQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSearchStringQuery(baseOptions?: Apollo.QueryHookOptions<GetSearchStringQuery, GetSearchStringQueryVariables>) {
        return Apollo.useQuery<GetSearchStringQuery, GetSearchStringQueryVariables>(GetSearchStringDocument, baseOptions);
      }
export function useGetSearchStringLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSearchStringQuery, GetSearchStringQueryVariables>) {
          return Apollo.useLazyQuery<GetSearchStringQuery, GetSearchStringQueryVariables>(GetSearchStringDocument, baseOptions);
        }
export type GetSearchStringQueryHookResult = ReturnType<typeof useGetSearchStringQuery>;
export type GetSearchStringLazyQueryHookResult = ReturnType<typeof useGetSearchStringLazyQuery>;
export type GetSearchStringQueryResult = Apollo.QueryResult<GetSearchStringQuery, GetSearchStringQueryVariables>;
export const GetCurrentPageDocument = gql`
    query GetCurrentPage {
  currentPage @client
}
    `;

/**
 * __useGetCurrentPageQuery__
 *
 * To run a query within a React component, call `useGetCurrentPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentPageQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentPageQuery, GetCurrentPageQueryVariables>) {
        return Apollo.useQuery<GetCurrentPageQuery, GetCurrentPageQueryVariables>(GetCurrentPageDocument, baseOptions);
      }
export function useGetCurrentPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentPageQuery, GetCurrentPageQueryVariables>) {
          return Apollo.useLazyQuery<GetCurrentPageQuery, GetCurrentPageQueryVariables>(GetCurrentPageDocument, baseOptions);
        }
export type GetCurrentPageQueryHookResult = ReturnType<typeof useGetCurrentPageQuery>;
export type GetCurrentPageLazyQueryHookResult = ReturnType<typeof useGetCurrentPageLazyQuery>;
export type GetCurrentPageQueryResult = Apollo.QueryResult<GetCurrentPageQuery, GetCurrentPageQueryVariables>;
export const ShouldShowFilterDocument = gql`
    query ShouldShowFilter {
  showFilters @client
}
    `;

/**
 * __useShouldShowFilterQuery__
 *
 * To run a query within a React component, call `useShouldShowFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useShouldShowFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShouldShowFilterQuery({
 *   variables: {
 *   },
 * });
 */
export function useShouldShowFilterQuery(baseOptions?: Apollo.QueryHookOptions<ShouldShowFilterQuery, ShouldShowFilterQueryVariables>) {
        return Apollo.useQuery<ShouldShowFilterQuery, ShouldShowFilterQueryVariables>(ShouldShowFilterDocument, baseOptions);
      }
export function useShouldShowFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShouldShowFilterQuery, ShouldShowFilterQueryVariables>) {
          return Apollo.useLazyQuery<ShouldShowFilterQuery, ShouldShowFilterQueryVariables>(ShouldShowFilterDocument, baseOptions);
        }
export type ShouldShowFilterQueryHookResult = ReturnType<typeof useShouldShowFilterQuery>;
export type ShouldShowFilterLazyQueryHookResult = ReturnType<typeof useShouldShowFilterLazyQuery>;
export type ShouldShowFilterQueryResult = Apollo.QueryResult<ShouldShowFilterQuery, ShouldShowFilterQueryVariables>;
export const GetActiveListingDocument = gql`
    query GetActiveListing {
  activeListingId @client
}
    `;

/**
 * __useGetActiveListingQuery__
 *
 * To run a query within a React component, call `useGetActiveListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveListingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActiveListingQuery(baseOptions?: Apollo.QueryHookOptions<GetActiveListingQuery, GetActiveListingQueryVariables>) {
        return Apollo.useQuery<GetActiveListingQuery, GetActiveListingQueryVariables>(GetActiveListingDocument, baseOptions);
      }
export function useGetActiveListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActiveListingQuery, GetActiveListingQueryVariables>) {
          return Apollo.useLazyQuery<GetActiveListingQuery, GetActiveListingQueryVariables>(GetActiveListingDocument, baseOptions);
        }
export type GetActiveListingQueryHookResult = ReturnType<typeof useGetActiveListingQuery>;
export type GetActiveListingLazyQueryHookResult = ReturnType<typeof useGetActiveListingLazyQuery>;
export type GetActiveListingQueryResult = Apollo.QueryResult<GetActiveListingQuery, GetActiveListingQueryVariables>;
export const SearchQueryDocument = gql`
    query SearchQuery($request: SearchResultRequest!) {
  results: search(request: $request) {
    __typename
    fromRecord
    toRecord
    pageSize
    pageCount
    page
    resultCount
    listings {
      images {
        altText
        c6_uri
        c9_uri
      }
      bedrooms
      sleeps
      bathrooms {
        full
        half
        toiletOnly
        __typename
      }
      headline
      listingId
      averageRating
      reviewCount
      geoCode {
        latitude
        longitude
        __typename
      }
    }
  }
}
    `;

/**
 * __useSearchQueryQuery__
 *
 * To run a query within a React component, call `useSearchQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQueryQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSearchQueryQuery(baseOptions: Apollo.QueryHookOptions<SearchQueryQuery, SearchQueryQueryVariables>) {
        return Apollo.useQuery<SearchQueryQuery, SearchQueryQueryVariables>(SearchQueryDocument, baseOptions);
      }
export function useSearchQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQueryQuery, SearchQueryQueryVariables>) {
          return Apollo.useLazyQuery<SearchQueryQuery, SearchQueryQueryVariables>(SearchQueryDocument, baseOptions);
        }
export type SearchQueryQueryHookResult = ReturnType<typeof useSearchQueryQuery>;
export type SearchQueryLazyQueryHookResult = ReturnType<typeof useSearchQueryLazyQuery>;
export type SearchQueryQueryResult = Apollo.QueryResult<SearchQueryQuery, SearchQueryQueryVariables>;