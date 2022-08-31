// Contexts & Providers
import { Auth0Provider } from '@auth0/auth0-react';
import { SocketProvider } from '../context/SocketContext';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// Stores
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../core/store';

// Routes
import Routes from './Routes';

// Components
import CustomToastContainer from '../common/CustomToastContainer';

// Resets
import GlobalReset from '../global/GlobalReset';
import GlobalTypography from '../global/GlobalTypography';
import '../styles/index.css';

const App = () => {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
            redirectUri={window.location.origin}>
            <SocketProvider>
              <PersistGate loading={null} persistor={persistor}>
                <GlobalReset />
                <GlobalTypography />
                <CustomToastContainer />
                <Routes />
              </PersistGate>
            </SocketProvider>
          </Auth0Provider>
        </Provider>
      </Router>
    </>
  );
};

export default App;
