import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import tw from 'twin.macro';
import 'easymde/dist/easymde.min.css';
import RouteWrapper from '../../common/RouteWrapper';
import useBase64 from '../../hooks/useBase64';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useUpdateUserMutation } from '../../core/features/auth/authApiSlice';

const EditProfile = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [username, setUsername] = useState(currentUser.username);
  const [file, setFile] = useState(currentUser.picture.url);
  const [bio, setBio] = useState(currentUser.bio || '');
  const [location, setLocation] = useState(currentUser.location || '');
  const [education, setEducation] = useState(currentUser.education || '');
  const [work, setWork] = useState(currentUser.work || '');
  const [availableFor, setAvailableFor] = useState(currentUser.availableFor || '');
  const [skills, setSkills] = useState(currentUser.skills || '');
  const filePickerRef = useRef();

  const previewURL = useBase64(file);
  const [updateUser] = useUpdateUserMutation();

  const handleUpdate = async () => {
    try {
      await updateUser({
        id: currentUser.id,
        username,
        picture: { url: previewURL, publicId: currentUser.picture.publicId },
        bio,
        location,
        education,
        work,
        availableFor,
        skills,
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RouteWrapper>
      <Wrapper>
        <EditProfileWrapper>
          <Heading>Edit profile</Heading>
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
            <Input id='education' value={education} onChange={e => setEducation(e.target.value)} />
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

          <Submit onClick={handleUpdate}>Update profile</Submit>
        </EditProfileWrapper>
      </Wrapper>
    </RouteWrapper>
  );
};

const Submit = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-full text-sm`;

const ImagePreview = tw.img`w-32 h-32 mx-auto border border-light-gray flex justify-center items-center text-center object-cover`;

const InputWrapper = tw.div`flex flex-col gap-2`;

const Input = tw.input`py-1 px-2 rounded-md outline-none border-2 border-solid border-lighter-gray focus:border-blue`;

const Label = tw.label`font-bold text-dark-gray`;

const Button = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-28 text-sm mx-auto`;

const Heading = tw.h1`text-dark-gray text-center`;

const EditProfileWrapper = tw.div`bg-white w-3/5 mx-auto py-20 px-8 [&>*:not(:last-child)]:mb-md`;

const Wrapper = tw.div`flex items-center`;

export default EditProfile;
