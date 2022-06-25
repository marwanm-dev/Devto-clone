import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';

const Dashboard = () => {
  return (
    <RouteWrapper>
      <Wrapper>
        <h1>Dashboard page</h1>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`bg-blue`;

export default Dashboard;
