import { Auth0Provider } from '@auth0/auth0-react';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Store
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../core/store';

// Pages
import About from '../pages/About';
import CodeOfConduct from '../pages/CodeOfConduct';
import Confirmation from '../pages/Confirmation';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';
import EditPost from '../pages/EditPost';
import EditProfile from '../pages/EditProfile';
import FAQ from '../pages/FAQ';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NewPost from '../pages/NewPost';
import Notifications from '../pages/Notifications';
import PostPage from '../pages/PostPage';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Profile from '../pages/Profile';
import ReadingList from '../pages/ReadingList';
import SignUp from '../pages/SignUp';
import Tag from '../pages/Tag';
import Tags from '../pages/Tags';
import TermsOfUse from '../pages/TermsOfUse';

// Components
import Layout from '../common/Layout';
import NotFound from '../common/NotFound';
import RequireAuth from '../common/RequireAuth/RequireAuth';

const AnimatedRoutes = () => {
  const location = useLocation();

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
            <Route path=':name' element={<Tag />} />
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

          <Route path='customize' element={<EditProfile />} />

          <Route path='auth'>
            <Route path='login' element={<Login />} />
            <Route path='new' element={<SignUp />} />
            <Route path='confirm/:confirmType' element={<Confirmation />} />
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='notifications' element={<Notifications />} />
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
