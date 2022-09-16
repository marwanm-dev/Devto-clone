import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoSearch } from 'react-icons/io5';
import { RiNotification3Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import tw, { styled, theme } from 'twin.macro';
import profileMenu from '../../animations/profileMenu';
import SocketContext from '../../context/SocketContext';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useLazyGetUnreadNotificationsQuery } from '../../core/features/users/usersApiSlice';
import { preventScroll } from '../../helpers/body';
import useBreakpoint from '../../hooks/useBreakpoint';
import useRequireAuth from '../../hooks/useRequireAuth';
import useToast from '../../hooks/useToast';
import useToggle from '../../hooks/useToggle';
import MobileMenu from './components/MobileMenu';
import Search from './components/Search';

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isAuthed } = useRequireAuth();
  const { socket } = useContext(SocketContext);
  const isMobile = useBreakpoint(theme`screens.mob.max`.replace('px', ''));
  const [profileMenuOpen, toggleProfileMenuOpen] = useToggle(false);
  const [mobileSearch, toggleMobileSearch] = useToggle(false);
  const [mobileMenu, toggleMobileMenu] = useToggle(false);
  const [trigger, { data: unreadNotifications }] = useLazyGetUnreadNotificationsQuery();
  const createToast = useToast();
  preventScroll(mobileMenu);

  const getUnreadNotifications = () => {
    if (isAuthed) trigger(currentUser.id);
  };

  useEffect(() => {
    getUnreadNotifications();
    socket?.on('notificationReceived', ({ sender, receiverUsername, type, reactionType, post }) => {
      createToast({ sender, receiverUsername, type, reactionType, post });
      setTimeout(() => {
        getUnreadNotifications();
      }, 1000);
    });

    return () => socket.off('notificationReceived');
  }, []);

  return (
    <Wrapper>
      <Top>
        <LeftSide>
          {isMobile && (
            <HamburgerIcon onClick={toggleMobileMenu}>
              <GiHamburgerMenu />
            </HamburgerIcon>
          )}
          <DevIcon>
            <Image src='../../assets/images/dev-unofficial.png' />
          </DevIcon>
          {isMobile || <Search />}
          {isMobile && mobileMenu && <MobileMenu toggleMobileMenu={toggleMobileMenu} />}
        </LeftSide>
        <RightSide>
          {isAuthed ? (
            <>
              {isMobile ? (
                <SearchIcon onClick={toggleMobileSearch}>
                  <IoSearch />
                </SearchIcon>
              ) : (
                <NewPost to='post'>Create Post</NewPost>
              )}
              <NotificationIcon>
                <RiNotification3Line />
                {unreadNotifications?.length > 0 && <Count>{unreadNotifications.length}</Count>}
              </NotificationIcon>
              <Avatar src={currentUser.picture?.url} onClick={toggleProfileMenuOpen} />
              <AnimatePresence>
                {profileMenuOpen && (
                  <ProfileMenu variants={profileMenu} initial='initial' animate='shown' exit='exit'>
                    <ListItem>
                      <Link to={`/${currentUser.username}`}>
                        <Name>{currentUser.name}</Name>
                        <UserGmail>
                          @{currentUser.email.slice(0, currentUser.email.indexOf('@'))}
                        </UserGmail>
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to='dashboard'>Dashboard</Link>
                    </ListItem>
                    <ListItem>
                      <Link to='post'>Create Post</Link>
                    </ListItem>
                    <ListItem>
                      <Link to='readinglist'>Reading list</Link>
                    </ListItem>
                    <ListItem>
                      <Link to='customize'>Settings</Link>
                    </ListItem>
                    <ListItem>
                      <Link to='/auth/confirm/logout-account'>Sign Out</Link>
                    </ListItem>
                  </ProfileMenu>
                )}
              </AnimatePresence>
            </>
          ) : (
            <>
              {isMobile ? (
                <SearchIcon onClick={toggleMobileSearch}>
                  <IoSearch />
                </SearchIcon>
              ) : (
                <Login>Log in</Login>
              )}
              <SignUp>Create Account</SignUp>
            </>
          )}
        </RightSide>
      </Top>
      <Bottom>{isMobile && mobileSearch && <Search />}</Bottom>
    </Wrapper>
  );
};

const Image = tw.img`w-11 h-11 rounded-md`;

const Wrapper = tw.nav`w-full bg-white fixed left-0 top-0 z-30 py-2 px-pg shadow-md`;

const Top = tw.div`w-full max-w-pg mx-auto flex justify-between items-center gap-sm py-2`;

const LeftSide = tw.div`flex-1 flex items-center gap-sm`;

const HamburgerIcon = tw.div`rounded-md text-black p-1 hover:(text-blue bg-light-blue) cursor-pointer [& svg]:text-lg`;

const SearchIcon = tw.div`rounded-md text-black p-1 hover:(text-blue bg-light-blue) cursor-pointer [& svg]:text-lg`;

const DevIcon = styled(Link).attrs({
  to: '/',
})`
  svg {
    font-size: 2.5rem;
  }
`;

const RightSide = tw.div`flex items-center gap-sm relative`;

const NewPost = styled(Link)`
  ${tw`rounded-md border border-solid border-white py-2 px-3 text-blue bg-white border-blue hover:(text-white bg-blue border-blue)`}
`;

const NotificationIcon = styled(Link).attrs({
  to: 'notifications',
})`
  ${tw`rounded-md text-black p-1 hover:(text-blue bg-light-blue)`}
  position: relative;
  svg {
    font-size: 1.5rem;
  }
`;

const Count = tw.div`bg-red text-white rounded-full font-bold text-xs px-1 absolute top-0 right-0`;

const Avatar = styled.img`
  ${tw`max-w-none w-12 h-12 transition-none object-cover rounded-full overflow-hidden cursor-pointer`}
`;

const Login = styled(Link).attrs({
  to: 'auth/login',
})`
  ${tw`rounded-md text-black py-2 px-3 hover:(text-blue bg-light-blue)`}
`;

const SignUp = styled(Link).attrs({
  to: 'auth/new',
})`
  ${tw`rounded-md border border-solid border-white py-2 px-3 text-blue bg-white border-blue hover:(text-white bg-blue border-blue)`}
`;

const ProfileMenu = tw(
  motion.ul
)`w-60 px-2 py-2 bg-white rounded-md absolute bottom-[calc(-1 * 22rem)] right-0 z-50 shadow-md [a]:(block w-full)`;

const ListItem = styled.li`
  margin: 0.25rem 0;
  & > a {
    ${tw`rounded-md px-2 py-2 text-darker-gray  hover:(text-blue bg-light-blue)`}
  }
  &:first-child > a {
    ${tw`rounded-md text-darker-gray hover:(text-blue bg-light-blue)`}
  }
  &:first-child {
    margin-bottom: 0.5rem;
    border-bottom: 1px solid ${theme`colors.lighter-gray`};
    a {
      margin-bottom: 0.5rem;
    }
  }
  &:last-child {
    margin-top: 0.5rem;
    border-top: 1px solid ${theme`colors.lighter-gray`};
    a {
      margin-top: 0.5rem;
    }
  }
`;

const Name = tw.h3``;

const UserGmail = tw.h4`text-gray`;

const Bottom = tw.div`flex justify-between flex-col items-center 
pt-2`;

export default Navbar;
