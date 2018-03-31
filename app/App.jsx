import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import store from './configureStore';
import Navbar from './components/Navbar';
import Page from './components/Page';
import Routes from './routes';

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/embracebook' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <Page>
            <Routes />
          </Page>
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);

export default hot(module)(App);
