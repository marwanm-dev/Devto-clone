import { ToastContainer } from 'react-toastify';
import tw, { styled, theme } from 'twin.macro';

const CustomToastContainer = () => {
  return (
    <Wrapper>
      <ToastContainer
        toastClassName='toast'
        progressClassName='progress'
        position='bottom-right'
        closeButton={false}
        closeOnClick={false}
        limit={5}
        draggablePercent={60}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .toast {
    ${tw`rounded-md px-2 py-1 cursor-pointer overflow-hidden border border-transparent hover:border-blue`}
  }

  .progress {
    background: ${theme`colors.blue`} !important;
  }
`;

export default CustomToastContainer;
