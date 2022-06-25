import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const ReadingList = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>ReadingList page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default ReadingList;
