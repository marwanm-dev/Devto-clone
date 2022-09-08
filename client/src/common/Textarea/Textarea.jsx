import { forwardRef, useEffect, useState } from 'react';
import { pureFinalPropsSelectorFactory } from 'react-redux/es/connect/selectorFactory';
import tw, { styled } from 'twin.macro';

const Textarea = forwardRef((props, ref) => {
  const [textareaHeight, setTextareaHeight] = useState(ref?.current?.scrollHeight);

  const handleTextareaHeight = () => setTextareaHeight(ref.current.scrollHeight);

  useEffect(() => {
    handleTextareaHeight();
  }, []);

  useEffect(() => {
    if (props.isFocused) ref.current.focus();
  }, [props.isFocused]);

  // Todo
  return (
    <Area
      ref={ref}
      onChange={() => console.log('not changing!!')}
      textareaHeight={textareaHeight}
      {...props}
    />
  );
});

const Area = styled.textarea`
  height: ${({ textareaHeight }) => textareaHeight}px;
  ${tw`w-full outline-none resize-none whitespace-pre-line`}
  ${({ showOutlines }) =>
    showOutlines && tw`border-2 border-lighter-gray focus:border-blue rounded-md py-1 px-2`}
`;

export default Textarea;
