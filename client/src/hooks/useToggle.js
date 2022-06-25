import { useState } from 'react';

const useToggle = initialValue => {
  const [value, setValue] = useState(initialValue);

  const toggle = value => setValue(prev => (typeof value === 'boolean' ? value : !prev));

  return [value, toggle];
};

export default useToggle;
