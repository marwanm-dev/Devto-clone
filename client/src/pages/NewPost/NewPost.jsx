import { useState, useRef, useEffect } from 'react';
import tw from 'twin.macro';
import RouteWrapper from '../../common/RouteWrapper';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import useBase64 from '../../hooks/useBase64';

// Todo make reusable components for (Avatar, imageUpload, Input)
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
            <label htmlFor='title'>Title</label>
            <input name='title' value={title} onChange={e => setTitle(e.target.value)} />
          </InputWrapper>
          <InputWrapper>
            <input
              name='image'
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
            <label htmlFor='tags'>Tags</label>
            <input name='tags' value={tags} onChange={e => setTags(e.target.value)} />
          </InputWrapper>
          <Submit onClick={handleSubmit}>Submit</Submit>
        </NewPostWrapper>
      </Wrapper>
    </RouteWrapper>
  );
};

const Submit = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-full text-sm`;

const ImagePreview = tw.img`w-32 h-32 mx-auto border border-light-gray flex justify-center items-center text-center object-cover`;

const InputWrapper = tw.div`flex flex-col gap-2`;

const Button = tw.button`bg-lighter-gray hover:bg-light-gray rounded-md text-center py-2 px-1 w-28 text-sm mx-auto`;

const Heading = tw.h1`text-dark-gray text-center`;

const NewPostWrapper = tw.div`bg-white w-3/5 mx-auto py-20 px-8 [&>*:not(:last-child)]:mb-md`;

const Wrapper = tw.div`flex items-center`;

export default NewPost;
