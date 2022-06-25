import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';

const Tags = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Tag onClick={() => navigate('/tags/tagName')}>#discuss</Tag>
      <Tag onClick={() => navigate('/tags/tagName')}>#news</Tag>
      <Tag onClick={() => navigate('/tags/tagName')}>#jokes</Tag>
    </Wrapper>
  );
};

const Wrapper = tw.div`mb-2 text-darker-gray flex`;

const Tag = tw.div`px-2 py-1 rounded-md cursor-pointer hover:bg-lighter-gray`;

export default Tags;
