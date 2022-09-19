import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes as RouterRoutes, useLocation } from 'react-router-dom';

// Pages
import Confirmation from '../pages/Confirmation';
import Dashboard from '../pages/Dashboard';
import EditPost from '../pages/EditPost';
import EditProfile from '../pages/EditProfile';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NewPost from '../pages/NewPost';
import Notifications from '../pages/Notifications';
import PostPage from '../pages/PostPage';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import SignUp from '../pages/SignUp';
import Tag from '../pages/Tag';
import Tags from '../pages/Tags';

// Components
import Layout from '../common/Layout';
import NotFound from '../common/NotFound';
import RequireAuth from '../common/RequireAuth/RequireAuth';

const Routes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <AnimatePresence exitBeforeEnter>
      <RouterRoutes location={location} key={location.pathname}>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='search' element={<Search />} />
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

          <Route element={<RequireAuth />}>
            <Route path='customize' element={<EditProfile />} />
          </Route>

          <Route path='auth'>
            <Route path='login' element={<Login />} />
            <Route path='new' element={<SignUp />} />
            <Route path='confirm/:confirmType' element={<Confirmation />} />
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='reading-list' element={<Home saved={true} />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </RouterRoutes>
    </AnimatePresence>
  );
};

export default Routes;
