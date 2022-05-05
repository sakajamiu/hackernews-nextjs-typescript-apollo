import { ApolloClient,createHttpLink,InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constraint';
import { split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
    uri:'http://localhost:4000'
})
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
 });
 const wsLink :any= typeof window !=='undefined'? new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: localStorage.getItem(AUTH_TOKEN)
      }
    }
  }): null;
  const link = typeof window !=='undefined'?split(
    ({ query }) => {
      const { kind, operation }:any = getMainDefinition(query);
      return (
        kind === 'OperationDefinition' &&
        operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink)
  ):httpLink;
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export default client