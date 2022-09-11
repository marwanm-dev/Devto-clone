import { MdExpandLess } from 'react-icons/md';
import tw, { styled } from 'twin.macro';
import useToggle from '../../hooks/useToggle';

const ShowMore = ({ text, maxChars }) => {
  const [showMore, toggleShowMore] = useToggle(false);
  const condition = text.length > maxChars;

  return (
    <>
      {showMore ? text : text.slice(0, 100)}
      {condition && (
        <Wrapper onClick={toggleShowMore}>
          {' '}
          ...
          {showMore ? (
            <ExpandLess>
              <MdExpandLess />
            </ExpandLess>
          ) : (
            'Show more'
          )}
        </Wrapper>
      )}
    </>
  );
};
const ExpandLess = tw.div`inline [svg]:inline text-xl`;

const Wrapper = tw.span`hover:(text-blue) cursor-pointer font-bold italic`;

export default ShowMore;
