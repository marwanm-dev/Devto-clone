import { useEffect, useState } from 'react';

const useBase64 = file => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (file) {
      if (typeof file === 'string') setUrl(`${file}`);
      else {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      }
    }
  }, [file]);

  return url;
};

export default useBase64;
