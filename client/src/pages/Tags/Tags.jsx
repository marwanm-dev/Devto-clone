import tw, { styled } from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import Tag from './components/Tag';

const Tags = () => {
  const tags = ['beginners', 'es2022', 'discuss', 'webdev', 'javascript', 'news', 'react'];

  return (
    <RouteWrapper>
      <Wrapper>
        {tags.map(tag => (
          <Tag tag={tag} />
        ))}
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-gap: 16px;
  @media (min-width: calc(calc(3 * 16px) + calc(3 * 275px))) {
    grid-template-columns: repeat(3, minmax(275px, 1fr));
  }
`;

export default Tags;
