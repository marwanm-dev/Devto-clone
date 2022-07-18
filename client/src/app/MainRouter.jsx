import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { Auth0Provider } from '@auth0/auth0-react';

// Store
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../core/store';
import store from '../core/store';

// Pages
import Home from '../pages/Home';
import PostPage from '../pages/PostPage';
import NewPost from '../pages/NewPost';
import EditPost from '../pages/EditPost';
import Tags from '../pages/Tags';
import Tag from '../pages/Tag';
import FAQ from '../pages/FAQ';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import Notifications from '../pages/Notifications';
import Dashboard from '../pages/Dashboard';
import ReadingList from '../pages/ReadingList';
import Login from '../pages/Login';
import Confirmation from '../pages/Confirmation';
import SignUp from '../pages/SignUp';
import CodeOfConduct from '../pages/CodeOfConduct';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfUse from '../pages/TermsOfUse';

// Components
import Layout from '../common/Layout';
import RequireAuth from '../common/RequireAuth';
import NotFound from '../common/NotFound';

// Refreshing the token & logging out imports
import useRefreshToken from '../hooks/useRefreshToken';
import { selectCurrentToken, selectExpirationDate } from '../core/features/auth/authSlice';

const AnimatedRoutes = () => {
  const location = useLocation();
  const handleRefresh = useRefreshToken();

  const expirationDate = useSelector(selectExpirationDate);
  const token = useSelector(selectCurrentToken);

  const interval = expirationDate - Date.now();

  useEffect(() => {
    const i = setInterval(() => token && handleRefresh(), interval);
    return () => clearInterval(i);
  }, [expirationDate]);

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='faq' element={<FAQ />} />

          <Route path='about' element={<About />} />

          <Route path='contact' element={<Contact />} />

          <Route path='code-of-conduct' element={<CodeOfConduct />} />

          <Route path='privacy-policy' element={<PrivacyPolicy />} />

          <Route path='terms-of-use' element={<TermsOfUse />} />

          <Route element={<RequireAuth />}>
            <Route path='post' element={<NewPost />} />
          </Route>

          <Route path='tags'>
            <Route index element={<Tags />} />
            <Route path=':tagname' element={<Tag />} />
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route path=':username'>
            <Route index element={<Profile />} />
            <Route path=':postUrl'>
              <Route index element={<PostPage />} />
              <Route element={<RequireAuth />}>
                <Route path='edit' element={<EditPost />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path='customize' element={<EditProfile />} />
          </Route>

          <Route path='auth'>
            <Route path='login' element={<Login />} />
            <Route path='new' element={<SignUp />} />
            <Route element={<RequireAuth />}>
              <Route path='confirm/:confirmType' element={<Confirmation />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path='notifications' element={<Notifications />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='readinglist' element={<ReadingList />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const MainRouter = () => {
  return (
    <Router>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              <Route path='/*' element={<AnimatedRoutes />} />
            </Routes>
          </PersistGate>
        </Provider>
      </Auth0Provider>
    </Router>
  );
};

export default MainRouter;
