import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  gql,
  InMemoryCache,
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { typePolicies } from '@pricelabs/graphql';

import App from './app/app';

const httpLink = createHttpLink({
  // please check proxy.conf.json for the correct url
  uri: '/graphql',
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies,
  }),
});

// const EXAMPLE_QUERY = gql`
//   query SearchRequestQuery1($request: SearchResultRequest!) {
//     results: search(request: $request) {
//       __typename
//       ...MapSearchResult
//     }
//   }
//   fragment MapHitListing on Listing {
//     bathrooms {
//       full
//       half
//       toiletOnly
//       __typename
//     }
//     bedrooms
//     propertyType
//     sleeps
//     petsAllowed
//     spaces {
//       spacesSummary {
//         area {
//           areaValue
//           __typename
//         }
//         __typename
//       }
//       __typename
//     }
//     geoCode {
//       latitude
//       longitude
//       __typename
//     }
//     __typename
//   }
//   fragment MapSearchResult on SearchResult {
//     mapViewport {
//       neLat
//       neLong
//       swLat
//       swLong
//       __typename
//     }
//     page
//     pageSize
//     listings {
//       ...MapHitListing
//       __typename
//     }
//     pinnedListing {
//       listing {
//         ...MapHitListing
//         __typename
//       }
//       __typename
//     }
//     __typename
//   }
// // `;
// // client
// //   .query({
// //     query: EXAMPLE_QUERY,
// //     variables: {
// //       request: {
// //         paging: {
// //           page: 1,
// //           pageSize: 50,
// //         },
// //         filterVersion: '1',
// //         filters: [],
// //         coreFilters: {
// //           maxBathrooms: null,
// //           maxBedrooms: null,
// //           maxNightlyPrice: null,
// //           maxTotalPrice: null,
// //           minBathrooms: 0,
// //           minBedrooms: 0,
// //           minNightlyPrice: 0,
// //           minTotalPrice: null,
// //           pets: 0,
// //         },
// //         // boundingBox: {
// //         //   maxLat: 42.05596903889523,
// //         //   maxLng: -86.47877523091317,
// //         //   minLat: 41.79337697865317,
// //         //   minLng: -88.63484212544442,
// //         // },
// //         q: 'andros-town-bahamas-(asd)',
// //       },
// //     },
// //   })
// //   .then((result) => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
