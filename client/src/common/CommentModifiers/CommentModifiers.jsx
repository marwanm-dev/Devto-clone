import tw, { styled } from 'twin.macro';

const CommentModifier = () => {
  return (
    <Wrapper>
      <Button>Edit</Button>
      <DeleteButton>Delete</DeleteButton>
    </Wrapper>
  );
};

const Button = tw.button`text-sm bg-blue text-white rounded-md py-2 px-3`;

const DeleteButton = tw(Button)`bg-red`;

const Wrapper = tw.div`flex items-center gap-2`;

export default CommentModifier;
