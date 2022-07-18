import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

const Tags = ({ tags }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      {tags.map(tag => (
        <Tag key={nanoid()} onClick={() => navigate(`/tags/${tag}`)}>
          #{tag}
        </Tag>
      ))}
    </Wrapper>
  );
};

const Wrapper = tw.div`mb-2 text-darker-gray flex`;

const Tag = tw.div`px-2 py-1 rounded-md cursor-pointer hover:bg-lighter-gray`;

export default Tags;
