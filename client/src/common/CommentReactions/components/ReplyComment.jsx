import tw from 'twin.macro';

const ReplyComment = ({ handleReply }) => {
  return (
    <ReactionContainer onClick={handleReply}>
      <FaRegComment />
      <Text>Reply</Text>
    </ReactionContainer>
  );
};

const ReactionContainer = tw.div`cursor-pointer rounded-md py-1 px-2 hover:bg-lighter-gray flex items-center gap-2 text-2xl`;

const Text = tw.p``;

export default ReplyComment;
