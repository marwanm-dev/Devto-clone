import ReactMarkdown from 'react-markdown';
import tw from 'twin.macro';
import CodeBlock from './components/CodeBlock';

const CustomMarkdown = props => {
  return (
    <Wrapper>
      <ReactMarkdown components={CodeBlock} {...props} />
    </Wrapper>
  );
};

const Wrapper = tw.div`[h1,h2]:py-6 [h3,h4,h5,h6,p,li]:py-3 [a]:(text-xl text-blue hover:underline)`;

export default CustomMarkdown;
