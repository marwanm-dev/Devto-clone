import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const Settings = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>Settings page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default Settings;
