import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { decreaseOpacity } from '../../helpers/utils';
import Hashtag from '../Hashtag';

const Tags = ({ tags, isColored, filteredTag }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      {tags.map(tag => (
        <Tag
          key={nanoid()}
          isFiltered={tag.name === filteredTag}
          color={tag.hashtagColor}
          bg={decreaseOpacity(tag.hashtagColor)}
          isColored={isColored}
          onClick={() => navigate(`/tags/${tag.name}`)}>
          <HashtagWrapper
            isFiltered={tag.name === filteredTag}
            isColored={isColored}
            color={tag.hashtagColor}>
            <Hashtag />
          </HashtagWrapper>
          {tag.name}
        </Tag>
      ))}
    </Wrapper>
  );
};

const Wrapper = tw.div`mb-2 flex [&>*:not(:first-child)]:ml-1 flex-wrap`;

const Tag = styled.div`
  ${tw`px-2 py-1 mr-1 rounded-md cursor-pointer text-darker-gray hover:bg-lighter-gray`};
  border: 1px solid transparent;
  &:hover {
    background: ${props => props.isColored && props.bg};
    border-color: ${props => props.isColored && props.color};
  }
  ${props =>
    props.isFiltered &&
    `background: ${props.bg};border-color: ${props.color};&:hover{background: ${props.bg};}`}
`;
const HashtagWrapper = styled.span`
  color: ${props => (props.isColored || props.isFiltered) && props.color};
`;

export default Tags;
