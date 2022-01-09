// import react
import React from 'react';

// import apollo client
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// import page header/footer
import Header from './components/Header';
import Footer from './components/Footer';

// import home page
import Home from './pages/Home';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


// app build jsx
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

// export app
export default App;
