import tw from 'twin.macro';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RouteWrapper from '../../common/RouteWrapper';
import { useLazyLogoutQuery } from '../../core/features/auth/authApiSlice';
import { useDeleteUserMutation } from '../../core/features/users/usersApiSlice';
import { capitalizeFirstLetter } from '../../helpers/strings';
import { selectCurrentUser } from '../../core/features/auth/authSlice';

const Confirmation = () => {
  const navigate = useNavigate();
  const { confirmType } = useParams();
  const [trigger] = useLazyLogoutQuery();
  const [deleteUser] = useDeleteUserMutation();
  const { id } = useSelector(selectCurrentUser);

  const handleConfirmation = async () => {
    try {
      confirmType.includes('delete') && (await deleteUser({ id }).unwrap());
      trigger();

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RouteWrapper>
      <Wrapper>
        <Heading>Are you sure you want to {confirmType.replace('-', ' ')}?</Heading>
        <ConfirmButton onClick={handleConfirmation}>
          Yes, {capitalizeFirstLetter(confirmType.replace('-', ' '))}
        </ConfirmButton>
      </Wrapper>
    </RouteWrapper>
  );
};

const Heading = tw.h1``;

const ConfirmButton = tw.button`text-white bg-blue rounded-md py-4 px-6 mt-6`;

const Wrapper = tw.div`text-center`;

export default Confirmation;
