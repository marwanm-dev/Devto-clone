import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
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
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import SignUp from '../pages/SignUp';
import CodeOfConduct from '../pages/CodeOfConduct';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfUse from '../pages/TermsOfUse';

// Components
import Layout from '../common/Layout';
import RequireAuth from '../common/RequireAuth';

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

          <Route path='users'>
            <Route path=':username' element={<Profile />}>
              {/* Requires to be logged in && be the user that he's going to edit */}
              <Route element={<RequireAuth />}>
                <Route path='edit' element={<EditProfile />} />
              </Route>
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
            <Route path='notifications' element={<Notifications />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='readinglist' element={<ReadingList />} />
            <Route path='settings' element={<Settings />} />
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
          <Routes>
            <Route path='/*' element={<AnimatedRoutes />} />
          </Routes>
        </Provider>
      </Auth0Provider>
    </Router>
  );
};

export default MainRouter;
