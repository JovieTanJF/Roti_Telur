import { ApolloProvider } from '@apollo/client';
import { WalletProvider } from './context/WalletContext';
import Routes from './routes';
import client from './graphql/client';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <WalletProvider>
        <Routes />
      </WalletProvider>
    </ApolloProvider>
  );
};

export default App;