import tw from 'twin.macro';
import Tag from './Tag';

const Tags = () => {
  // Take top 3 tags
  const tags = ['#news', '#discuss'];
  return (
    <Wrapper>
      {tags.map((tag, i) => (
        <Tag key={i} />
      ))}
    </Wrapper>
  );
};

const Wrapper = tw.div`w-1/2 flex flex-col gap-sm`;

export default Tags;
