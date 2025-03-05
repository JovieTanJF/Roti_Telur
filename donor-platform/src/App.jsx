import { useRoutes } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import routes from './routes';

function App() {
  const routing = useRoutes(routes);

  return (
    <WalletProvider>
      {routing}
    </WalletProvider>
  );
}

export default App;