import { useEffect, useState } from 'react';
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
import NotFound from '../common/NotFound';

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
          <Route path='post' element={<NewPost />} />

          <Route path='tags'>
            <Route index element={<Tags />} />
            <Route path=':tagname' element={<Tag />} />
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route path=':username'>
            <Route index element={<Profile />} />

            <Route path=':postUrl'>
              <Route index element={<PostPage />} />
              <Route path='edit' element={<EditPost />} />
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

          <Route path='notifications' element={<Notifications />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='readinglist' element={<ReadingList />} />
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
