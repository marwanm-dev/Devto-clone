import { useEffect } from 'react';
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import LoadingSpinner from '../../common/LoadingSpinner';
import Placeholder from '../../common/Placeholder';
import RouteWrapper from '../../common/RouteWrapper';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useGetUserDashboardQuery } from '../../core/features/users/usersApiSlice';
import useLocalStorage from '../../hooks/useLocalStorage';
import FollowedTags from './components/FollowedTags';
import Followers from './components/Followers';
import Following from './components/Following';
import Posts from './components/Posts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useLocalStorage('selected-dash', 'posts');
  const { username } = useSelector(selectCurrentUser);
  const { data: user, isLoading } = useGetUserDashboardQuery(username, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <RouteWrapper>
      <Wrapper>
        <Heading>Dashboard</Heading>
        <DashboardWrapper>
          <Aside>
            <Type onClick={() => setSelected('posts')} selected={selected === 'posts'}>
              <Title>Posts</Title>
              <Number>{user?.posts.length || 0}</Number>
            </Type>
            <Type onClick={() => setSelected('followers')} selected={selected === 'followers'}>
              <Title>Followers</Title>
              <Number>{user?.followers.length || 0}</Number>
            </Type>
            <Type
              onClick={() => setSelected('followedTags')}
              selected={selected === 'followedTags'}>
              <Title>Followed tags</Title>
              <Number>{user?.followedTags.length || 0}</Number>
            </Type>
            <Type onClick={() => setSelected('following')} selected={selected === 'following'}>
              <Title>Following</Title>
              <Number>{user?.following.length || 0}</Number>
            </Type>
          </Aside>
          <Main>
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
              user &&
              (selected === 'posts' ? (
                user.posts.length > 0 ? (
                  <Posts
                    posts={user.posts.sort((a, b) => b.createdAt - a.createdAt)}
                    username={user.username}
                    navigate={navigate}
                  />
                ) : (
                  <Placeholder />
                )
              ) : selected === 'followers' ? (
                user.followers.length > 0 ? (
                  <Followers followers={user.followers} navigate={navigate} />
                ) : (
                  <Placeholder />
                )
              ) : selected === 'followedTags' ? (
                user.followedTags.length > 0 ? (
                  <FollowedTags followedTags={user.followedTags} navigate={navigate} />
                ) : (
                  <Placeholder />
                )
              ) : user.following ? (
                <Following following={user.following} navigate={navigate} />
              ) : (
                <Placeholder />
              ))}
          </Main>
        </DashboardWrapper>
      </Wrapper>
    </RouteWrapper>
  );
};

const Heading = tw.h1`mb-lg`;

const DashboardWrapper = tw.div`flex gap-md mob:(flex-col)`;

const Aside = tw.aside`w-1/3 mob:w-full`;

const Type = styled.div`
  ${tw`cursor-pointer rounded-md text-dark-gray p-3 flex justify-between items-center`};
  ${({ selected }) =>
    selected ? tw`bg-white` : tw`bg-transparent hover:(bg-light-blue [p:first-child]:text-blue)`}
`;

const Title = tw.p``;

const Number = tw.p`text-xs p-1 bg-light-gray rounded-md`;

const Wrapper = tw.div``;

const Main = tw.div`w-full`;

export default Dashboard;
