// Contexts & Providers
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { SocketProvider } from '../context/SocketContext';

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
          <SocketProvider>
            <PersistGate loading={null} persistor={persistor}>
              <GlobalReset />
              <GlobalTypography />
              <CustomToastContainer />
              <Routes />
            </PersistGate>
          </SocketProvider>
        </Provider>
      </Router>
    </>
  );
};

export default App;
