import { nanoid } from '@reduxjs/toolkit';
import { AiFillFacebook, AiFillGithub, AiFillInstagram } from 'react-icons/ai';
import { RiSettingsLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import {
  useGetFollowingTagsQuery,
  useGetNumTagsQuery,
} from '../../core/features/tags/tagsApiSlice';
import useRequireAuth from '../../hooks/useRequireAuth';

const Resources = ({ saved }) => {
  const navigate = useNavigate();
  const { isAuthed } = useRequireAuth();

  const { id: userId } = useSelector(selectCurrentUser);
  const { data: followingTags } = useGetFollowingTagsQuery(
    { userId },
    { refetchOnMountOrArgChange: true }
  );
  const { data: tags } = useGetNumTagsQuery(null, { refetchOnMountOrArgChange: true });

  return (
    <Wrapper>
      {!isAuthed && (
        <DevCommunity>
          <DevHeading>
            <span>DEV Community</span> is a community of 861,806 amazing developers
          </DevHeading>
          <DevDesc>
            We're a place where coders share, stay up-to-date and grow their careers.
          </DevDesc>
          <Buttons>
            <SignUp>Create account</SignUp>
            <Login>Log in</Login>
          </Buttons>
        </DevCommunity>
      )}
      <PublicLinks>
        <LinkWrapper>
          <Image src='../../../assets/images/home.png' />
          <Link to='/'>Home</Link>
        </LinkWrapper>

        <LinkWrapper>
          <Image src='../../../assets/images/reading.png' />
          <Link to={!saved && 'reading-list'}>Reading List</Link>
        </LinkWrapper>

        <LinkWrapper>
          <Image src='../../../assets/images/tags.png' />
          <Link to='tags'>Tags</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Image src='../../../assets/images/faq.png' />
          <Link to='faq'>FAQ</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Image src='../../../assets/images/about.png' />
          <Link to='about'>About</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Image src='../../../assets/images/chat.png' />
          <Link to='contact'>Contact</Link>
        </LinkWrapper>
      </PublicLinks>
      <OtherLinks>
        <Heading>Other</Heading>
        <LinkWrapper>
          <Image src='../../../assets/images/code-of-conduct.png' />
          <Link to='code-of-conduct'>Code of Conduct</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Image src='../../../assets/images/privacy-policy.png' />
          <Link to='privacy-policy'>Privacy Policy</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Image src='../../../assets/images/terms-of-use.png' />
          <Link to='terms-of-use'>Terms of Use</Link>
        </LinkWrapper>
      </OtherLinks>
      <SocialLinks>
        <SocialWrapper>
          <Link to='/'>
            <AiFillFacebook />
          </Link>
        </SocialWrapper>
        <SocialWrapper>
          <Link to='/'>
            <AiFillInstagram />
          </Link>
        </SocialWrapper>
        <SocialWrapper>
          <Link to='/'>
            <AiFillGithub />
          </Link>
        </SocialWrapper>
      </SocialLinks>
      <Tags>
        {isAuthed && followingTags?.length > 0 && (
          <>
            <Header>
              <TagsHeading>My Tags</TagsHeading>
              <Settings>
                <LinkWrapper>
                  <RiSettingsLine onClick={() => navigate('/customize')} />
                </LinkWrapper>
              </Settings>
            </Header>
            <SubscribedTags>
              {followingTags?.map(tag => (
                <LinkWrapper key={nanoid()}>
                  <Link to={`/tags/${tag.name}`}>#{tag.name}</Link>
                </LinkWrapper>
              ))}
            </SubscribedTags>
          </>
        )}
        {(!isAuthed || !followingTags?.length > 0) && (
          <>
            <Header>
              <TagsHeading>Popular Tags</TagsHeading>
            </Header>
            <PopularTags>
              {tags?.map(tag => (
                <LinkWrapper key={nanoid()}>
                  <Link to={`/tags/${tag.name}`}>#{tag.name}</Link>
                </LinkWrapper>
              ))}
            </PopularTags>
          </>
        )}
      </Tags>
    </Wrapper>
  );
};

const DevHeading = styled.h2`
  > span {
    ${tw`text-blue`}
  }
`;
const DevDesc = tw.p`text-darker-gray`;

const DevCommunity = styled.div`
  ${tw`bg-white py-6 px-4 rounded-md mb-4`}
  > *:not(:first-child) {
    ${tw`mt-4`}
  }
`;

const Buttons = tw.div`flex flex-col text-center gap-2`;

const Login = styled(Link).attrs({
  to: 'auth/login',
})`
  ${tw`w-full rounded-md text-black py-2 px-3 hover:(text-blue bg-light-blue)`}
`;

const SignUp = styled(Link).attrs({
  to: 'auth/new',
})`
  ${tw`w-full rounded-md border border-solid border-white py-2 px-3 text-blue bg-white border-blue hover:(text-white bg-blue border-blue)`}
`;

const SubscribedTags = styled.div``;

const PopularTags = styled.div``;

const Tags = styled.div``;

const Wrapper = tw.div`w-[40%]`;

const PublicLinks = styled.div``;

const OtherLinks = styled.div``;

const Image = styled.img.attrs({ width: '24px' })``;

const Heading = tw.h3`text-black mt-6 px-3`;

const Header = tw.div`mt-6 flex justify-between items-center`;

const TagsHeading = tw(Heading)`mt-0`;

const Settings = tw.div`cursor-pointer text-xl`;

const LinkWrapper = tw.div`flex justify-start text-center gap-2 rounded-md text-black p-3 hover:(text-blue bg-light-blue)`;

const SocialLinks = styled.div`
  svg {
    width: 100%;
  }
  a {
    ${tw`w-full`}
  }
  ${tw`py-3 flex`}
`;

const SocialWrapper = tw(LinkWrapper)`cursor-pointer text-xl w-full`;

export default Resources;
