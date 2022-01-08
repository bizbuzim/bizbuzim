import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";



function App() {
  useEffect(() => {
    const client = new ApolloClient({
      uri: 'http://10.100.102.47:8080/api/v1/graphql',
      cache: new InMemoryCache()
    });
    client
  .query({
    query: gql`
    {
      expenses {
        name
        payment
        price
        tags
      }
    }    
    `
  })
  .then(result => console.log(result));
  })

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
