import { useState, useRef, useEffect } from 'react';
import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import useBase64 from '../../hooks/useBase64';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const filePickerRef = useRef();
  const previewURL = useBase64(file);

  const handleSubmit = () => {
    // Todo Submit with POST method to /post rest api route
  };

  return (
    <RouteWrapper>
      <Wrapper>
        <NewPostWrapper>
          <Heading>Create a new post</Heading>
          <InputWrapper>
            <Label htmlFor='title'>Title</Label>
            <Input id='title' value={title} onChange={e => setTitle(e.target.value)} />
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
            <SimpleMDE value={body} onChange={setBody} />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor='tags'>Tags</Label>
            <Input id='tags' value={tags} onChange={e => setTags(e.target.value)} />
          </InputWrapper>
          <Submit onClick={handleSubmit}>Submit</Submit>
        </NewPostWrapper>
      </Wrapper>
    </RouteWrapper>
  );
};

const Submit = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-full text-sm`;

const ImagePreview = tw.img`w-32 h-32 mx-auto border border-light-gray flex justify-center items-center text-center object-cover`;

const Input = tw.input`py-1 px-2 rounded-md outline-none border-2 border-solid border-lighter-gray focus:border-blue`;

const Label = tw.label`font-bold text-dark-gray`;

const InputWrapper = tw.div`flex flex-col gap-2`;

const Button = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-28 text-sm mx-auto`;

const Heading = tw.h1`text-dark-gray text-center`;

const NewPostWrapper = tw.div`bg-white w-3/5 mx-auto py-20 px-8 [&>*:not(:last-child)]:mb-md`;

const Wrapper = tw.div`flex items-center`;

export default NewPost;
