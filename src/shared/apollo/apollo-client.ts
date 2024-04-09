import { ApolloClient } from '@apollo/client/core';
import { getClientOptions } from './index';

const options = getClientOptions();
const apolloClient = new ApolloClient(options);

export default apolloClient;
