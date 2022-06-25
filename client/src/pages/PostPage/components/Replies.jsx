import tw, { styled } from 'twin.macro';
import Comment from './Comment';

const Replies = ({ replies }) => {
  return (
    <Wrapper>
      {replies && replies.map((reply, i) => <Comment key={i} comment={reply} isReply={true} />)}
    </Wrapper>
  );
};

const Wrapper = tw.div`border-l border-lighter-gray pl-[calc(3.5rem + .75rem)]`;

export default Replies;
