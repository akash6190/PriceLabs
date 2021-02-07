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
  uri: 'https://www.vrbo.com/serp/g',
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies,
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
