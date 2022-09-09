import autosize from 'autosize';
import { forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Textarea = forwardRef((props, ref) => {
  useEffect(() => {
    autosize(ref.current);
  }, []);

  useEffect(() => {
    if (props.isFocused) ref.current.focus();
  }, [props.isFocused]);

  return <Area ref={ref} {...props} />;
});

const Area = styled.textarea`
  ${tw`w-full outline-none resize-none whitespace-pre-line rounded-md`}
  ${({ showOutlines }) =>
    showOutlines && tw`border-2 border-lighter-gray focus:border-blue rounded-md py-1 px-2`}
`;

export default Textarea;
