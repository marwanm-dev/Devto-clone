import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider, useSelector } from 'react-redux';
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
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import SignUp from '../pages/SignUp';
import Users from '../pages/Users';
import User from '../pages/User';
import CodeOfConduct from '../pages/CodeOfConduct';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfUse from '../pages/TermsOfUse';

// Components
import Layout from '../common/Layout';
import RequireAuth from '../common/RequireAuth';

import { selectCurrentToken, selectTokenExpiration } from '../core/features/auth/authSlice';

import useRefreshToken from '../hooks/useRefreshToken';

import axios from '../api/axios';

const AnimatedRoutes = () => {
  const location = useLocation();
  const expirationDate = useSelector(selectTokenExpiration);
  const token = useSelector(selectCurrentToken);
  const refresh = useRefreshToken();

  useEffect(() => {
    if (token) {
      console.log(expirationDate, Date.now(), `isExpired: ${expirationDate < Date.now()}`);
      if (expirationDate < Date.now()) {
        console.log('Access token Expired! trying to refresh..');
        const refresh = async () => {
          const response = await axios.get('/refresh', {
            headers: { 'Access-Control-Allow-Credentials': true },
          });

          // set new access token
          console.log(`responseData: ${response.data}`);

          // dispatch(setCredentials({}));

          return response.data.accessToken;
        };
        refresh();
      }
    }
  }, [location]);

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

          <Route path='post'>
            <Route path='new' element={<NewPost />} />
            <Route path=':username:title:postId' element={<PostPage />} />
            {/* Requires to be logged in && be the author of this post (:username:title:postId) */}
            <Route element={<RequireAuth />}>
              <Route path='edit' element={<EditPost />} />
            </Route>
          </Route>

          <Route path='tags'>
            <Route index element={<Tags />} />
            <Route path=':tagname' element={<Tag />} />
          </Route>

          <Route path=':username' element={<Profile />}>
            {/* //Todo Requires to be logged in && be the user that he's going to edit */}
            <Route element={<RequireAuth />}>
              <Route path='edit' element={<EditProfile />} />
            </Route>
          </Route>

          <Route path='auth'>
            <Route path='login' element={<Login />} />
            <Route path='new' element={<SignUp />} />
            <Route element={<RequireAuth />}>
              <Route path='logout' element={<Logout />} />
            </Route>
          </Route>

          <Route element={<RequireAuth />}>
            <Route path='users'>
              <Route index element={<Users />} />
              <Route path=':userId' element={<User />} />
            </Route>

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
