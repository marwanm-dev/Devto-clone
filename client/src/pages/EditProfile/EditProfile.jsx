import 'easymde/dist/easymde.min.css';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import Error from '../../common/Error';
import LoadingSpinner from '../../common/LoadingSpinner';
import RouteWrapper from '../../common/RouteWrapper';
import {
  selectCurrentToken,
  selectCurrentUser,
  setAuthModal,
} from '../../core/features/auth/authSlice';
import { useUpdateUserMutation } from '../../core/features/users/usersApiSlice';
import useBase64 from '../../hooks/useBase64';

const EditProfile = () => {
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [file, setFile] = useState(currentUser.picture?.url);
  const [bio, setBio] = useState(currentUser.bio || '');
  const [location, setLocation] = useState(currentUser.location || '');
  const [education, setEducation] = useState(currentUser.education || '');
  const [work, setWork] = useState(currentUser.work || '');
  const [availableFor, setAvailableFor] = useState(currentUser.availableFor || '');
  const [skills, setSkills] = useState(currentUser.skills || '');
  const filePickerRef = useRef();
  const navigate = useNavigate();

  const previewURL = useBase64(file);
  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();

  const handleUpdate = async () => {
    if (token) {
      try {
        await updateUser({
          id: currentUser.id,
          name,
          username,
          picture: { url: previewURL, publicId: currentUser.picture.publicId },
          bio,
          location,
          education,
          work,
          availableFor,
          skills,
        }).unwrap();

        navigate('/');
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(setAuthModal(true));
    }
  };

  return (
    <RouteWrapper>
      <Wrapper>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <EditProfileWrapper>
            <Heading>Edit profile</Heading>
            <InputWrapper>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' value={name} onChange={e => setName(e.target.value)} />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor='username'>Username</Label>
              <Input id='username' value={username} onChange={e => setUsername(e.target.value)} />
            </InputWrapper>
            <InputWrapper>
              <Input
                type='file'
                ref={filePickerRef}
                onChange={e => setFile(e.target.files[0])}
                style={{ display: 'none' }}
              />
              <ImagePreview src={previewURL.toString()} alt='Please pick an image' />
              <Button onClick={() => filePickerRef.current.click()}>Choose image</Button>
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor='bio'>Bio</Label>
              <Input id='bio' value={bio} onChange={e => setBio(e.target.value)} />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor='location'>Location</Label>
              <Input id='location' value={location} onChange={e => setLocation(e.target.value)} />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor='education'>Education</Label>
              <Input
                id='education'
                value={education}
                onChange={e => setEducation(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor='work'>Work</Label>
              <Input id='work' value={work} onChange={e => setWork(e.target.value)} />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor='available-for'>Available for</Label>
              <Input
                id='available-for'
                value={availableFor}
                onChange={e => setAvailableFor(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor='skills'>Skills</Label>
              <Input id='skills' value={skills} onChange={e => setSkills(e.target.value)} />
            </InputWrapper>

            {isError && <Error>Something went wrong.</Error>}

            <Submit onClick={handleUpdate}>Update profile</Submit>
            <DeleteButton onClick={() => navigate('/auth/confirm/delete-account')}>
              Delete Account
            </DeleteButton>
          </EditProfileWrapper>
        )}
      </Wrapper>
    </RouteWrapper>
  );
};

const Submit = tw.button`bg-white text-blue border border-solid border-blue font-bold hover:(bg-blue text-white border-white) rounded-md text-center py-2 px-1 w-full text-sm mt-2`;

const DeleteButton = tw(
  Submit
)`text-red bg-white border border-solid border-red hover:(bg-red border-white text-white)`;

const ImagePreview = tw.img`w-32 h-32 mx-auto border border-light-gray flex justify-center items-center text-center object-cover`;

const InputWrapper = tw.div`flex flex-col gap-2`;

const Input = tw.input`py-1 px-2 rounded-md outline-none border-2 border-solid border-lighter-gray focus:border-blue`;

const Label = tw.label`font-bold text-dark-gray`;

const Button = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-28 text-sm mx-auto`;

const Heading = tw.h1`text-dark-gray text-center`;

const EditProfileWrapper = tw.div`bg-white w-3/5 mx-auto py-20 px-8 [&>*:not(:last-child)]:mb-md`;

const Wrapper = tw.div`flex items-center`;

export default EditProfile;
