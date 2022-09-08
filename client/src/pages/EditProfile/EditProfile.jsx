import 'easymde/dist/easymde.min.css';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import Error from '../../common/Error';
import LoadingSpinner from '../../common/LoadingSpinner';
import RouteWrapper from '../../common/RouteWrapper';
import Textarea from '../../common/Textarea/Textarea';
import { selectCurrentUser, selectOAuthed } from '../../core/features/auth/authSlice';
import { useUpdateUserMutation } from '../../core/features/users/usersApiSlice';
import useBase64 from '../../hooks/useBase64';
import useRequireAuth from '../../hooks/useRequireAuth';

const EditProfile = () => {
  const currentUser = useSelector(selectCurrentUser);
  const oAuthed = useSelector(selectOAuthed);
  const [id, setId] = useState(currentUser.id);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [username, setUsername] = useState(currentUser.username);
  const [file, setFile] = useState(currentUser.picture?.url);
  const [bio, setBio] = useState(currentUser.bio || '');
  const [location, setLocation] = useState(currentUser.location || '');
  const [education, setEducation] = useState(currentUser.education || '');
  const [work, setWork] = useState(currentUser.work || '');
  const [availableFor, setAvailableFor] = useState(currentUser.availableFor || '');
  const [skills, setSkills] = useState(currentUser.skills || '');
  const filePickerRef = useRef();
  const bioRef = useRef();
  const skillsRef = useRef();
  const navigate = useNavigate();

  const previewURL = useBase64(file);
  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();
  const { isAuthed } = useRequireAuth();

  const handleUpdate = async () => {
    if (isAuthed) {
      try {
        await updateUser({
          id,
          name,
          email: oAuthed ? currentUser.email : email,
          username: oAuthed ? currentUser.username : username,
          picture: { url: previewURL, publicId: currentUser.picture?.publicId },
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
    } else handleAuth();
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
            <InputWrapper invalid={oAuthed}>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={oAuthed}
              />
            </InputWrapper>
            <InputWrapper invalid={oAuthed}>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={oAuthed}
              />
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
              <Textarea
                showOutlines={true}
                ref={bioRef}
                id='bio'
                value={bio}
                onChange={e => setBio(e.target.value)}
              />
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
              <Textarea
                showOutlines={true}
                ref={skillsRef}
                id='skills'
                value={skills}
                onChange={e => setSkills(e.target.value)}
              />
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

const InputWrapper = styled.div`
  ${({ invalid }) => invalid && tw`opacity-25 [*]:cursor-not-allowed cursor-not-allowed`}
  ${tw`flex flex-col gap-2`}
`;

const Input = tw.input`py-1 px-2 rounded-md outline-none border-2 border-solid border-lighter-gray focus:border-blue`;

const Label = tw.label`font-bold text-dark-gray`;

const Button = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-28 text-sm mx-auto`;

const Heading = tw.h1`text-dark-gray text-center`;

const EditProfileWrapper = tw.div`bg-white w-3/5 mx-auto py-20 px-8 [&>*:not(:last-child)]:mb-md`;

const Wrapper = tw.div`flex items-center`;

export default EditProfile;
