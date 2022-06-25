import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

const Tag = () => {
  return (
    <Wrapper>
      <Link to='tags/:tagName'>
        <TagName>#news</TagName>
      </Link>
      <PostAttached>What's new in ES2022? 🤔</PostAttached>
      <PostAttached>What are your favorite features in ES2022?</PostAttached>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`rounded-md`}
  *:not(a) {
    ${tw`p-3 border-lighter-gray border-b hover:text-blue cursor-pointer`}
  }
`;

const TagName = tw.h2`pb-10 bg-lightest-gray border-b`;

const PostAttached = tw.h4`py-3 bg-lightest-gray hover:bg-white`;

export default Tag;
