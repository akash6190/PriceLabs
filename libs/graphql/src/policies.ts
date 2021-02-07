import { makeVar, TypePolicies } from '@apollo/client';
import { CoreFilterInput, PointRef } from './lib/graphql';

export enum EHoverTarget {
  NONE,
  ON_MAP,
  ON_ITEM,
}

export const activeListing = makeVar<{
  listingId: string;
  hoverTarget: EHoverTarget;
}>({
  listingId: '',
  hoverTarget: EHoverTarget.NONE,
});
export const queryString = makeVar<string>('');
export const loading = makeVar<boolean>(true);
export const currentFilters = makeVar<CoreFilterInput>({
  maxBathrooms: 0,
  minBathrooms: 0,
  maxBedrooms: 0,
  minBedrooms: 0,
  maxNightlyPrice: null,
  maxTotalPrice: null,
  minNightlyPrice: 0,
  minTotalPrice: null,
});

export const currentPage = makeVar<number>(1);

// TODO:: change default to use users current location (check react-use)
export const mapCenter = makeVar<{
  lat: number;
  lng: number;
}>({
  lat: -3.745,
  lng: -38.523,
});

export const paginationData = makeVar<{
  page: number;
  pageSize: number;
}>({
  page: 1,
  pageSize: 10,
});

export const showFilters = makeVar<boolean>(false);

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      activeListingId: {
        read() {
          return activeListing();
        },
      },
      mapCenter: {
        read() {
          return mapCenter();
        },
      },

      currentPage: {
        read() {
          return currentPage();
        },
      },

      queryString: {
        read() {
          return queryString();
        },
      },

      showFilters: {
        read() {
          return showFilters();
        },
      },
    },
  },
};